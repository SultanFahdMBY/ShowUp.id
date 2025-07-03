"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import BottomNav from "@/components/bottom-nav"
import { Calendar, Clock, Heart, Home, Upload, FileText, Download, CheckCircle } from "lucide-react"

export default function CheckUpPage() {
  const router = useRouter()
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [medicalFile, setMedicalFile] = useState(null)
  const [bodyCompositionFile, setBodyCompositionFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [recommendationReady, setRecommendationReady] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const upcomingCheckups = [
    { title: "Annual Physical", date: "Dec 15, 2024", time: "10:00 AM", type: "General" },
    { title: "Blood Test", date: "Dec 20, 2024", time: "9:30 AM", type: "Lab" },
    { title: "Dental Cleaning", date: "Jan 5, 2025", time: "2:00 PM", type: "Dental" },
  ]

  const recentCheckups = [
    { title: "Eye Exam", date: "Nov 28, 2024", status: "Completed", result: "Normal" },
    { title: "Blood Pressure", date: "Nov 25, 2024", status: "Completed", result: "Good" },
    { title: "Weight Check", date: "Nov 20, 2024", status: "Completed", result: "Stable" },
  ]

  const handleFileUpload = (event, fileType) => {
    const file = event.target.files[0]
    if (file && file.type === "application/pdf") {
      if (fileType === "medical") {
        setMedicalFile(file)
      } else {
        setBodyCompositionFile(file)
      }
    } else {
      alert("Please upload a PDF file only")
    }
  }

  const handleAnalysis = async () => {
    if (!medicalFile || !bodyCompositionFile) {
      alert("Please upload both files before proceeding")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Mock upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Mock analysis process
    setTimeout(() => {
      setIsUploading(false)
      setAnalysisComplete(true)

      // Mock recommendation generation
      setTimeout(() => {
        setRecommendationReady(true)
      }, 2000)
    }, 2500)
  }

  const handleDownloadRecommendation = () => {
    // Mock download process
    const mockRecommendation = `
HEALTH ANALYSIS & RECOMMENDATIONS REPORT
Generated on: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY:
Based on your medical check-up and body composition analysis, here are our key findings and recommendations:

MEDICAL CHECK-UP ANALYSIS:
✓ Blood pressure: Within normal range (120/80 mmHg)
✓ Cholesterol levels: Slightly elevated (220 mg/dL)
⚠ Vitamin D: Below optimal (18 ng/mL)
✓ Blood sugar: Normal fasting glucose (95 mg/dL)

BODY COMPOSITION ANALYSIS:
• Body Fat: 22% (Normal range for your age/gender)
• Muscle Mass: 65% (Good)
• Visceral Fat: Level 8 (Acceptable)
• BMI: 24.2 (Normal weight)

PERSONALIZED RECOMMENDATIONS:

1. NUTRITION:
   - Increase omega-3 rich foods (salmon, walnuts)
   - Add more fiber (25-30g daily)
   - Consider Vitamin D supplementation (2000 IU daily)
   - Limit saturated fats to improve cholesterol

2. EXERCISE:
   - Continue current cardio routine (3-4x/week)
   - Add 2 strength training sessions weekly
   - Include flexibility work (yoga/stretching)

3. LIFESTYLE:
   - Maintain 7-9 hours of sleep
   - Stress management techniques
   - Regular sun exposure for Vitamin D

4. MONITORING:
   - Recheck cholesterol in 3 months
   - Monitor Vitamin D levels in 6 weeks
   - Continue monthly weight tracking

NEXT STEPS:
- Schedule follow-up with your physician
- Consider consultation with nutritionist
- Book body composition re-assessment in 3 months

This analysis is for informational purposes only and should not replace professional medical advice.
    `

    const blob = new Blob([mockRecommendation], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Health_Analysis_Recommendations.txt"
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)

    // Reset dialog state
    setTimeout(() => {
      setShowUploadDialog(false)
      setMedicalFile(null)
      setBodyCompositionFile(null)
      setAnalysisComplete(false)
      setRecommendationReady(false)
      setUploadProgress(0)
    }, 1000)
  }

  const resetDialog = () => {
    setShowUploadDialog(false)
    setMedicalFile(null)
    setBodyCompositionFile(null)
    setIsUploading(false)
    setUploadProgress(0)
    setAnalysisComplete(false)
    setRecommendationReady(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Check Up</h1>
              <p className="text-sm text-gray-600">Manage your health appointments</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.push("/home")}>
              <Home className="w-4 h-4 mr-1" />
              Home
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Next Appointment</p>
                  <p className="text-lg font-bold text-gray-900">3 days</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Health Score</p>
                  <p className="text-lg font-bold text-green-600">85%</p>
                </div>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Analysis Section */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              AI Health Analysis
            </CardTitle>
            <CardDescription>
              Upload your medical check-up and body composition files to get personalized health recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setShowUploadDialog(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              Get AI Analysis & Recommendations
            </Button>
          </CardContent>
        </Card>

        {/* Upload Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={resetDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-600" />
                AI Health Analysis
              </DialogTitle>
              <DialogDescription>
                Upload your medical files to receive personalized health recommendations
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {!analysisComplete && !isUploading && (
                <>
                  {/* Medical Check-up File Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Medical Check-up Report (PDF)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, "medical")}
                        className="hidden"
                        id="medical-upload"
                      />
                      <label htmlFor="medical-upload" className="cursor-pointer">
                        {medicalFile ? (
                          <div className="flex items-center justify-center space-x-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm">{medicalFile.name}</span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                            <p className="text-sm text-gray-600">Click to upload medical report</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Body Composition File Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Body Composition Analysis (PDF)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, "body")}
                        className="hidden"
                        id="body-upload"
                      />
                      <label htmlFor="body-upload" className="cursor-pointer">
                        {bodyCompositionFile ? (
                          <div className="flex items-center justify-center space-x-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm">{bodyCompositionFile.name}</span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                            <p className="text-sm text-gray-600">Click to upload body composition report</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={handleAnalysis}
                    disabled={!medicalFile || !bodyCompositionFile}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    Start AI Analysis
                  </Button>
                </>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Analyzing your health data...</p>
                    <p className="text-sm text-gray-600">This may take a few moments</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{uploadProgress}% complete</p>
                </div>
              )}

              {/* Analysis Complete */}
              {analysisComplete && !recommendationReady && (
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Analysis Complete!</p>
                    <p className="text-sm text-gray-600">Generating your personalized recommendations...</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recommendation Ready */}
              {recommendationReady && (
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Download className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Recommendations Ready!</p>
                    <p className="text-sm text-gray-600">Your personalized health analysis is complete</p>
                  </div>
                  <Button
                    onClick={handleDownloadRecommendation}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Recommendations
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Upcoming Checkups */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled check-ups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingCheckups.map((checkup, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{checkup.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {checkup.date}
                      <Clock className="w-4 h-4 ml-3 mr-1" />
                      {checkup.time}
                    </div>
                  </div>
                  <Badge variant="outline">{checkup.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Checkups */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Check-ups</CardTitle>
            <CardDescription>Your completed appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCheckups.map((checkup, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{checkup.title}</h3>
                    <p className="text-sm text-gray-600">{checkup.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-1">
                      {checkup.status}
                    </Badge>
                    <p className="text-sm text-green-600">{checkup.result}</p>
                  </div>
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
