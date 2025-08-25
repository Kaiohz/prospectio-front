import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Filter, Search, MoreHorizontal, Users } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockApi } from "@/adapters/mockData";
import { LeadStatus } from "@/domain/types";

export default function Leads() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");

  const { data: leadsData, isLoading } = useQuery({
    queryKey: ["leads", { search, statusFilter }],
    queryFn: () => mockApi.leads.getAll({
      search,
      status: statusFilter === "all" ? [] : [statusFilter],
    }),
  });

  const leads = leadsData?.data || [];

  return (
    <div className="flex-1 overflow-auto">
      <Header 
        title="Leads" 
        description="Manage your prospects and track their journey through your sales pipeline."
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-80"
              />
            </div>

            {/* Status Filter */}
            <Select
              value={statusFilter}
              onValueChange={(value: LeadStatus | "all") => setStatusFilter(value)}
            >
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="hot">Hot</SelectItem>
                <SelectItem value="warm">Warm</SelectItem>
                <SelectItem value="cold">Cold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="gradient-primary glow">
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </Header>

      <div className="p-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : leads.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <div className="text-muted-foreground">
                <Users className="mx-auto h-12 w-12 mb-4" />
                <h3 className="text-lg font-medium mb-2">No leads found</h3>
                <p className="text-sm">
                  {search || statusFilter !== "all" 
                    ? "Try adjusting your search or filters"
                    : "Get started by adding your first lead"
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leads.map((lead) => (
              <Card key={lead.id} className="gradient-card border-0 card-shadow transition-smooth hover:card-shadow-lg animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {lead.firstName[0]}{lead.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-foreground">
                          {lead.firstName} {lead.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground">{lead.position}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Add Task</DropdownMenuItem>
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{lead.company}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <StatusBadge status={lead.status} />
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">Score: {lead.score}</p>
                        <div className="w-16 h-1 bg-muted rounded-full mt-1">
                          <div 
                            className="h-full rounded-full transition-smooth"
                            style={{ 
                              width: `${lead.score}%`,
                              backgroundColor: lead.score >= 80 ? 'hsl(var(--status-hot))' :
                                             lead.score >= 60 ? 'hsl(var(--status-warm))' : 
                                             'hsl(var(--status-cold))'
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {lead.lastContactedAt ? (
                        <>Last contact: {new Date(lead.lastContactedAt).toLocaleDateString()}</>
                      ) : (
                        <>Created: {new Date(lead.createdAt).toLocaleDateString()}</>
                      )}
                    </div>

                    {lead.notes && (
                      <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                        {lead.notes.length > 100 ? `${lead.notes.substring(0, 100)}...` : lead.notes}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      Contact
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Add Task
                    </Button>
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