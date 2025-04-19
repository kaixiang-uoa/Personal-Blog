import React, { useState, useEffect } from 'react';
import { Activity, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Button } from '../components/ui/button';
// 引入模拟API
import { fetchMockData } from '../services/mockApi';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // 使用模拟API获取仪表盘数据
    // TODO: 后期替换为真实API调用
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchMockData('dashboard');
        setDashboardData(data);
      } catch (error) {
        console.error('获取仪表盘数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 如果数据正在加载或未加载，显示加载状态
  if (loading || !dashboardData) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button disabled>Refresh Stats</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">...</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const { stats, recentPosts, popularPosts, trafficData } = dashboardData;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => window.location.reload()}>Refresh Stats</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +{stats.newPosts} new since last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +{stats.viewsGrowth}% since last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.totalComments}</div>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +{stats.newComments} new since last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.conversionRate}%</div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.conversionChange > 0 ? '+' : ''}{stats.conversionChange}% since last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>View your blog's traffic over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="h-full w-full bg-muted/50 rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Traffic chart visualization will be displayed here</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Data: {trafficData.labels.join(', ')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Content</CardTitle>
            <CardDescription>Your most viewed posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularPosts.map((post, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="bg-primary/10 rounded-md h-8 w-8 flex items-center justify-center">
                    <span className="text-primary font-medium">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium line-clamp-1">{post.title}</p>
                    <p className="text-xs text-muted-foreground">{post.views.toLocaleString()} views</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;