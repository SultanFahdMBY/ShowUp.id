"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import BottomNav from "@/components/bottom-nav"
import { User, Settings, LogOut, Edit, Camera, Bell, Shield, Home } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const email = localStorage.getItem("userEmail")

    if (!isLoggedIn) {
      router.push("/")
      return
    }

    if (email) {
      setUserEmail(email)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const profileStats = [
    { label: "Check-ups Completed", value: "12" },
    { label: "Connections", value: "24" },
    { label: "Days Active", value: "45" },
    { label: "Health Score", value: "85%" },
  ]

  const menuItems = [
    { icon: Bell, label: "Notifications", description: "Manage your alerts" },
    { icon: Shield, label: "Privacy & Security", description: "Control your data" },
    { icon: Settings, label: "App Settings", description: "Customize your experience" },
    { icon: User, label: "Account Settings", description: "Manage your account" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              <p className="text-sm text-gray-600">Manage your account and preferences</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => router.push("/home")}>
                <Home className="w-4 h-4 mr-1" />
                Home
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">{userEmail.charAt(0).toUpperCase()}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-transparent"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              <div className="w-full space-y-3">
                {isEditing ? (
                  <>
                    <div>
                      <Label htmlFor="name" className="text-left block mb-1">
                        Name
                      </Label>
                      <Input id="name" defaultValue={userEmail.split("@")[0]} />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-left block mb-1">
                        Email
                      </Label>
                      <Input id="email" defaultValue={userEmail} />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-left block mb-1">
                        Phone
                      </Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1">
                        Save Changes
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-gray-900">{userEmail.split("@")[0]}</h2>
                    <p className="text-gray-600">{userEmail}</p>
                    <Badge variant="secondary">Premium Member</Badge>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Your Stats</CardTitle>
            <CardDescription>Your health journey overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {profileStats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings Menu */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
            <CardDescription>Manage your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
