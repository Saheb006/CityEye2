import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, CheckCircle, AlertCircle, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { getIssues, getUsers } from "@/lib/store"

export function EnhancedHero({ onReportIssue, onViewIssues }) {
  const issues = getIssues()
  const users = getUsers()
  
  const totalIssues = issues.length
  const resolvedIssues = issues.filter(issue => issue.status === 'resolved').length
  const activeMembers = users.length
  const openIssues = issues.filter(issue => issue.status !== 'resolved').length

  const stats = [
    { label: "Issues Reported", value: totalIssues, icon: AlertCircle, color: "text-primary" },
    { label: "Issues Resolved", value: resolvedIssues, icon: CheckCircle, color: "text-success" },
    { label: "Active Members", value: activeMembers, icon: Users, color: "text-warning" },
    { label: "Open Issues", value: openIssues, icon: TrendingUp, color: "text-destructive" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-primary-light/20 rounded-full blur-xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary-dark/20 rounded-full blur-xl"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          {/* Main Headline */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Watch your city,{" "}
            <span className="bg-gradient-to-r from-primary via-primary-light to-primary-dark bg-clip-text text-transparent">
              together
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Report civic issues in 30 seconds. Connect with your community. 
            Watch your city improve together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              onClick={onReportIssue}
              size="lg"
              className="gradient-primary text-white hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
            >
              Report an Issue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={onViewIssues}
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8 py-6"
            >
              View Issues
            </Button>
          </motion.div>
        </div>

        {/* Community Impact Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <Card className="glass-effect hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                  <motion.div
                    className="text-3xl font-bold text-foreground mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}