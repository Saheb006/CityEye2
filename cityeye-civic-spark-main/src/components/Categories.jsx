import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Construction, TreePine, Users, Droplets, Car, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const categories = [
  {
    icon: Construction,
    title: "Roadways",
    description: "Potholes, broken roads, street lighting",
    color: "bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400"
  },
  {
    icon: TreePine,
    title: "Environmental",
    description: "Garbage, pollution, green spaces",
    color: "bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400"
  },
  {
    icon: Users,
    title: "Community",
    description: "Public facilities, safety, accessibility",
    color: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400"
  },
  {
    icon: Droplets,
    title: "Sewage",
    description: "Drainage, water supply, sanitation",
    color: "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400"
  },
  {
    icon: Car,
    title: "Traffic",
    description: "Signals, congestion, parking",
    color: "bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400"
  },
  {
    icon: HelpCircle,
    title: "General",
    description: "Other civic issues and concerns",
    color: "bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400"
  }
]

export function Categories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Issue Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We automatically categorize your reports to ensure they reach the right department quickly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50, rotate: -2 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 50, rotate: -2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="cursor-pointer"
            >
              <Card className={`h-full transition-all duration-300 hover:shadow-xl ${category.color.split(' ')[0]} ${category.color.split(' ')[1]} border-2 border-transparent hover:border-current/20`}>
                <CardHeader className="text-center pb-3">
                  <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-current/10">
                    <category.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}