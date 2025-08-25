import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Calendar, Filter, Clock, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockApi } from "@/adapters/mockData";
import { TaskPriority, TaskType } from "@/domain/types";
import { cn } from "@/lib/utils";

export default function Tasks() {
  const [filterCompleted, setFilterCompleted] = useState<boolean | "all">("all");
  const [filterPriority, setFilterPriority] = useState<TaskPriority | "all">("all");

  const { data: tasksData, isLoading } = useQuery({
    queryKey: ["tasks", { filterCompleted, filterPriority }],
    queryFn: () => mockApi.tasks.getAll({
      completed: filterCompleted === "all" ? undefined : filterCompleted,
      priority: filterPriority === "all" ? [] : [filterPriority],
    }),
  });

  const tasks = tasksData?.data || [];

  const getTaskTypeIcon = (type: TaskType) => {
    switch (type) {
      case 'call': return '📞';
      case 'email': return '✉️';
      case 'meeting': return '🤝';
      case 'follow_up': return '🔄';
      case 'demo': return '🎯';
      default: return '📋';
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high': return 'text-destructive bg-destructive/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const isOverdue = (dueDate: Date) => {
    return new Date(dueDate) < new Date() && !filterCompleted;
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header 
        title="Tasks" 
        description="Stay on top of your follow-ups and never miss an important touchpoint."
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select
              value={filterCompleted.toString()}
              onValueChange={(value) => setFilterCompleted(value === "all" ? "all" : value === "true")}
            >
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="false">Pending</SelectItem>
                <SelectItem value="true">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filterPriority}
              onValueChange={(value: TaskPriority | "all") => setFilterPriority(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="gradient-primary glow">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </Header>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="gradient-card border-0 card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <div>
                  <p className="text-sm font-medium">Completed</p>
                  <p className="text-lg font-bold">{tasks.filter(t => t.completed).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-sm font-medium">Pending</p>
                  <p className="text-lg font-bold">{tasks.filter(t => !t.completed).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Due Today</p>
                  <p className="text-lg font-bold">
                    {tasks.filter(t => 
                      !t.completed && 
                      new Date(t.dueDate).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 rounded-full bg-destructive"></div>
                <div>
                  <p className="text-sm font-medium">Overdue</p>
                  <p className="text-lg font-bold">
                    {tasks.filter(t => !t.completed && isOverdue(t.dueDate)).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <div className="text-muted-foreground">
                <CheckCircle2 className="mx-auto h-12 w-12 mb-4" />
                <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                <p className="text-sm">
                  Create your first task to start managing your follow-ups
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card 
                key={task.id} 
                className={cn(
                  "gradient-card border-0 card-shadow transition-smooth hover:card-shadow-lg animate-fade-in",
                  task.completed && "opacity-75",
                  isOverdue(task.dueDate) && "ring-2 ring-destructive/20"
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox 
                      checked={task.completed}
                      className="mt-1"
                    />

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{getTaskTypeIcon(task.type)}</span>
                            <h3 className={cn(
                              "font-medium",
                              task.completed && "line-through text-muted-foreground"
                            )}>
                              {task.title}
                            </h3>
                          </div>
                          {task.description && (
                            <p className="text-sm text-muted-foreground">
                              {task.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge variant="outline">
                            {task.type}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Due {new Date(task.dueDate).toLocaleDateString()}
                              {isOverdue(task.dueDate) && (
                                <span className="text-destructive ml-1">(Overdue)</span>
                              )}
                            </span>
                          </span>
                          <span>Lead: #{task.leadId}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          {!task.completed && (
                            <Button variant="outline" size="sm">
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}