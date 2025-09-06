import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  MessageCircle, 
  MapPin, 
  Calendar,
  Plus,
  Settings,
  Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  ArrowLeft
} from "lucide-react"
import { useState, useEffect } from "react"
import { getIssues, getCurrentUser, likeIssue } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export function Dashboard({ onReportIssue }) {
  const [issues, setIssues] = useState([])
  const [filter, setFilter] = useState('all')
  const currentUser = getCurrentUser()
  const { toast } = useToast()

  useEffect(() => {
    loadIssues()
  }, [filter])

  const loadIssues = () => {
    let allIssues = getIssues().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    if (filter !== 'all') {
      allIssues = allIssues.filter(issue => issue.status === filter)
    }
    
    setIssues(allIssues)
  }

  const handleLike = (issueId) => {
    if (!currentUser) {
      toast({
        title: "Please sign up",
        description: "You need an account to like issues.",
        variant: "destructive"
      })
      return
    }

    likeIssue(issueId, currentUser.id)
    loadIssues()
  }

  const handleChat = () => {
    toast({
      title: "Chat Feature",
      description: "Chat functionality would connect you with local officials and other community members.",
    })
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

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Community Issues</h1>
            <p className="text-muted-foreground">Track and engage with civic issues in your area</p>
          </div>
          <Button onClick={onReportIssue} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Report New Issue</span>
          </Button>
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

        {/* Issues Grid */}
        {issues.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Issues Found</h3>
              <p className="text-muted-foreground mb-4">
                {filter === 'all' 
                  ? "No issues have been reported yet. Be the first to help your community!"
                  : `No issues with status "${filter}" found.`
                }
              </p>
              {filter === 'all' && (
                <Button onClick={onReportIssue}>
                  <Plus className="mr-2 h-4 w-4" />
                  Report First Issue
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {issues.map((issue) => {
              const StatusIcon = getStatusIcon(issue.status)
              const isLiked = currentUser?.id && issue.likedBy.includes(currentUser.id)
              
              return (
                <Card key={issue.id} className="hover:shadow-lg transition-shadow">
                  {/* Issue Image */}
                  {issue.image && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={issue.image} 
                        alt={issue.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg line-clamp-2">{issue.title}</CardTitle>
                      <Badge className={getStatusColor(issue.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {issue.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {issue.description}
                    </p>

                    {/* Location */}
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{issue.location}</span>
                    </div>

                    {/* Category & Date */}
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline">{issue.category}</Badge>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(issue.createdAt)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(issue.id)}
                        className={isLiked ? "text-destructive" : ""}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                        {issue.likes}
                      </Button>
                      
                      <Button variant="ghost" size="sm" onClick={handleChat}>
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
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