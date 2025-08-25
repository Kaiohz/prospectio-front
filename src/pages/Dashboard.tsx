import { useQuery } from "@tanstack/react-query";
import { Users, TrendingUp, CheckSquare, Clock } from "lucide-react";
import { Header } from "@/components/layout/header";
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockApi } from "@/adapters/mockData";
// import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import heroImage from "@/assets/dashboard-hero.jpg";

const chartData = [
  { name: "Jan", leads: 12, conversions: 2 },
  { name: "Feb", leads: 19, conversions: 3 },
  { name: "Mar", leads: 15, conversions: 4 },
  { name: "Apr", leads: 25, conversions: 6 },
  { name: "May", leads: 22, conversions: 5 },
  { name: "Jun", leads: 30, conversions: 8 },
];

const leadStatusData = [
  { name: "Hot", value: 2, color: "hsl(var(--status-hot))" },
  { name: "Warm", value: 2, color: "hsl(var(--status-warm))" },
  { name: "Cold", value: 2, color: "hsl(var(--status-cold))" },
];

export default function Dashboard() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: () => mockApi.dashboard.getMetrics(),
  });

  const { data: recentTasks } = useQuery({
    queryKey: ["recent-tasks"],
    queryFn: () => mockApi.tasks.getAll({ completed: false }),
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const dashboardMetrics = metrics?.data;

  return (
    <div className="flex-1 overflow-auto">
      <Header 
        title="Dashboard" 
        description="Welcome back! Here's what's happening with your leads today."
      />

      <div className="p-6 space-y-6">
        {/* Hero Section */}
        <Card className="relative overflow-hidden border-0 card-shadow-lg">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="relative gradient-primary p-8 text-primary-foreground">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-2">
                Drive Your Sales Pipeline Forward
              </h2>
              <p className="text-primary-foreground/90 mb-6">
                Track your leads, manage tasks, and close more deals with intelligent prospecting tools.
              </p>
              <div className="flex space-x-4">
                <Button variant="secondary" size="lg">
                  Add New Lead
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  View All Tasks
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Leads"
            value={dashboardMetrics?.totalLeads || 0}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Hot Leads"
            value={dashboardMetrics?.hotLeads || 0}
            description="Ready to close"
            icon={TrendingUp}
            trend={{ value: 8, isPositive: true }}
          />
          <MetricCard
            title="Tasks Today"
            value={dashboardMetrics?.tasksToday || 0}
            description="Due today"
            icon={CheckSquare}
          />
          <MetricCard
            title="Conversion Rate"
            value={`${dashboardMetrics?.conversionRate || 0}%`}
            icon={Clock}
            trend={{ value: 2.5, isPositive: true }}
          />
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lead Status Distribution */}
          <Card className="gradient-card border-0 card-shadow">
            <CardHeader>
              <CardTitle>Lead Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leadStatusData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.name} Leads</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{item.value}</span>
                      <div className="w-24 h-2 bg-muted rounded-full">
                        <div 
                          className="h-full rounded-full transition-smooth"
                          style={{ 
                            width: `${(item.value / 6) * 100}%`,
                            backgroundColor: item.color 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="gradient-card border-0 card-shadow">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Lead status updated</p>
                    <p className="text-xs text-muted-foreground">Sarah Johnson moved to Hot</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 min ago</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New task created</p>
                    <p className="text-xs text-muted-foreground">Follow-up call scheduled</p>
                  </div>
                  <span className="text-xs text-muted-foreground">15 min ago</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 rounded-full bg-warning"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Email sent</p>
                    <p className="text-xs text-muted-foreground">Proposal sent to Michael Chen</p>
                  </div>
                  <span className="text-xs text-muted-foreground">1 hour ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tasks */}
        <Card className="gradient-card border-0 card-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Tasks</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks?.data?.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      task.priority === 'high' ? 'bg-destructive' :
                      task.priority === 'medium' ? 'bg-warning' : 'bg-success'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Due {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Mark Complete
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}