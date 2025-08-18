"use client";

import {
  MediaDialogs,
  MediaGrid,
  MediaToolbar,
  useMediaManager,
} from "@/components/media";

export default function MediaPage() {
  const {
    // State
    mediaItems,
    loading,
    searchQuery,
    selectedItems,
    deleteDialogOpen,
    uploadDialogOpen,
    detailDialogOpen,
    selectedItem,
    uploading,

    // Setters
    setSearchQuery,
    setDeleteDialogOpen,
    setUploadDialogOpen,
    setDetailDialogOpen,

    // Handlers
    handleSelectItem,
    handleImageError,
    copyToClipboard,
    openDetailDialog,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDeleteMedia,
    handleDeleteSelected,
    handleDeleteItem,
    refreshMedia,
    updateSelectedItem,
  } = useMediaManager();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Media Library</h1>
        <p className="text-muted-foreground">
          Manage your uploaded images, documents, and other media files.
        </p>
      </div>

      <MediaToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCount={selectedItems.length}
        onUpload={() => setUploadDialogOpen(true)}
        onDeleteSelected={handleDeleteSelected}
      />

      <MediaGrid
        mediaItems={mediaItems}
        loading={loading}
        selectedItems={selectedItems}
        searchQuery={searchQuery}
        onSelectItem={handleSelectItem}
        onViewDetails={openDetailDialog}
        onCopyUrl={copyToClipboard}
        onDeleteItem={handleDeleteItem}
        onImageError={handleImageError}
      />

      <MediaDialogs
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        selectedItemsCount={selectedItems.length}
        onConfirmDelete={handleDeleteMedia}
        uploadDialogOpen={uploadDialogOpen}
        setUploadDialogOpen={setUploadDialogOpen}
        uploading={uploading}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onFileChange={handleFileChange}
        detailDialogOpen={detailDialogOpen}
        setDetailDialogOpen={setDetailDialogOpen}
        selectedItem={selectedItem}
        onCopyUrl={copyToClipboard}
        onImageError={handleImageError}
        onRefresh={refreshMedia}
        onUpdateSelectedItem={updateSelectedItem}
      />
    </div>
  );
}
