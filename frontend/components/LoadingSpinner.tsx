"use client";

import { Brain } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <Brain className="h-16 w-16 text-primary-600 mx-auto animate-pulse" />
          <div className="absolute inset-0 rounded-full border-4 border-primary-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Analyzing Your Profile...
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Our AI is processing your skills, interests, and background to create
          your personalized career roadmap.
        </p>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
