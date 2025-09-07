import { Card, CardContent } from "@/components/ui/card"
import { FileText, Cpu, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    icon: FileText,
    title: "Report",
    description: "Upload a photo and describe the issue in your community",
    details: "Quick form with image upload, title, description, and location"
  },
  {
    icon: Cpu,
    title: "Auto-Categorize", 
    description: "Our smart system categorizes your report automatically",
    details: "AI-powered categorization: Roadways, Environmental, Community, etc."
  },
  {
    icon: CheckCircle,
    title: "Resolution",
    description: "City officials review and resolve issues efficiently",
    details: "Track progress from reported to under review to resolved"
  }
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="how-it-works" ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to make your voice heard and drive positive change in your community.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Desktop Horizontal Layout */}
          <div className="hidden lg:flex items-center justify-between relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary-light to-primary transform -translate-y-1/2 z-0" />
            
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="w-72 glass-effect hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <step.icon className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    <p className="text-sm text-muted-foreground/80">
                      {step.details}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Mobile Vertical Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <step.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    {step.description}
                  </p>
                  <p className="text-sm text-muted-foreground/80">
                    {step.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}