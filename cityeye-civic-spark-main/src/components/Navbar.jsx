import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { Eye, Plus, List, User } from "lucide-react"
import { useState } from "react"
import { getCurrentUser, logout } from "@/lib/store"

export function Navbar({ onReportIssue, onViewIssues, onSignUp }) {
  const currentUser = getCurrentUser()

  const handleSignOut = () => {
    logout()
    window.location.reload()
  }

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="rounded-lg bg-primary p-2">
              <Eye className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CityEye</h1>
              <p className="text-xs text-muted-foreground">Community First</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={onReportIssue}
              className="hidden sm:flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Report Issue</span>
            </Button>
            
            <Button
              variant="ghost"
              onClick={onViewIssues}
              className="hidden sm:flex items-center space-x-2"
            >
              <List className="h-4 w-4" />
              <span>View Issues</span>
            </Button>

            {/* Mobile buttons */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onReportIssue}
              className="sm:hidden"
            >
              <Plus className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewIssues}
              className="sm:hidden"
            >
              <List className="h-4 w-4" />
            </Button>

            {currentUser ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {currentUser.name}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button onClick={onSignUp} size="sm">
                <User className="h-4 w-4 mr-1" />
                Sign Up
              </Button>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}