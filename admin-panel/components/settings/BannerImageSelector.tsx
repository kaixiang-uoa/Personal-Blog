"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/data-display/card";
import { Button } from "@/components/ui/inputs/button";
import { Input } from "@/components/ui/inputs/input";
import { Label } from "@/components/ui/inputs/label";

interface BannerImageSelectorProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export default function BannerImageSelector({
  label,
  value,
  onChange,
}: BannerImageSelectorProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Card
        className="relative overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          {value ? (
            <div className="relative w-full h-40">
              <Image src={value} alt={label} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-full h-40 bg-muted flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          {isHovered && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Button
                variant="secondary"
                onClick={() => {
                  const url = window.prompt("Enter image URL");
                  if (url) onChange(url);
                }}
              >
                Change Image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <Input
        type="url"
        placeholder="Enter image URL"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
