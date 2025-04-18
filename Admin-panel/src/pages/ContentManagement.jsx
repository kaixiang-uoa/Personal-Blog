import React, { useState, useEffect } from 'react';
import { Filter, Plus, Search, Tag, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAdminContext } from '../contexts/AdminContext';

const ContentManagement = () => {
  const { posts, categories, updatePost, deletePost, addNewPost } = useAdminContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const initialNewPost = {
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    status: 'draft'
  };
  
  const [newPost, setNewPost] = useState(initialNewPost);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm, selectedCategory, selectedStatus]);

  const filterPosts = () => {
    let results = [...posts];
    
    if (searchTerm) {
      results = results.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      results = results.filter(post => post.category === selectedCategory);
    }
    
    if (selectedStatus !== 'all') {
      results = results.filter(post => post.status === selectedStatus);
    }
    
    setFilteredPosts(results);
  };

  const handleEditPost = (post) => {
    setCurrentPost(post);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleNewPost = () => {
    setIsEditing(false);
    setCurrentPost(null);
    setNewPost(initialNewPost);
    setIsDialogOpen(true);
  };

  const handleSavePost = () => {
    if (isEditing && currentPost) {
      updatePost(currentPost.id, currentPost);
    } else {
      addNewPost(newPost);
      setNewPost(initialNewPost);
    }
    setIsDialogOpen(false);
  };

  const handleDeletePost = (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(id);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Button onClick={handleNewPost}>
          <Plus className="mr-2 h-4 w-4" /> Add New Post
        </Button>
      </div>

      <Tabs defaultValue="posts" className="mb-6">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="categories">Categories & Tags</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                type="search"
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-1/4">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-1/4">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" className="hidden sm:flex">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>
                        <Badge variant={post.status === 'published' ? 'default' : 'outline'}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditPost(post)}>
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeletePost(post.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No posts found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="pages">
          <div className="bg-muted/50 rounded-lg p-8 flex flex-col items-center justify-center">
            <h3 className="text-xl font-medium mb-2">Page Management</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create and manage static pages for your blog
            </p>
            <Button>Manage Pages</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Categories</h3>
                <Button size="sm">Add Category</Button>
              </div>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{category.count}</Badge>
                      <span>{category.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Tags</h3>
                <Button size="sm">Add Tag</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="px-3 py-1">
                  <span>JavaScript</span>
                  <button className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <X className="h-2 w-2" />
                  </button>
                </Badge>
                <Badge className="px-3 py-1">
                  <span>React</span>
                  <button className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <X className="h-2 w-2" />
                  </button>
                </Badge>
                <Badge className="px-3 py-1">
                  <span>Web Development</span>
                  <button className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <X className="h-2 w-2" />
                  </button>
                </Badge>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Post' : 'Create New Post'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Make changes to the post here. Click save when you\'re done.' : 'Fill in the details for your new post.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                value={isEditing ? currentPost?.title || '' : newPost.title}
                onChange={(e) => {
                  if (isEditing) {
                    setCurrentPost({...currentPost, title: e.target.value});
                  } else {
                    setNewPost({...newPost, title: e.target.value});
                  }
                }}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your post content here..."
                className="min-h-[200px]"
                value={isEditing ? currentPost?.content || '' : newPost.content}
                onChange={(e) => {
                  if (isEditing) {
                    setCurrentPost({...currentPost, content: e.target.value});
                  } else {
                    setNewPost({...newPost, content: e.target.value});
                  }
                }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={isEditing ? currentPost?.category || '' : newPost.category}
                  onValueChange={(value) => {
                    if (isEditing) {
                      setCurrentPost({...currentPost, category: value});
                    } else {
                      setNewPost({...newPost, category: value});
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={isEditing ? currentPost?.status || 'draft' : newPost.status}
                  onValueChange={(value) => {
                    if (isEditing) {
                      setCurrentPost({...currentPost, status: value});
                    } else {
                      setNewPost({...newPost, status: value});
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="e.g. JavaScript, React, Tutorial"
                value={isEditing ? currentPost?.tags || '' : newPost.tags}
                onChange={(e) => {
                  if (isEditing) {
                    setCurrentPost({...currentPost, tags: e.target.value});
                  } else {
                    setNewPost({...newPost, tags: e.target.value});
                  }
                }}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                placeholder="Brief description of the post"
                value={isEditing ? currentPost?.excerpt || '' : newPost.excerpt}
                onChange={(e) => {
                  if (isEditing) {
                    setCurrentPost({...currentPost, excerpt: e.target.value});
                  } else {
                    setNewPost({...newPost, excerpt: e.target.value});
                  }
                }}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSavePost}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Ensure X component is available
const X = (props) => (
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default ContentManagement;