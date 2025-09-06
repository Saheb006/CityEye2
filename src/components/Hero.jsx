import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, List, Users, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react"
import { getCommunityStats } from "@/lib/store"
import { useEffect, useState } from "react"

export function Hero({ onReportIssue, onViewIssues }) {
  const [stats, setStats] = useState(getCommunityStats())

  useEffect(() => {
    // Update stats when component mounts
    setStats(getCommunityStats())
  }, [])

  const statItems = [
    {
      label: "Issues Reported",
      value: stats.totalIssues,
      icon: TrendingUp,
      color: "text-primary"
    },
    {
      label: "Issues Resolved",
      value: stats.resolvedIssues,
      icon: CheckCircle,
      color: "text-success"
    },
    {
      label: "Active Members",
      value: stats.activeMembers,
      icon: Users,
      color: "text-warning"
    },
    {
      label: "Open Issues",
      value: stats.openIssues,
      icon: AlertTriangle,
      color: "text-destructive"
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary-light to-accent">
      <div className="container mx-auto text-center">
        {/* Hero Content */}
        <div className="max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Your Voice,
            <span className="text-primary"> Your City</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Report civic issues in 30 seconds and help build a better community together.
            Every report matters, every voice counts.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onReportIssue}
              className="text-lg px-8 py-4 h-auto"
            >
              <Plus className="mr-2 h-5 w-5" />
              Report an Issue
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onViewIssues}
              className="text-lg px-8 py-4 h-auto"
            >
              <List className="mr-2 h-5 w-5" />
              View Recent Issues
            </Button>
          </div>
        </div>

        {/* Community Impact Stats */}
        <Card className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
              Community Impact
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statItems.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}