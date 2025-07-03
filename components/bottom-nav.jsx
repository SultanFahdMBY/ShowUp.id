"use client"

import { useRouter, usePathname } from "next/navigation"
import { Activity, MessageCircle, User, Home, Link, Sparkles } from "lucide-react"

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/home" },
    { id: "checkup", label: "Check Up", icon: Activity, path: "/checkup" },
    { id: "catchup", label: "Catch Up", icon: MessageCircle, path: "/catchup" },
    { id: "linkup", label: "Link Up", icon: Link, path: "/linkup" },
    { id: "levelup", label: "Level Up", icon: Sparkles, path: "/levelup" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ]

  const handleNavigation = (path) => {
    router.push(path)
  }

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.path)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors ${
              isActive(item.path) ? "text-indigo-600 bg-indigo-50" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <item.icon className={`w-5 h-5 mb-1 ${isActive(item.path) ? "text-indigo-600" : "text-gray-500"}`} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
