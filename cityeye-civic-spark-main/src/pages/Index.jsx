import { useState } from "react"
import { EnhancedNavbar } from "@/components/EnhancedNavbar"
import { EnhancedHero } from "@/components/EnhancedHero"
import { WhyCityEye } from "@/components/WhyCityEye"
import { HowItWorks } from "@/components/HowItWorks"
import { Categories } from "@/components/Categories"
import { Contact } from "@/components/Contact"
import { EnhancedFooter } from "@/components/EnhancedFooter"
import { SignUpModal } from "@/components/SignUpModal"
import { ReportIssueModal } from "@/components/ReportIssueModal"
import { Dashboard } from "@/components/Dashboard"
import { AdminPanel } from "@/components/AdminPanel"
import { getCurrentUser } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

const Index = () => {
  const [currentView, setCurrentView] = useState('home')
  const [signUpModalOpen, setSignUpModalOpen] = useState(false)
  const [reportIssueModalOpen, setReportIssueModalOpen] = useState(false)
  const { toast } = useToast()

  const currentUser = getCurrentUser()

  const handleReportIssue = () => {
    if (!currentUser) {
      setSignUpModalOpen(true)
      toast({
        title: "Sign up required",
        description: "Please create an account to report issues.",
        variant: "destructive"
      })
      return
    }
    setReportIssueModalOpen(true)
  }

  const handleViewIssues = () => {
    setCurrentView('dashboard')
  }

  const handleAdminAccess = () => {
    if (currentUser?.role === 'admin') {
      setCurrentView('admin')
    }
  }

  const handleAccessDenied = () => {
    setCurrentView('home')
    toast({
      title: "Access Denied",
      description: "You need admin privileges to access this section.",
      variant: "destructive"
    })
  }

  const handleBackToHome = () => {
    setCurrentView('home')
  }

  const handleNavigate = (section) => {
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleIssueReported = () => {
    // Refresh any relevant data and show success
    toast({
      title: "Issue Reported!",
      description: "Your issue has been successfully submitted to the city team.",
    })
  }

  // Check if user clicked admin panel access
  if (currentView === 'admin' && currentUser?.role === 'admin') {
    return (
      <>
        <EnhancedNavbar 
          onReportIssue={handleReportIssue}
          onViewIssues={handleViewIssues}
          onSignUp={() => setSignUpModalOpen(true)}
          onNavigate={handleNavigate}
          onBack={handleBackToHome}
          showBackButton={true}
        />
        <AdminPanel onAccessDenied={handleAccessDenied} />
        <EnhancedFooter />
        
        <SignUpModal 
          open={signUpModalOpen} 
          onOpenChange={setSignUpModalOpen} 
        />
        <ReportIssueModal 
          open={reportIssueModalOpen} 
          onOpenChange={setReportIssueModalOpen}
          onIssueReported={handleIssueReported}
        />
      </>
    )
  }

  if (currentView === 'dashboard') {
    return (
      <>
        <EnhancedNavbar 
          onReportIssue={handleReportIssue}
          onViewIssues={handleViewIssues}
          onSignUp={() => setSignUpModalOpen(true)}
          onNavigate={handleNavigate}
          onBack={handleBackToHome}
          showBackButton={true}
        />
        <Dashboard onReportIssue={handleReportIssue} />
        <EnhancedFooter />
        
        <SignUpModal 
          open={signUpModalOpen} 
          onOpenChange={setSignUpModalOpen} 
        />
        <ReportIssueModal 
          open={reportIssueModalOpen} 
          onOpenChange={setReportIssueModalOpen}
          onIssueReported={handleIssueReported}
        />
      </>
    )
  }

  return (
    <>
      <EnhancedNavbar 
        onReportIssue={handleReportIssue}
        onViewIssues={handleViewIssues}
        onSignUp={() => setSignUpModalOpen(true)}
        onNavigate={handleNavigate}
      />
      <EnhancedHero 
        onReportIssue={handleReportIssue}
        onViewIssues={handleViewIssues}
      />
      <WhyCityEye />
      <HowItWorks />
      <Categories />
      <Contact />
      
      {/* Admin Access Button for Demo */}
      {currentUser?.role === 'admin' && (
        <div className="container mx-auto px-4 py-8 text-center">
          <button
            onClick={handleAdminAccess}
            className="text-warning hover:text-warning/80 underline text-sm"
          >
            Access Admin Panel
          </button>
        </div>
      )}
      
      <EnhancedFooter />
      
      <SignUpModal 
        open={signUpModalOpen} 
        onOpenChange={setSignUpModalOpen} 
      />
      <ReportIssueModal 
        open={reportIssueModalOpen} 
        onOpenChange={setReportIssueModalOpen}
        onIssueReported={handleIssueReported}
      />
    </>
  )
};

export default Index;