/**
 * PDF to README Converter
 *
 * Converts PDF files to markdown README files with chunked processing
 * to avoid token limits when using AI for formatting.
 *
 * Usage:
 *   npx tsx scripts/pdf-to-readme.ts [options]
 *
 * Options:
 *   --input <path>    Input PDF file or directory (default: docs/hoa-docs)
 *   --output <path>   Output directory (default: docs/hoa-docs/readme)
 *   --chunk-size      Max characters per chunk (default: 40000)
 *   --raw             Skip AI formatting, output raw extracted text
 *   --single <file>   Process only a single specific PDF file
 *   --ocr             Force OCR mode using Claude Vision for scanned PDFs
 *   --ocr-threshold   Min chars per page to skip OCR (default: 100)
 *   --pages-per-batch Max pages to OCR in single API call (default: 5)
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import { PDFParse } from 'pdf-parse';

interface ProcessingOptions {
  inputPath: string;
  outputPath: string;
  chunkSize: number;
  rawMode: boolean;
  singleFile?: string;
  ocrMode: boolean;
  ocrThreshold: number;
  pagesPerBatch: number;
}

// Parse command line arguments
function parseArgs(): ProcessingOptions {
  const args = process.argv.slice(2);
  const options: ProcessingOptions = {
    inputPath: 'docs/hoa-docs',
    outputPath: 'docs/hoa-docs/readme',
    chunkSize: 40000, // ~10k tokens, safe margin under limits
    rawMode: false,
    ocrMode: false,
    ocrThreshold: 100, // chars per page minimum
    pagesPerBatch: 5, // pages to OCR in single API call
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--input':
        options.inputPath = args[++i];
        break;
      case '--output':
        options.outputPath = args[++i];
        break;
      case '--chunk-size':
        options.chunkSize = parseInt(args[++i], 10);
        break;
      case '--raw':
        options.rawMode = true;
        break;
      case '--single':
        options.singleFile = args[++i];
        break;
      case '--ocr':
        options.ocrMode = true;
        break;
      case '--ocr-threshold':
        options.ocrThreshold = parseInt(args[++i], 10);
        break;
      case '--pages-per-batch':
        options.pagesPerBatch = parseInt(args[++i], 10);
        break;
    }
  }

  return options;
}

// Extract text from PDF
async function extractPdfText(pdfPath: string): Promise<{ text: string; numPages: number }> {
  const dataBuffer = fs.readFileSync(pdfPath);
  const parser = new PDFParse({ data: dataBuffer });
  const result = await parser.getText();
  return {
    text: result.text,
    numPages: result.pages?.length ?? result.total ?? 0,
  };
}

// Check if PDF needs OCR (scanned document with little text)
function needsOcr(text: string, numPages: number, threshold: number): boolean {
  if (numPages === 0) return false;
  const charsPerPage = text.length / numPages;
  return charsPerPage < threshold;
}

// Get page screenshots from PDF
async function getPdfScreenshots(
  pdfPath: string
): Promise<{ pages: Array<{ pageNumber: number; dataUrl: string }>; total: number }> {
  const dataBuffer = fs.readFileSync(pdfPath);
  const parser = new PDFParse({ data: dataBuffer });
  const result = await parser.getScreenshot();
  return {
    pages: result.pages.map((p: { pageNumber: number; dataUrl: string }) => ({
      pageNumber: p.pageNumber,
      dataUrl: p.dataUrl,
    })),
    total: result.total,
  };
}

// OCR a batch of pages using Claude Vision
async function ocrPageBatch(
  client: Anthropic,
  pages: Array<{ pageNumber: number; dataUrl: string }>,
  fileName: string,
  batchIndex: number,
  totalBatches: number
): Promise<string> {
  const isFirst = batchIndex === 0;

  // Build content array with images
  const content: Anthropic.MessageCreateParams['messages'][0]['content'] = [];

  // Add instruction
  content.push({
    type: 'text',
    text: `Extract ALL text from these ${pages.length} page(s) of "${fileName}". This is batch ${batchIndex + 1} of ${totalBatches}.

Instructions:
- Extract every word, number, and symbol visible on the page
- Preserve the original structure and formatting as much as possible
- Use markdown formatting (headers, lists, etc.) where appropriate
- Include all legal text, signatures, stamps, and handwritten notes
- If text is unclear, make your best attempt and note [unclear] if needed
${isFirst ? '- Start with a title header: # ' + fileName : '- Continue from previous pages, no title needed'}

Pages to OCR:`,
  });

  // Add each page image
  for (const page of pages) {
    content.push({
      type: 'text',
      text: `\n--- Page ${page.pageNumber} ---`,
    });
    content.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: 'image/png',
        data: page.dataUrl.replace('data:image/png;base64,', ''),
      },
    });
  }

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    messages: [
      {
        role: 'user',
        content,
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  return textBlock ? textBlock.text : '';
}

// Process PDF with OCR
async function processPdfWithOcr(
  pdfPath: string,
  options: ProcessingOptions,
  client: Anthropic
): Promise<string> {
  const fileName = path.basename(pdfPath, '.pdf');

  console.log('  Getting page screenshots...');
  const { pages, total } = await getPdfScreenshots(pdfPath);
  console.log(`  Got ${total} pages as images`);

  // Process pages in batches
  const batches: Array<Array<{ pageNumber: number; dataUrl: string }>> = [];
  for (let i = 0; i < pages.length; i += options.pagesPerBatch) {
    batches.push(pages.slice(i, i + options.pagesPerBatch));
  }

  console.log(`  Processing ${batches.length} batches (${options.pagesPerBatch} pages each)...`);

  const ocrResults: string[] = [];
  for (let i = 0; i < batches.length; i++) {
    console.log(`  OCR batch ${i + 1}/${batches.length} (pages ${batches[i][0].pageNumber}-${batches[i][batches[i].length - 1].pageNumber})...`);

    const result = await ocrPageBatch(client, batches[i], fileName, i, batches.length);
    ocrResults.push(result);

    // Rate limiting between batches
    if (i < batches.length - 1) {
      console.log('  Waiting for rate limit...');
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  return ocrResults.join('\n\n---\n\n');
}

// Split text into chunks
function chunkText(text: string, chunkSize: number): string[] {
  const chunks: string[] = [];

  // Try to split on paragraph boundaries
  const paragraphs = text.split(/\n\s*\n/);
  let currentChunk = '';

  for (const para of paragraphs) {
    if ((currentChunk + para).length > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = para;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + para;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  // If any chunk is still too large, split it further
  const finalChunks: string[] = [];
  for (const chunk of chunks) {
    if (chunk.length > chunkSize) {
      // Split by sentences
      const sentences = chunk.split(/(?<=[.!?])\s+/);
      let subChunk = '';
      for (const sentence of sentences) {
        if ((subChunk + sentence).length > chunkSize && subChunk.length > 0) {
          finalChunks.push(subChunk.trim());
          subChunk = sentence;
        } else {
          subChunk += (subChunk ? ' ' : '') + sentence;
        }
      }
      if (subChunk.trim()) {
        finalChunks.push(subChunk.trim());
      }
    } else {
      finalChunks.push(chunk);
    }
  }

  return finalChunks;
}

// Format chunk using Claude API
async function formatChunkWithAI(
  client: Anthropic,
  chunk: string,
  fileName: string,
  chunkIndex: number,
  totalChunks: number
): Promise<string> {
  const isFirst = chunkIndex === 0;
  const isLast = chunkIndex === totalChunks - 1;

  const systemPrompt = `You are a document formatter. Convert the following extracted PDF text into clean, well-structured markdown.

Rules:
- Preserve all important information and legal text
- Fix OCR errors and formatting issues
- Use proper markdown headers (##, ###) for sections
- Use bullet points and numbered lists where appropriate
- Clean up spacing and line breaks
- DO NOT summarize or omit content - preserve everything
${isFirst ? '- Include a title header (# Document Name) at the start' : '- Continue from previous section, no title needed'}
${isLast ? '- This is the final section' : '- This is part ' + (chunkIndex + 1) + ' of ' + totalChunks}`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Document: ${fileName}\n\nContent to format:\n\n${chunk}`,
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  return textBlock ? textBlock.text : '';
}

// Process a single PDF file
async function processPdf(
  pdfPath: string,
  options: ProcessingOptions,
  client?: Anthropic
): Promise<void> {
  const fileName = path.basename(pdfPath, '.pdf');
  console.log(`\nProcessing: ${fileName}`);

  try {
    // Extract text first
    console.log('  Extracting text...');
    const { text, numPages } = await extractPdfText(pdfPath);
    console.log(`  Found ${numPages} pages, ${text.length} characters`);

    let finalContent: string;
    const isScanned = needsOcr(text, numPages, options.ocrThreshold);

    // Check if OCR is needed
    if ((options.ocrMode || isScanned) && client) {
      if (isScanned) {
        console.log(`  Detected scanned PDF (${Math.round(text.length / numPages)} chars/page < ${options.ocrThreshold} threshold)`);
      }
      console.log('  Using OCR mode with Claude Vision...');

      finalContent = await processPdfWithOcr(pdfPath, options, client);
    } else if (isScanned && !client) {
      console.log(`  WARNING: Scanned PDF detected but no API key for OCR`);
      console.log('  Using raw text mode (will have minimal content)');

      finalContent = `# ${fileName}\n\n`;
      finalContent += `*Extracted from PDF - ${numPages} pages*\n\n`;
      finalContent += `**Note: This appears to be a scanned document. Run with ANTHROPIC_API_KEY for OCR.**\n\n---\n\n`;
      finalContent += text;
    } else {
      // Regular text extraction
      const chunks = chunkText(text, options.chunkSize);
      console.log(`  Split into ${chunks.length} chunks`);

      if (options.rawMode || !client) {
        // Raw mode: just clean up the text
        console.log('  Using raw text mode (no AI formatting)');
        finalContent = `# ${fileName}\n\n`;
        finalContent += `*Extracted from PDF - ${numPages} pages*\n\n---\n\n`;
        finalContent += chunks.join('\n\n---\n\n');
      } else {
        // AI mode: format each chunk
        console.log('  Formatting with AI...');
        const formattedChunks: string[] = [];

        for (let i = 0; i < chunks.length; i++) {
          console.log(`  Processing chunk ${i + 1}/${chunks.length}...`);
          const formatted = await formatChunkWithAI(client, chunks[i], fileName, i, chunks.length);
          formattedChunks.push(formatted);

          // Rate limiting: wait between API calls
          if (i < chunks.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }

        finalContent = formattedChunks.join('\n\n');
      }
    }

    // Ensure output directory exists
    fs.mkdirSync(options.outputPath, { recursive: true });

    // Write output file
    const outputFile = path.join(options.outputPath, `${fileName}.md`);
    fs.writeFileSync(outputFile, finalContent, 'utf-8');
    console.log(`  Saved: ${outputFile}`);
  } catch (error) {
    console.error(`  Error processing ${fileName}:`, error);
  }
}

// Main function
async function main() {
  const options = parseArgs();

  console.log('PDF to README Converter');
  console.log('=======================');
  console.log(`Input: ${options.inputPath}`);
  console.log(`Output: ${options.outputPath}`);
  console.log(`Chunk size: ${options.chunkSize} chars`);
  console.log(`Mode: ${options.rawMode ? 'Raw text' : 'AI formatted'}`);
  console.log(`OCR: ${options.ocrMode ? 'Forced' : 'Auto-detect'} (threshold: ${options.ocrThreshold} chars/page)`);

  // Initialize Anthropic client if not in raw mode
  let client: Anthropic | undefined;
  if (!options.rawMode || options.ocrMode) {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.log('\nNo ANTHROPIC_API_KEY found.');
      if (options.ocrMode) {
        console.error('ERROR: OCR mode requires ANTHROPIC_API_KEY');
        process.exit(1);
      }
      console.log('Running in raw mode. Scanned PDFs will have limited text.');
      options.rawMode = true;
    } else {
      client = new Anthropic();
    }
  }

  // Get list of PDFs to process
  let pdfFiles: string[] = [];

  if (options.singleFile) {
    pdfFiles = [options.singleFile];
  } else {
    const inputPath = path.resolve(options.inputPath);
    if (fs.statSync(inputPath).isDirectory()) {
      pdfFiles = fs
        .readdirSync(inputPath)
        .filter((f) => f.toLowerCase().endsWith('.pdf'))
        .map((f) => path.join(inputPath, f));
    } else {
      pdfFiles = [inputPath];
    }
  }

  console.log(`\nFound ${pdfFiles.length} PDF files to process`);

  // Process each PDF
  for (const pdfFile of pdfFiles) {
    await processPdf(pdfFile, options, client);
  }

  console.log('\nDone!');
}

main().catch(console.error);
