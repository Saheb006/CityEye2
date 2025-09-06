import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Clock, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: "+91 1800-123-CITY",
    subtitle: "24/7 Emergency Line"
  },
  {
    icon: Mail,
    title: "Email",
    details: "support@cityeye.gov.in",
    subtitle: "Response within 24 hours"
  },
  {
    icon: Clock,
    title: "Office Hours", 
    details: "Mon - Fri: 9:00 AM - 6:00 PM",
    subtitle: "Government holidays excluded"
  },
  {
    icon: MapPin,
    title: "Address",
    details: "City Hall, Civic Center",
    subtitle: "Mumbai, Maharashtra"
  }
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? Need help? Our support team is here to assist you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full text-center hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <info.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-foreground mb-2">
                    {info.details}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {info.subtitle}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Map Placeholder */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="overflow-hidden">
            <div className="h-64 bg-gradient-to-r from-primary/20 via-primary-light/10 to-primary/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-lg font-semibold text-foreground">Interactive Map</p>
                <p className="text-muted-foreground">Coming soon - View issues on city map</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}