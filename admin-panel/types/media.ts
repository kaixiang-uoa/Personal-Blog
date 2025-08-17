import { Media } from "./index";

// Media toolbar component props
export interface MediaToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCount: number;
  onUpload: () => void;
  onDeleteSelected: () => void;
}

// Media item component props
export interface MediaItemProps {
  item: Media;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onViewDetails: (item: Media) => void;
  onCopyUrl: (url: string) => void;
  onDelete: (id: string) => void;
  onImageError: (
    item: Media,
    e: React.SyntheticEvent<HTMLImageElement>
  ) => void;
}

// Media grid component props
export interface MediaGridProps {
  mediaItems: Media[];
  loading: boolean;
  selectedItems: string[];
  searchQuery: string;
  onSelectItem: (id: string) => void;
  onViewDetails: (item: Media) => void;
  onCopyUrl: (url: string) => void;
  onDeleteItem: (id: string) => void;
  onImageError: (
    item: Media,
    e: React.SyntheticEvent<HTMLImageElement>
  ) => void;
}

// Media dialogs component props
export interface MediaDialogsProps {
  // Delete dialog
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  selectedItemsCount: number;
  onConfirmDelete: () => void;

  // Upload dialog
  uploadDialogOpen: boolean;
  setUploadDialogOpen: (open: boolean) => void;
  uploading: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // Detail dialog
  detailDialogOpen: boolean;
  setDetailDialogOpen: (open: boolean) => void;
  selectedItem: Media | null;
  onCopyUrl: (url: string) => void;
  onImageError: (
    item: Media,
    e: React.SyntheticEvent<HTMLImageElement>
  ) => void;
}
