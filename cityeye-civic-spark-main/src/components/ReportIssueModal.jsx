import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Camera, MapPin, Send, AlertCircle } from "lucide-react"
import { useState, useRef } from "react"
import { saveIssue, categorizeIssue, getCurrentUser } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export function ReportIssueModal({ open, onOpenChange, onIssueReported }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    image: ''
  })
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)
  const { toast } = useToast()

  const currentUser = getCurrentUser()

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target?.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    
    const file = e.dataTransfer.files[0]
    if (file) handleImageUpload(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) handleImageUpload(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!currentUser) {
      toast({
        title: "Please sign up first",
        description: "You need to create an account to report issues.",
        variant: "destructive"
      })
      return
    }

    if (!formData.title || !formData.description || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    setLoading(true)

    try {
      // Auto-categorize the issue
      const category = categorizeIssue(formData.title, formData.description)
      
      const issue = saveIssue({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        category,
        status: 'reported',
        image: formData.image,
        reportedBy: currentUser.id
      })

      toast({
        title: "Issue Reported Successfully!",
        description: `Thanks — the city team has been notified about this ${category.toLowerCase()} issue.`,
      })

      onOpenChange(false)
      onIssueReported?.()
      
      // Reset form
      setFormData({ title: '', description: '', location: '', image: '' })

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to report issue. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            <span>Report an Issue</span>
          </DialogTitle>
          <DialogDescription>
            Help improve your community by reporting civic issues. We'll categorize and forward it to the right team.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Issue Photo (Optional)</Label>
            {formData.image ? (
              <div className="relative">
                <img 
                  src={formData.image} 
                  alt="Issue preview" 
                  className="w-full h-48 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-primary bg-primary-light' : 'border-muted-foreground/25'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drop an image here or click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports: JPG, PNG, GIF (max 10MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Issue Title *</Label>
            <Input
              id="title"
              placeholder="Brief description of the issue"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide more details about the issue, when you noticed it, and how it affects the community..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Location *</span>
            </Label>
            <Input
              id="location"
              placeholder="Street address, landmark, or area description"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              required
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !currentUser} className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              {loading ? "Reporting..." : "Report Issue"}
            </Button>
          </div>

          {!currentUser && (
            <p className="text-sm text-muted-foreground text-center">
              Please sign up first to report issues
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}