"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Brain,
  Target,
  BookOpen,
  ArrowRight,
  Star,
  Clock,
  Users,
} from "lucide-react";
import CareerForm from "@/components/CareerForm";
import CareerResults from "@/components/CareerResults";
import LoadingSpinner from "@/components/LoadingSpinner";

interface CareerData {
  career_paths: Array<{
    title: string;
    description: string;
    why_fits: string;
    salary_range: string;
    growth_prospects: string;
  }>;
  skill_roadmap: Array<{
    skill: {
      name: string;
      category: string;
      priority: string;
      difficulty: string;
      time_to_learn: string;
    };
    resources: Array<{
      title: string;
      type: string;
      url: string;
      cost: string;
      duration: string;
      rating?: number;
    }>;
  }>;
  overall_recommendations: string[];
}

export default function Home() {
  const [careerData, setCareerData] = useState<CareerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/career-advisor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get career advice");
      }

      const data = await response.json();
      setCareerData(data);
      setShowResults(true);
      toast.success("Career analysis complete!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to get career advice. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setCareerData(null);
    setShowResults(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (showResults && careerData) {
    return (
      <CareerResults data={careerData} onNewAnalysis={handleNewAnalysis} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                AI Career Coach
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Powered by Google Gemini AI
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Your
              <span className="text-primary-600"> Perfect Career</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get personalized career guidance and skill roadmaps powered by AI.
              Find your ideal career path and learn exactly what skills you need
              to succeed.
            </p>

            {/* Features */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="card text-center">
                <Target className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Career Matching
                </h3>
                <p className="text-sm text-gray-600">
                  AI-powered career recommendations based on your profile
                </p>
              </div>
              <div className="card text-center">
                <BookOpen className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Skill Roadmap
                </h3>
                <p className="text-sm text-gray-600">
                  Structured learning path with curated resources
                </p>
              </div>
              <div className="card text-center">
                <Clock className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Time Management
                </h3>
                <p className="text-sm text-gray-600">
                  Structured learning timelines and milestones
                </p>
              </div>
              <div className="card text-center">
                <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Expert Guidance
                </h3>
                <p className="text-sm text-gray-600">
                  Access to industry insights and trends
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Get Your Personalized Career Analysis
            </h3>
            <p className="text-lg text-gray-600">
              Tell us about yourself and we'll create a customized career
              roadmap just for you
            </p>
          </div>

          <CareerForm onSubmit={handleFormSubmit} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-primary-100">Students Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-100">Career Paths</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-100">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Brain className="h-6 w-6 text-primary-400" />
              <span className="text-xl font-bold">AI Career Coach</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering students with AI-powered career guidance
            </p>
            <div className="text-sm text-gray-500">
              © 2024 AI Career Coach. Built with Google Gemini AI.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
