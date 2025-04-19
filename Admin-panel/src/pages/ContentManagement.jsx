import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// 引入模拟API
import { fetchMockData } from '../services/mockApi';

const ContentManagement = () => {
  const [loading, setLoading] = useState(true);
  const [contentData, setContentData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    // 使用模拟API获取内容管理数据
    // TODO: 后期替换为真实API调用
    const fetchContent = async () => {
      setLoading(true);
      try {
        const data = await fetchMockData('content');
        setContentData(data);
      } catch (error) {
        console.error('获取内容数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // 过滤文章
  const filteredPosts = contentData?.posts?.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  if (loading || !contentData) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">内容管理</h1>
        <div className="bg-muted/50 p-8 rounded-lg flex items-center justify-center">
          <p>加载内容中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">内容管理</h1>
        <Button>新建文章</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="posts">文章</TabsTrigger>
          <TabsTrigger value="categories">分类</TabsTrigger>
          <TabsTrigger value="tags">标签</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="搜索文章..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                共 {contentData.posts.length} 篇文章
              </span>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>标题</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>分类</TableHead>
                    <TableHead>作者</TableHead>
                    <TableHead>日期</TableHead>
                    <TableHead>浏览量</TableHead>
                    <TableHead>评论</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>
                        <Badge variant={post.status === 'published' ? 'default' : 'outline'}>
                          {post.status === 'published' ? '已发布' : '草稿'}
                        </Badge>
                      </TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{post.date}</TableCell>
                      <TableCell>{post.views.toLocaleString()}</TableCell>
                      <TableCell>{post.comments}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">编辑</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>分类管理</CardTitle>
              <CardDescription>管理博客文章分类</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名称</TableHead>
                    <TableHead>文章数量</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentData.categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.count}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">编辑</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tags">
          <Card>
            <CardHeader>
              <CardTitle>标签管理</CardTitle>
              <CardDescription>管理博客文章标签</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {contentData.tags.map((tag) => (
                  <Badge key={tag.id} variant="outline" className="text-sm py-1 px-3">
                    {tag.name} ({tag.count})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;