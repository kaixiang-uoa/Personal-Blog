import React, { useState, useEffect, useCallback } from 'react';
import { 
  Cloud, 
  FileImage, 
  FolderPlus, 
  Image as ImageIcon, 
  MoreVertical, 
  Trash2, 
  Upload, 
  Search
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
// Replace context import with mock API
// import { useAdminContext } from '../contexts/AdminContext';
import { fetchMockData } from '../services/mockApi';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const MediaManagement = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [isUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  
  // Add useEffect to fetch media data from mock API
  useEffect(() => {
    // TODO: Replace with real API call in the future
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const data = await fetchMockData('media');
        setMediaFiles(data.media || []);
      } catch (error) {
        console.error('Failed to fetch media data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMedia();
  }, []);

  // 使用 useCallback 包装 filterMedia 函数
  const filterMedia = useCallback(() => {
  // 函数内容
  let filteredFiles = [...mediaFiles];
  
  // 按搜索词过滤
  if (searchTerm) {
    filteredFiles = filteredFiles.filter(file => 
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // 按类型过滤
  if (selectedType && selectedType !== 'all') {
    filteredFiles = filteredFiles.filter(file => 
      file.type.startsWith(selectedType)
    );
  }
  
  // 按日期过滤
  if (selectedDate && selectedDate !== 'all') {
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;
    
    filteredFiles = filteredFiles.filter(media => {
      const mediaDate = new Date(media.uploadDate);
      const diff = now - mediaDate;
      
      switch(selectedDate) {
        case 'today':
          return diff < oneDay;
        case 'week':
          return diff < oneWeek;
        case 'month':
          return diff < oneMonth;
        default:
          return true;
      }
    });
  }
  
  setFilteredMedia(filteredFiles);
  }, [mediaFiles, searchTerm, selectedType, selectedDate]);
  
  useEffect(() => {
    filterMedia();
  }, [filterMedia]);

  // Add loading state handling
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Media Management</h1>
        <div className="bg-muted/50 p-8 rounded-lg flex items-center justify-center">
          <p>Loading media files...</p>
        </div>
      </div>
    );
  }

  const toggleMediaSelection = (id) => {
    if (selectedMedia.includes(id)) {
      setSelectedMedia(selectedMedia.filter(mediaId => mediaId !== id));
    } else {
      setSelectedMedia([...selectedMedia, id]);
    }
  };

  const handleBulkDelete = () => {
    if (selectedMedia.length && confirm(`Are you sure you want to delete ${selectedMedia.length} selected items?`)) {
      // Delete implementation would go here
      // TODO: Replace with real API call in the future
      setSelectedMedia([]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Media Management</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" /> Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Media</DialogTitle>
                <DialogDescription>
                  Upload images, videos, or documents to your media library.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Cloud className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      Drag and drop files here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: JPG, PNG, GIF, MP4, PDF (Max size: 10MB)
                    </p>
                    <Input 
                      type="file"
                      className="hidden"
                      id="file-upload"
                      multiple
                    />
                    <Label 
                      htmlFor="file-upload"
                      className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 py-2 px-4 rounded-md text-sm"
                    >
                      Select Files
                    </Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button disabled={isUploading}>
                  {isUploading ? 'Uploading...' : 'Upload'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {selectedMedia.length > 0 && (
            <Button variant="outline" onClick={handleBulkDelete}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Media</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search media..."
                type="search"
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-1/4">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="w-full sm:w-1/4">
                <SelectValue placeholder="Filter by Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex gap-1">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <FileImage className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <Button variant="outline" className="h-full min-h-32 flex flex-col items-center justify-center border-dashed">
                <FolderPlus className="h-6 w-6 mb-2" />
                <span>Create Folder</span>
              </Button>
              
              {filteredMedia.map((media) => (
                <div 
                  key={media.id} 
                  className={`relative group border rounded-md overflow-hidden ${
                    selectedMedia.includes(media.id) ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="aspect-square bg-muted/50">
                    {media.type === 'image' && (
                      <img 
                        src={media.url} 
                        alt={media.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                    {media.type === 'video' && (
                      <div className="h-full w-full flex items-center justify-center bg-black">
                        <video src={media.url} className="h-full w-full object-contain" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/50 rounded-full p-2">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                    {media.type === 'document' && (
                      <div className="h-full w-full flex items-center justify-center bg-muted">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-2">
                    <p className="text-sm font-medium truncate">{media.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(media.size)}</p>
                  </div>
                  
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => toggleMediaSelection(media.id)}
                    >
                      <Check className={`h-4 w-4 ${selectedMedia.includes(media.id) ? 'text-primary' : ''}`} />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="h-7 w-7">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <div className="grid grid-cols-12 py-2 px-4 bg-muted/50 font-medium text-sm">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-2">Date</div>
              </div>
              {filteredMedia.map((media) => (
                <div 
                  key={media.id} 
                  className={`grid grid-cols-12 py-2 px-4 items-center hover:bg-muted/50 ${
                    selectedMedia.includes(media.id) ? 'bg-muted/30' : ''
                  }`}
                >
                  <div className="col-span-6 flex items-center gap-2">
                    <div 
                      className="size-8 flex-shrink-0 flex items-center justify-center rounded-md"
                      onClick={() => toggleMediaSelection(media.id)}
                    >
                      {media.type === 'image' && <ImageIcon className="h-5 w-5" />}
                      {media.type === 'video' && <Video className="h-5 w-5" />}
                      {media.type === 'document' && <FileText className="h-5 w-5" />}
                    </div>
                    <span className="truncate">{media.name}</span>
                  </div>
                  <div className="col-span-2 capitalize">{media.type}</div>
                  <div className="col-span-2">{formatFileSize(media.size)}</div>
                  <div className="col-span-2">{new Date(media.uploadDate).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          )}
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TabsContent>
        
        <TabsContent value="images" className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-8 flex flex-col items-center justify-center">
            <h3 className="text-xl font-medium mb-2">Image Management</h3>
            <p className="text-muted-foreground text-center mb-4">
              Filter by "Images" type in the All Media tab to manage your images
            </p>
            <Button onClick={() => {
              setSelectedType('image');
              document.querySelector('[data-value="all"]').click();
            }}>View Images</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-8 flex flex-col items-center justify-center">
            <h3 className="text-xl font-medium mb-2">Video Management</h3>
            <p className="text-muted-foreground text-center mb-4">
              Filter by "Videos" type in the All Media tab to manage your videos
            </p>
            <Button onClick={() => {
              setSelectedType('video');
              document.querySelector('[data-value="all"]').click();
            }}>View Videos</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-8 flex flex-col items-center justify-center">
            <h3 className="text-xl font-medium mb-2">Document Management</h3>
            <p className="text-muted-foreground text-center mb-4">
              Filter by "Documents" type in the All Media tab to manage your documents
            </p>
            <Button onClick={() => {
              setSelectedType('document');
              document.querySelector('[data-value="all"]').click();
            }}>View Documents</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Utility function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Missing components for media display
const Play = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const Video = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
  </svg>
);

const FileText = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </svg>
);

const Check = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default MediaManagement;