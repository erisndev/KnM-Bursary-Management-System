import React from "react";
import {
  CheckCircle,
  FileText,
  DollarSign,
  Calendar,
  GraduationCap,
  Users,
  AlertCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Application progress steps
const applicationSteps = [
  {
    id: 1,
    title: "Application Submitted",
    description:
      "Your bursary application has been successfully received and is in our system",
    status: "completed",
    icon: FileText,
    details: "Application form completed with all required information",
  },
  {
    id: 2,
    title: "Document Verification",
    description:
      "We are verifying all submitted documents and checking eligibility requirements",
    status: "completed",
    icon: CheckCircle,
    details:
      "Academic transcripts, financial documents, and ID verification completed",
  },
  {
    id: 3,
    title: "Academic Review",
    description:
      "Academic performance and course enrollment are being assessed by our team",
    status: "completed",
    icon: GraduationCap,
    details: "GPA verification and academic standing confirmed",
  },
  {
    id: 4,
    title: "Financial Assessment",
    description:
      "Evaluating financial need based on submitted income and expense documentation",
    status: "completed",
    icon: DollarSign,
    details:
      "Financial aid office is reviewing your family's financial situation",
  },
  {
    id: 5,
    title: "Committee Review",
    description:
      "Bursary selection committee will review your complete application",
    status: "current",
    icon: Users,
    details: "Committee meets weekly to review applications",
  },
  {
    id: 6,
    title: "Decision Notification",
    description:
      "Final decision will be communicated via email and student portal",
    status: "pending",
    icon: AlertCircle,
    details: "You will receive notification within 24 hours of decision",
  },
  {
    id: 7,
    title: "Fund Disbursement",
    description:
      "Approved bursary funds will be transferred to your student account",
    status: "pending",
    icon: DollarSign,
    details:
      "Funds typically disbursed within 5-7 business days after approval",
  },
];

const getStepStatus = (status) => {
  switch (status) {
    case "completed":
      return {
        bgColor: "bg-green-100",
        iconColor: "text-green-600",
        borderColor: "border-green-200",
        textColor: "text-green-800",
      };
    case "current":
      return {
        bgColor: "bg-cyan-100",
        iconColor: "text-cyan-600",
        borderColor: "border-cyan-200",
        textColor: "text-cyan-800",
      };
    case "pending":
      return {
        bgColor: "bg-gray-100",
        iconColor: "text-gray-400",
        borderColor: "border-gray-200",
        textColor: "text-gray-600",
      };
    default:
      return {
        bgColor: "bg-gray-100",
        iconColor: "text-gray-400",
        borderColor: "border-gray-200",
        textColor: "text-gray-600",
      };
  }
};

export default function ApplicationsPage() {
  const completedSteps = applicationSteps.filter(
    (step) => step.status === "completed"
  ).length;

  const progressPercentage = (completedSteps / applicationSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 py-2 sm:py-4 lg:py-6">
      <div className="max-w-4xl mx-auto px-1 sm:px-3 lg:px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-cyan-900 mb-2 px-2">
            Bursary Application Progress
          </h1>
          <p className="text-sm sm:text-base text-cyan-600 px-2">
            Track your application through each step of the review process
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div>
                <CardTitle className="text-lg sm:text-xl">
                  Overall Progress
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {completedSteps} of {applicationSteps.length} steps completed
                </CardDescription>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xl sm:text-2xl font-bold text-cyan-600">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Complete</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="h-2 sm:h-3" />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Started</span>
              <span className="hidden sm:inline">In Progress</span>
              <span className="sm:hidden">Progress</span>
              <span>Completed</span>
            </div>
          </CardContent>
        </Card>

        {/* Application Steps */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl">
              Application Steps
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Detailed progress through each stage of your bursary application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 sm:space-y-6">
              {applicationSteps.map((step, index) => {
                const Icon = step.icon;
                const { bgColor, iconColor, borderColor, textColor } =
                  getStepStatus(step.status);
                const isLast = index === applicationSteps.length - 1;

                return (
                  <div key={step.id} className="relative">
                    {/* Step Content */}
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      {/* Step Icon */}
                      <div className="flex-shrink-0 relative">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${bgColor} border-2 ${borderColor} flex items-center justify-center`}
                        >
                          <Icon
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`}
                          />
                        </div>
                        {/* Step Number */}
                        <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-600">
                            {step.id}
                          </span>
                        </div>
                      </div>

                      {/* Step Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-2">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-2">
                            {step.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className={`${borderColor} ${textColor} self-start text-xs sm:text-sm flex-shrink-0`}
                          >
                            {step.status === "completed"
                              ? "Completed"
                              : step.status === "current"
                              ? "In Progress"
                              : "Pending"}
                          </Badge>
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 mb-3 leading-relaxed">
                          {step.description}
                        </p>

                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                            {step.details}
                          </p>
                        </div>

                        {step.status === "current" && (
                          <div className="flex items-center text-cyan-600">
                            <div className="w-2 h-2 bg-cyan-600 rounded-full animate-pulse mr-2 flex-shrink-0"></div>
                            <span className="text-xs sm:text-sm font-medium">
                              Currently Active
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Connecting Line */}
                    {!isLast && (
                      <div className="absolute left-5 sm:left-6 top-10 sm:top-12 w-0.5 h-6 sm:h-8 bg-gray-200 transform -translate-x-0.5"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Mobile-friendly spacing at bottom */}
        <div className="h-4 sm:h-6 lg:h-8"></div>
      </div>
    </div>
  );
}
