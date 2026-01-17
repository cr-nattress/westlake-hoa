"use client";

import type { Address } from "@/types/institutional";

interface AddressDisplayProps {
  address: Address;
  className?: string;
}

export function AddressDisplay({ address, className = "" }: AddressDisplayProps) {
  return (
    <address className={`not-italic text-sm ${className}`}>
      <p>{address.line1}</p>
      {address.line2 && <p>{address.line2}</p>}
      <p>
        {address.city}, {address.state} {address.zip}
      </p>
    </address>
  );
}

export function AddressInline({ address, className = "" }: AddressDisplayProps) {
  const parts = [address.line1];
  if (address.line2) parts.push(address.line2);
  parts.push(`${address.city}, ${address.state} ${address.zip}`);

  return (
    <span className={`text-sm ${className}`}>
      {parts.join(", ")}
    </span>
  );
}
