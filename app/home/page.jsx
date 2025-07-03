"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import BottomNav from "@/components/bottom-nav"
import { Activity, Users, Bell, TrendingUp, MessageCircle, Link, Sparkles } from "lucide-react"

export default function HomePage() {
  const [userEmail, setUserEmail] = useState("")
  const router = useRouter()

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

  const stats = [
    { label: "Total Check-ups", value: "12", icon: Activity, color: "bg-green-100 text-green-800" },
    { label: "Connections", value: "24", icon: Users, color: "bg-blue-100 text-blue-800" },
    { label: "Notifications", value: "3", icon: Bell, color: "bg-yellow-100 text-yellow-800" },
    { label: "Progress", value: "85%", icon: TrendingUp, color: "bg-purple-100 text-purple-800" },
  ]

  const recentActivities = [
    { title: "Health Check-up Completed", time: "2 hours ago", type: "checkup" },
    { title: "New Connection Added", time: "5 hours ago", type: "link" },
    { title: "Profile Updated", time: "1 day ago", type: "profile" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {userEmail.split("@")[0]}</p>
            </div>
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">{userEmail.charAt(0).toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-full ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => router.push("/checkup")}
                className="text-center hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs font-medium">Check-up</p>
              </button>
              <button
                onClick={() => router.push("/catchup")}
                className="text-center hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-xs font-medium">Catch Up</p>
              </button>
              <button
                onClick={() => router.push("/linkup")}
                className="text-center hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Link className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-xs font-medium">Link Up</p>
              </button>
              <button
                onClick={() => router.push("/levelup")}
                className="text-center hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-xs font-medium">Level Up</p>
              </button>
              <button
                onClick={() => router.push("/profile")}
                className="text-center hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                </div>
                <p className="text-xs font-medium">Progress</p>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
