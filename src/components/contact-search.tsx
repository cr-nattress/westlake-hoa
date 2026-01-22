"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactSearchProps {
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: string) => void;
}

export function ContactSearch({
  onSearchChange,
  onFilterChange,
}: ContactSearchProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contacts..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearchChange(e.target.value);
          }}
          className="pl-10 pr-10"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              onSearchChange("");
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>
      <Select onValueChange={onFilterChange} defaultValue="all">
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Contacts</SelectItem>
          <SelectItem value="management">Management</SelectItem>
          <SelectItem value="insurance">Insurance</SelectItem>
          <SelectItem value="legal">Legal</SelectItem>
          <SelectItem value="board">Board</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
