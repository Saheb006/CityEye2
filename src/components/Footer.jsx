import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Clock, MapPin, Eye } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* About CityEye */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="rounded-lg bg-primary p-2">
                <Eye className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold">CityEye</h3>
                <p className="text-sm text-muted-foreground">Community First</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering citizens to report civic issues and work together with local authorities 
              to build better, more responsive communities.
            </p>
            <p className="text-xs text-muted-foreground">
              Frontend Demo - No real Aadhaar verification
            </p>
          </div>

          {/* Get in Touch */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">+91 1800-123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">help@cityeye.gov.in</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Office</p>
                  <p className="text-sm text-muted-foreground">
                    City Hall, Municipal Building<br />
                    New Delhi - 110001
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Office Hours</p>
                  <p className="text-sm text-muted-foreground">
                    Mon - Fri: 9:00 AM - 6:00 PM<br />
                    Sat: 10:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Why CityEye?</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Response Time</span>
                <span className="text-sm font-medium">24-48 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Success Rate</span>
                <span className="text-sm font-medium text-success">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Community Satisfaction</span>
                <span className="text-sm font-medium text-success">4.8/5</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                CityEye is committed to transparency, accountability, and building stronger 
                connections between citizens and local government.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 CityEye. Built for community engagement and civic participation.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            This is a frontend demo application. No real data is processed.
          </p>
        </div>
      </div>
    </footer>
  )
}