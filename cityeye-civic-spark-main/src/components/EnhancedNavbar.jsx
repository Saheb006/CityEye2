import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { Eye, Plus, List, User, Menu, X, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { getCurrentUser, logout } from "@/lib/store"
import { motion, AnimatePresence } from "framer-motion"

export function EnhancedNavbar({ onReportIssue, onViewIssues, onSignUp, onNavigate, onBack, showBackButton }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const currentUser = getCurrentUser()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = () => {
    logout()
    window.location.reload()
  }

  const navItems = [
    { name: "Report an Issue", action: onReportIssue },
    { name: "View Issues", action: onViewIssues },
    { name: "How it Works", action: () => onNavigate('how-it-works') },
    { name: "Community Impact", action: () => onNavigate('community-impact') },
    { name: "Contact", action: () => onNavigate('contact') },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-lg' 
          : 'bg-gradient-to-r from-primary/10 via-primary-light/5 to-primary/10'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Back Button + Logo */}
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Back Button */}
            {showBackButton && onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="rounded-xl bg-primary p-2.5 shadow-lg">
                <Eye className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">CityEye</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Watch your city, together</p>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <Button
                  variant="ghost"
                  onClick={item.action}
                  className="text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  {item.name}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center space-x-3">
              {currentUser ? (
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm text-muted-foreground">
                    {currentUser.name}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </motion.div>
              ) : (
                <Button onClick={onSignUp} className="gradient-primary text-white">
                  <User className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              )}
            </div>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-2 border-t border-border">
                {/* Mobile Back Button */}
                {showBackButton && onBack && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      onBack()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}
                
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    onClick={() => {
                      item.action()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full justify-start text-foreground hover:text-primary"
                  >
                    {item.name}
                  </Button>
                ))}
                
                {/* Mobile Auth */}
                <div className="pt-2 border-t border-border">
                  {currentUser ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground px-3">
                        Signed in as {currentUser.name}
                      </p>
                      <Button
                        variant="outline"
                        onClick={handleSignOut}
                        className="w-full"
                      >
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        onSignUp()
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full gradient-primary text-white"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Sign Up
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}