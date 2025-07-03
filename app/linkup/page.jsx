"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import BottomNav from "@/components/bottom-nav"
import { Home, Link, Activity, MapPin, Clock, Zap, Trophy, Calendar, TrendingUp, Heart } from "lucide-react"

export default function LinkUpPage() {
  const router = useRouter()
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
      return
    }

    // Check if already connected to Strava
    const stravaConnected = localStorage.getItem("stravaConnected")
    if (stravaConnected === "true") {
      setIsConnected(true)
      loadMockActivities()
    }
  }, [router])

  const handleStravaConnect = async () => {
    setIsConnecting(true)

    // Mock connection process
    setTimeout(() => {
      setIsConnected(true)
      localStorage.setItem("stravaConnected", "true")
      loadMockActivities()
      setIsConnecting(false)
    }, 2000)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    localStorage.removeItem("stravaConnected")
    setActivities([])
  }

  const loadMockActivities = () => {
    const mockActivities = [
      {
        id: 1,
        name: "Morning Run",
        type: "Run",
        date: "2024-12-02",
        time: "07:30 AM",
        distance: "5.2 km",
        duration: "28:45",
        pace: "5:32 /km",
        calories: 312,
        elevation: "45 m",
        heartRate: "avg 145 bpm",
      },
      {
        id: 2,
        name: "Evening Bike Ride",
        type: "Ride",
        date: "2024-12-01",
        time: "06:15 PM",
        distance: "15.8 km",
        duration: "42:20",
        pace: "22.4 km/h",
        calories: 485,
        elevation: "120 m",
        heartRate: "avg 132 bpm",
      },
      {
        id: 3,
        name: "Gym Workout",
        type: "Workout",
        date: "2024-11-30",
        time: "08:00 AM",
        distance: "0 km",
        duration: "1:15:30",
        pace: "N/A",
        calories: 420,
        elevation: "0 m",
        heartRate: "avg 128 bpm",
      },
      {
        id: 4,
        name: "Weekend Hike",
        type: "Hike",
        date: "2024-11-29",
        time: "09:00 AM",
        distance: "8.5 km",
        duration: "2:30:15",
        pace: "17:42 /km",
        calories: 650,
        elevation: "320 m",
        heartRate: "avg 118 bpm",
      },
    ]
    setActivities(mockActivities)
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case "Run":
        return <Activity className="w-5 h-5 text-orange-600" />
      case "Ride":
        return <Zap className="w-5 h-5 text-blue-600" />
      case "Workout":
        return <Trophy className="w-5 h-5 text-purple-600" />
      case "Hike":
        return <MapPin className="w-5 h-5 text-green-600" />
      default:
        return <Activity className="w-5 h-5 text-gray-600" />
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case "Run":
        return "bg-orange-100 text-orange-800"
      case "Ride":
        return "bg-blue-100 text-blue-800"
      case "Workout":
        return "bg-purple-100 text-purple-800"
      case "Hike":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalStats = activities.reduce(
    (acc, activity) => {
      const distance = Number.parseFloat(activity.distance.replace(" km", "")) || 0
      const calories = activity.calories || 0
      return {
        totalDistance: acc.totalDistance + distance,
        totalCalories: acc.totalCalories + calories,
        totalActivities: acc.totalActivities + 1,
      }
    },
    { totalDistance: 0, totalCalories: 0, totalActivities: 0 },
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Link Up</h1>
              <p className="text-sm text-gray-600">Connect your fitness apps and devices</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.push("/home")}>
              <Home className="w-4 h-4 mr-1" />
              Home
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {!isConnected ? (
          <>
            {/* Connection Card */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Link className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Connect with Strava</CardTitle>
                <CardDescription>
                  Link your Strava account to sync your activities and track your fitness progress
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  onClick={handleStravaConnect}
                  disabled={isConnecting}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  {isConnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Link className="w-4 h-4 mr-2" />
                      Connect to Strava
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Benefits Card */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Why Connect?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Activity className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Track Activities</h3>
                      <p className="text-sm text-gray-600">Automatically sync your runs, rides, and workouts</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Monitor Progress</h3>
                      <p className="text-sm text-gray-600">View detailed analytics and performance trends</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Health Integration</h3>
                      <p className="text-sm text-gray-600">Connect fitness data with your health records</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Connected Status */}
            <Card className="border-0 shadow-sm bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                      <Link className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Strava Connected</h3>
                      <p className="text-sm text-gray-600">Syncing your activities</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleDisconnect}>
                    Disconnect
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <Activity className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{totalStats.totalActivities}</p>
                  <p className="text-sm text-gray-600">Activities</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <MapPin className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{totalStats.totalDistance.toFixed(1)}</p>
                  <p className="text-sm text-gray-600">km</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <Zap className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{totalStats.totalCalories}</p>
                  <p className="text-sm text-gray-600">Calories</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activities</CardTitle>
                <CardDescription>Your latest workouts from Strava</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getActivityIcon(activity.type)}
                          <div>
                            <h3 className="font-medium text-gray-900">{activity.name}</h3>
                            <div className="flex items-center text-sm text-gray-600 space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{activity.date}</span>
                              <Clock className="w-4 h-4 ml-2" />
                              <span>{activity.time}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className={getActivityColor(activity.type)}>
                          {activity.type}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Distance:</span>
                            <span className="font-medium">{activity.distance}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{activity.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Pace:</span>
                            <span className="font-medium">{activity.pace}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Calories:</span>
                            <span className="font-medium">{activity.calories}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Elevation:</span>
                            <span className="font-medium">{activity.elevation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Heart Rate:</span>
                            <span className="font-medium">{activity.heartRate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
