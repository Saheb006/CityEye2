import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Shield,
  Trash2,
  UserX,
  Calendar,
  MapPin,
  User,
  Eye,
  Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  ArrowLeft
} from "lucide-react"
import { useState, useEffect } from "react"
import { getIssues, getUsers, getCurrentUser, updateIssue, deleteIssue, banUser } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export function AdminPanel({ onAccessDenied }) {
  const [issues, setIssues] = useState([])
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('all')
  const currentUser = getCurrentUser()
  const { toast } = useToast()

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      onAccessDenied()
      return
    }
    
    loadData()
  }, [currentUser, filter])

  const loadData = () => {
    let allIssues = getIssues().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    if (filter !== 'all') {
      allIssues = allIssues.filter(issue => issue.status === filter)
    }
    
    setIssues(allIssues)
    setUsers(getUsers())
  }

  const handleStatusChange = (issueId, newStatus) => {
    updateIssue(issueId, { status: newStatus })
    loadData()
    
    toast({
      title: "Status Updated",
      description: `Issue status changed to ${newStatus.replace('-', ' ')}.`,
    })
  }

  const handleDeleteIssue = (issueId) => {
    deleteIssue(issueId)
    loadData()
    
    toast({
      title: "Issue Deleted",
      description: "The issue has been permanently removed.",
    })
  }

  const handleBanUser = (userId) => {
    const user = users.find(u => u.id === userId)
    if (user) {
      banUser(userId)
      loadData()
      
      toast({
        title: "User Banned",
        description: `${user.name} has been banned from the platform.`,
        variant: "destructive"
      })
    }
  }

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId)
    return user?.name || 'Unknown User'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'reported': return 'bg-destructive text-destructive-foreground'
      case 'under-review': return 'bg-warning text-warning-foreground'
      case 'in-progress': return 'bg-primary text-primary-foreground'
      case 'resolved': return 'bg-success text-success-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'reported': return AlertCircle
      case 'under-review': return Eye
      case 'in-progress': return Clock
      case 'resolved': return CheckCircle
      default: return AlertCircle
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filters = [
    { key: 'all', label: 'All Issues' },
    { key: 'reported', label: 'Reported' },
    { key: 'under-review', label: 'Under Review' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'resolved', label: 'Resolved' }
  ]

  if (!currentUser || currentUser.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-warning/20 p-2">
              <Shield className="h-6 w-6 text-warning" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground">Manage community issues and users</p>
            </div>
          </div>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Settings className="h-3 w-3" />
            <span>Admin Access</span>
          </Badge>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Filter className="h-4 w-4 text-muted-foreground mt-2" />
          {filters.map((filterOption) => (
            <Button
              key={filterOption.key}
              variant={filter === filterOption.key ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterOption.key)}
            >
              {filterOption.label}
            </Button>
          ))}
        </div>

        {/* Issues Management */}
        {issues.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Issues Found</h3>
              <p className="text-muted-foreground">
                {filter === 'all' 
                  ? "No issues have been reported yet."
                  : `No issues with status "${filter}" found.`
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => {
              const StatusIcon = getStatusIcon(issue.status)
              const reporter = users.find(u => u.id === issue.reportedBy)
              
              return (
                <Card key={issue.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{issue.title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>Reported by: {getUserName(issue.reportedBy)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(issue.createdAt)}</span>
                          </div>
                          <Badge variant="outline">{issue.category}</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(issue.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {issue.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Issue Image */}
                    {issue.image && (
                      <div className="aspect-video max-w-sm overflow-hidden rounded-lg border">
                        <img 
                          src={issue.image} 
                          alt={issue.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Description */}
                    <div>
                      <h4 className="font-semibold mb-2">Description:</h4>
                      <p className="text-muted-foreground">{issue.description}</p>
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{issue.location}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-4 border-t">
                      <Select 
                        value={issue.status} 
                        onValueChange={(value) => handleStatusChange(issue.id, value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reported">Reported</SelectItem>
                          <SelectItem value="under-review">Under Review</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteIssue(issue.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete Issue
                      </Button>

                      {reporter && !reporter.banned && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBanUser(issue.reportedBy)}
                          className="text-destructive hover:text-destructive"
                        >
                          <UserX className="h-4 w-4 mr-1" />
                          Ban User
                        </Button>
                      )}

                      <div className="text-sm text-muted-foreground ml-auto">
                        {issue.likes} likes
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}