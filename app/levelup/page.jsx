"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BottomNav from "@/components/bottom-nav"
import { Home, Send, Sparkles, Bot, User, Mic, Camera, Plus } from "lucide-react"

export default function LevelUpPage() {
  const router = useRouter()
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
      return
    }

    // Load initial conversation
    loadInitialConversation()
  }, [router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const loadInitialConversation = () => {
    const initialMessages = [
      {
        id: 1,
        type: "ai",
        content:
          "Hello! I'm your AI Health Companion. I'm here to help you level up your health and wellness journey. How are you feeling today?",
        timestamp: new Date(Date.now() - 300000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
      {
        id: 2,
        type: "user",
        content: "Hi! I've been feeling a bit tired lately and want to improve my energy levels.",
        timestamp: new Date(Date.now() - 240000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
      {
        id: 3,
        type: "ai",
        content:
          "I understand that feeling tired can be frustrating. Let me help you identify some potential causes and solutions. Can you tell me about your sleep schedule and daily routine?",
        timestamp: new Date(Date.now() - 180000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]
    setMessages(initialMessages)
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage)
      const aiMessage = {
        id: messages.length + 2,
        type: "ai",
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput) => {
    const responses = {
      sleep:
        "Great question about sleep! For optimal energy levels, I recommend:\n\n• Aim for 7-9 hours of sleep nightly\n• Keep a consistent sleep schedule\n• Create a relaxing bedtime routine\n• Avoid screens 1 hour before bed\n\nWould you like me to help you create a personalized sleep plan?",
      exercise:
        "Exercise is fantastic for boosting energy! Here's what I suggest:\n\n• Start with 20-30 minutes of moderate activity daily\n• Mix cardio and strength training\n• Try morning workouts for sustained energy\n• Listen to your body and rest when needed\n\nWhat type of activities do you enjoy most?",
      nutrition:
        "Nutrition plays a huge role in energy levels! Consider these tips:\n\n• Eat balanced meals with protein, healthy fats, and complex carbs\n• Stay hydrated (8-10 glasses of water daily)\n• Limit processed foods and sugar\n• Consider smaller, frequent meals\n\nWould you like help planning some energizing meal ideas?",
      stress:
        "Managing stress is crucial for overall health. Here are some strategies:\n\n• Practice deep breathing or meditation\n• Regular physical activity\n• Maintain social connections\n• Set realistic goals and boundaries\n\nWhat stress management techniques have you tried before?",
      default:
        "That's a great point! Based on what you've shared, I'd recommend focusing on the fundamentals: quality sleep, regular movement, balanced nutrition, and stress management. \n\nWhich area would you like to explore first? I can provide personalized recommendations based on your specific situation.",
    }

    const input = userInput.toLowerCase()
    if (input.includes("sleep") || input.includes("tired") || input.includes("rest")) {
      return responses.sleep
    } else if (input.includes("exercise") || input.includes("workout") || input.includes("fitness")) {
      return responses.exercise
    } else if (
      input.includes("food") ||
      input.includes("eat") ||
      input.includes("nutrition") ||
      input.includes("diet")
    ) {
      return responses.nutrition
    } else if (input.includes("stress") || input.includes("anxiety") || input.includes("overwhelmed")) {
      return responses.stress
    } else {
      return responses.default
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickActions = [
    { text: "How can I sleep better?", icon: "💤" },
    { text: "Suggest a workout routine", icon: "💪" },
    { text: "Healthy meal ideas", icon: "🥗" },
    { text: "Stress management tips", icon: "🧘" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Level Up</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <p className="text-sm opacity-90">AI Health Companion</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/home")}
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 pb-32">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === "user" ? "bg-indigo-600" : "bg-gradient-to-r from-purple-500 to-indigo-500"
                }`}
              >
                {message.type === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.type === "user" ? "bg-indigo-600 text-white" : "bg-white border shadow-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                <p className={`text-xs mt-2 ${message.type === "user" ? "text-indigo-100" : "text-gray-500"}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-purple-500 to-indigo-500">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border shadow-sm rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 3 && (
        <div className="fixed bottom-32 left-0 right-0 px-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Quick questions to get started:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-left justify-start h-auto py-2 px-3 bg-transparent"
                    onClick={() => setInputMessage(action.text)}
                  >
                    <span className="mr-2">{action.icon}</span>
                    <span className="text-xs">{action.text}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t px-4 py-3">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex-shrink-0 bg-transparent">
            <Plus className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your AI Health Companion..."
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Mic className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
