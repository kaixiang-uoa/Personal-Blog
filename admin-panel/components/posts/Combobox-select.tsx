import React, { useState } from "react";
import { ComboboxSelectProps } from "@/types";
import { Button } from "@/components/ui/inputs/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/feedback/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/navigation/command";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// safe array, handle null and undefined
function safeArray<T>(arr: T[] | null | undefined): T[] {
  return Array.isArray(arr) ? arr : [];
}


export function ComboboxSelect<T>({
  items,
  selectedItems,
  onSelect,
  onCreate,
  multiple = false,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No items found.",
  label,
  disabled,
  width = 240,
  className,
  getItemLabel,
  getItemValue,
}: ComboboxSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);

  // safe array
  const safeItems = safeArray(items);
  const safeSelectedItems = safeArray(selectedItems);

  // safe label
  const getSafeLabel = (item: T): string => {
    try {
      const label = getItemLabel(item);
      if (!label) return '';
      
      // simplify, return string value
      return String(label);
    } catch (e) {
      console.error('Error getting label for item:', e);
      return '';
    }
  };

  // Filtered list
  const filteredItems = safeItems.filter(item => {
    if (!item) return false;
    
    try {
      const itemLabel = getSafeLabel(item);
      if (!search) return true;
      return itemLabel.toLowerCase().includes(search.toLowerCase());
    } catch (e) {
      console.error('Error filtering item:', e);
      return false;
    }
  });

  // Whether a new item can be created
  const canCreate = onCreate && search && !filteredItems.some(item => {
    if (!item) return false;
    
    try {
      const itemLabel = getSafeLabel(item);
      return itemLabel.toLowerCase() === search.toLowerCase();
    } catch (e) {
      console.error('Error checking if item can be created:', e);
      return false;
    }
  });

  // Check if item is selected
  const isSelected = (item: T) => {
    if (!item) return false;
    try {
      return safeSelectedItems.some(sel => 
        sel && getItemValue(sel) === getItemValue(item)
      );
    } catch (e) {
      console.error('Error checking if item is selected:', e);
      return false;
    }
  };

  // Select/deselect item
  const handleSelect = (item: T) => {
    if (!item) return;
    onSelect(item);
    if (!multiple) setOpen(false);
  };

  // Create new item
  const handleCreate = async () => {
    if (!onCreate || !search) return;
    setCreating(true);
    try {
      const newItem = await onCreate(search);
      onSelect(newItem);
      setSearch("");
      setOpen(false);
    } catch (e) {
      console.error('Error creating item:', e);
    } finally {
      setCreating(false);
    }
  };

  // Get display label
  const getDisplayLabel = (item: T) => {
    if (!item) return '';
    return getSafeLabel(item);
  };

  return (
    <div style={{ width }} className={className}>
      {label && <div className="mb-1 font-medium">{label}</div>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
            disabled={disabled}
          >
            {safeSelectedItems.length > 0 && safeSelectedItems[0]
              ? multiple
                ? `${safeSelectedItems.length} selected`
                : getDisplayLabel(safeSelectedItems[0])
              : placeholder}
            <span className="ml-2">&#9662;</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" style={{ width }}>
          <Command>
            <CommandInput
              placeholder={searchPlaceholder}
              value={search}
              onValueChange={setSearch}
              disabled={disabled}
            />
            <CommandEmpty>
              {canCreate ? (
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-start"
                  onClick={handleCreate}
                  disabled={creating}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {creating ? "Creating..." : `Create "${search}"`}
                </Button>
              ) : (
                emptyText
              )}
            </CommandEmpty>
            <CommandGroup>
              {filteredItems.map(item => (
                <CommandItem
                  key={getItemValue(item)}
                  onSelect={() => handleSelect(item)}
                  className="flex items-center"
                >
                  {multiple && (
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected(item) ? "opacity-100" : "opacity-0"
                      )}
                    />
                  )}
                  {getDisplayLabel(item)}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

/*
============================================================
ComboboxSelect Component Design & Implementation Notes
============================================================

1. Current Implementation
------------------------
Current approach:
- Usually, when the page (such as the New Post page) loads, useEffect is used to fetch all tags/categories, then pass the data to ComboboxSelect.
Advantages:
- Simple code, fast client-side filtering
- Suitable for small to medium data sets (dozens to a few hundred tags/categories)
Disadvantages:
- If the data set is very large (thousands or more), fetching all at once can be slow and memory-intensive
- After adding/editing, you need to manually refresh the local data

2. The Meaning of Async Search
-----------------------------
Async search: The frontend requests matching items from the backend in real time as the user types (instead of fetching all at once).
Applicable scenarios:
- Very large data sets (e.g., users, cities, products)
- Too many tags/categories to load all at once on the frontend
Advantages:
- Saves bandwidth and memory
- More up-to-date search results
Disadvantages:
- Requires backend support for fuzzy search
- Slightly more complex code

3. Which Approach Fits Your Project?
------------------------------------
- If your tag/category total is < 500, the current approach (fetch all at once) is totally fine and more responsive.
- If you expect much larger data, consider upgrading to async search.

4. Async Search Implementation Idea
-----------------------------------
- Add an onSearch prop to ComboboxSelect, call it on every input
- Parent component implements onSearch, requests data from backend
- ComboboxSelect maintains its own items state
- Support loading state

// Pseudocode:
// <ComboboxSelect
//   items={items}
//   onSearch={async (q) => {
//     const res = await api.searchTags(q)
//     setItems(res.data)
//   }}
//   ...
// />

5. Summary
----------
- The current approach fits most blog admin panels: simple and efficient.
- If you expect a huge number of tags/categories, consider async search in the future.
- For now, fetching all on page load is fine; upgrade only if needed.
============================================================
*/
