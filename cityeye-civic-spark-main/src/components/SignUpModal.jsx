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
import { Card, CardContent } from "@/components/ui/card"
import { Shield, User, Eye, CreditCard } from "lucide-react"
import { useState } from "react"
import { saveUser, setCurrentUser } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export function SignUpModal({ open, onOpenChange }) {
  const [step, setStep] = useState('role')
  const [selectedRole, setSelectedRole] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    aadhaar: '',
    email: ''
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setStep('form')
  }

  const handleBack = () => {
    setStep('role')
    setSelectedRole(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Basic validation
      if (!formData.name || !formData.aadhaar) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        })
        return
      }

      // Simple Aadhaar format validation (demo only)
      if (formData.aadhaar.length !== 12 || !/^\d{12}$/.test(formData.aadhaar)) {
        toast({
          title: "Invalid Aadhaar",
          description: "Aadhaar number must be 12 digits.",
          variant: "destructive"
        })
        return
      }

      const user = saveUser({
        name: formData.name,
        email: formData.email,
        aadhaar: formData.aadhaar,
        role: selectedRole
      })

      setCurrentUser(user.id)

      toast({
        title: "Welcome to CityEye!",
        description: `Account created successfully as ${selectedRole}. Thanks for joining our community!`,
      })

      onOpenChange(false)
      
      // Reset form
      setStep('role')
      setSelectedRole(null)
      setFormData({ name: '', aadhaar: '', email: '' })

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-primary" />
            <span>Join CityEye</span>
          </DialogTitle>
          <DialogDescription>
            {step === 'role' 
              ? "Choose your role to get started with CityEye community."
              : `Create your ${selectedRole} account`
            }
          </DialogDescription>
        </DialogHeader>

        {step === 'role' ? (
          <div className="space-y-4">
            <Card 
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleRoleSelect('citizen')}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary-light p-3">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Sign up as Citizen</h3>
                    <p className="text-sm text-muted-foreground">
                      Report issues and help improve your community
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleRoleSelect('admin')}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-warning/20 p-3">
                    <Shield className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Sign up as Admin</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage and resolve community issues
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aadhaar" className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>Aadhaar Number *</span>
              </Label>
              <Input
                id="aadhaar"
                placeholder="1234 5678 9012"
                value={formData.aadhaar}
                onChange={(e) => setFormData(prev => ({ ...prev, aadhaar: e.target.value.replace(/\D/g, '') }))}
                maxLength={12}
                required
              />
              <p className="text-xs text-muted-foreground">
                Demo only - no real verification required
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}