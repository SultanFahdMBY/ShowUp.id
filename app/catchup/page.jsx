"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BottomNav from "@/components/bottom-nav"
import { Search, UserPlus, MessageCircle, Home, Coffee } from "lucide-react"

export default function CatchUpPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const connections = [
    { name: "Dr. Sarah Johnson", role: "Cardiologist", status: "online", avatar: "SJ", lastSeen: "Active now" },
    { name: "Mike Chen", role: "Fitness Trainer", status: "offline", avatar: "MC", lastSeen: "2 hours ago" },
    { name: "Dr. Emily Davis", role: "Nutritionist", status: "online", avatar: "ED", lastSeen: "Active now" },
    { name: "Alex Rodriguez", role: "Wellness Coach", status: "busy", avatar: "AR", lastSeen: "30 min ago" },
  ]

  const recentChats = [
    { name: "Dr. Sarah Johnson", lastMessage: "How are you feeling today?", time: "10:30 AM", unread: 2 },
    { name: "Mike Chen", lastMessage: "Great workout session!", time: "Yesterday", unread: 0 },
    { name: "Dr. Emily Davis", lastMessage: "Your meal plan is ready", time: "2 days ago", unread: 1 },
  ]

  const suggestions = [
    { name: "Dr. James Wilson", role: "General Practitioner", mutualConnections: 3, avatar: "JW" },
    { name: "Lisa Thompson", role: "Yoga Instructor", mutualConnections: 2, avatar: "LT" },
    { name: "Dr. Robert Kim", role: "Dermatologist", mutualConnections: 5, avatar: "RK" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Catch Up</h1>
              <p className="text-sm text-gray-600">Stay connected with your health network</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.push("/home")}>
              <Home className="w-4 h-4 mr-1" />
              Home
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Search */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Chats</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Online Now</p>
                  <p className="text-2xl font-bold text-green-600">8</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Conversations */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Conversations</CardTitle>
            <CardDescription>Your latest chats and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentChats.map((chat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {chat.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{chat.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{chat.time}</p>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mt-1 ml-auto">
                        <span className="text-white text-xs">{chat.unread}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Online Contacts */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Available for Chat</CardTitle>
            <CardDescription>Your contacts who are currently online</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connections
                .filter((c) => c.status === "online")
                .map((connection, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{connection.avatar}</span>
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(connection.status)} rounded-full border-2 border-white`}
                        ></div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{connection.name}</h3>
                        <p className="text-sm text-gray-600">{connection.role}</p>
                        <p className="text-xs text-green-600">{connection.lastSeen}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Coffee className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Suggested Connections */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">People You May Know</CardTitle>
            <CardDescription>Expand your health network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{suggestion.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{suggestion.name}</h3>
                      <p className="text-sm text-gray-600">{suggestion.role}</p>
                      <p className="text-xs text-gray-500">{suggestion.mutualConnections} mutual connections</p>
                    </div>
                  </div>
                  <Button size="sm">
                    <UserPlus className="w-4 h-4 mr-1" />
                    Connect
                  </Button>
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
