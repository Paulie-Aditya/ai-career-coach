"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Star,
  Clock,
  DollarSign,
  TrendingUp,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

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

interface CareerResultsProps {
  data: CareerData;
  onNewAnalysis: () => void;
}

export default function CareerResults({
  data,
  onNewAnalysis,
}: CareerResultsProps) {
  const [expandedPaths, setExpandedPaths] = useState<Set<number>>(new Set([0]));
  const [expandedSkills, setExpandedSkills] = useState<Set<number>>(new Set());
  const [showShortTerm, setShowShortTerm] = useState(true);

  const togglePath = (index: number) => {
    const newExpanded = new Set(expandedPaths);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedPaths(newExpanded);
  };

  const toggleSkill = (index: number) => {
    const newExpanded = new Set(expandedSkills);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSkills(newExpanded);
  };

  const filteredSkills = data.skill_roadmap.filter((skill) =>
    showShortTerm
      ? skill.skill.priority === "short-term"
      : skill.skill.priority === "long-term"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <button
              onClick={onNewAnalysis}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              New Analysis
            </button>
            <div className="text-sm text-gray-500">
              Your Personalized Career Analysis
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Career Analysis is Ready! 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your profile, we've identified {data.career_paths.length}{" "}
            potential career paths and created a personalized skill roadmap to
            help you succeed.
          </p>
        </div>

        {/* Career Paths */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Recommended Career Paths
          </h2>
          <div className="grid gap-6">
            {data.career_paths.map((path, index) => (
              <div key={index} className="card">
                <div
                  className="flex justify-between items-start cursor-pointer"
                  onClick={() => togglePath(index)}
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {path.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{path.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1 text-green-600">
                        <DollarSign className="h-4 w-4" />
                        {path.salary_range}
                      </div>
                      <div className="flex items-center gap-1 text-blue-600">
                        <TrendingUp className="h-4 w-4" />
                        {path.growth_prospects}
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    {expandedPaths.has(index) ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {expandedPaths.has(index) && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Why This Career Fits You:
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {path.why_fits}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skill Roadmap */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Your Skill Roadmap
            </h2>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setShowShortTerm(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  showShortTerm
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Short-term (3-6 months)
              </button>
              <button
                onClick={() => setShowShortTerm(false)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  !showShortTerm
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Long-term (1-2 years)
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredSkills.map((roadmap, index) => (
              <div key={index} className="card">
                <div
                  className="flex justify-between items-start cursor-pointer"
                  onClick={() => toggleSkill(index)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {roadmap.skill.name}
                      </h3>
                      <span
                        className={`skill-tag ${
                          roadmap.skill.priority === "short-term"
                            ? "skill-short-term"
                            : "skill-long-term"
                        }`}
                      >
                        {roadmap.skill.priority}
                      </span>
                      <span className="skill-tag bg-gray-100 text-gray-700">
                        {roadmap.skill.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {roadmap.skill.time_to_learn}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {roadmap.skill.category}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-primary-600">
                          {roadmap.resources.length} resources
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    {expandedSkills.has(index) ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {expandedSkills.has(index) && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Learning Resources:
                    </h4>
                    <div className="grid gap-3">
                      {roadmap.resources.map((resource, resIndex) => (
                        <div
                          key={resIndex}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium text-gray-900">
                                {resource.title}
                              </h5>
                              <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                                {resource.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{resource.cost}</span>
                              <span>{resource.duration}</span>
                              {resource.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  {resource.rating}
                                </div>
                              )}
                            </div>
                          </div>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 p-2 text-primary-600 hover:text-primary-800 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Overall Recommendations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Overall Recommendations
          </h2>
          <div className="card">
            <ul className="space-y-4">
              {data.overall_recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    {recommendation}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="text-center">
          <button
            onClick={onNewAnalysis}
            className="btn-primary flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Start New Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
