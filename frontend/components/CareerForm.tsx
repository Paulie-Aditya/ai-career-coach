"use client";

import { useState } from "react";
import { Plus, X, ArrowRight } from "lucide-react";

interface FormData {
  skills: string[];
  interests: string[];
  education: string;
  experience_level: string;
  location: string;
}

interface CareerFormProps {
  onSubmit: (data: FormData) => void;
}

export default function CareerForm({ onSubmit }: CareerFormProps) {
  const [formData, setFormData] = useState<FormData>({
    skills: [],
    interests: [],
    education: "",
    experience_level: "beginner",
    location: "India",
  });

  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const addInterest = () => {
    if (
      newInterest.trim() &&
      !formData.interests.includes(newInterest.trim())
    ) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest.trim()],
      });
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((i) => i !== interest),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.skills.length === 0 ||
      formData.interests.length === 0 ||
      !formData.education
    ) {
      alert("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Skills Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Your Skills <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.skills.map((skill, index) => (
              <span key={index} className="tag">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill (e.g., Python, Communication)"
              className="input-field flex-1"
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addSkill())
              }
            />
            <button
              type="button"
              onClick={addSkill}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
        </div>

        {/* Interests Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Your Interests <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.interests.map((interest, index) => (
              <span key={index} className="tag">
                {interest}
                <button
                  type="button"
                  onClick={() => removeInterest(interest)}
                  className="ml-2 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Add an interest (e.g., Technology, Healthcare)"
              className="input-field flex-1"
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addInterest())
              }
            />
            <button
              type="button"
              onClick={addInterest}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
        </div>

        {/* Education Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Education Level <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.education}
            onChange={(e) =>
              setFormData({ ...formData, education: e.target.value })
            }
            className="input-field"
            required
          >
            <option value="">Select your education level</option>
            <option value="High School">High School</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="PhD">PhD</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            value={formData.experience_level}
            onChange={(e) =>
              setFormData({ ...formData, experience_level: e.target.value })
            }
            className="input-field"
          >
            <option value="beginner">Beginner (0-1 years)</option>
            <option value="intermediate">Intermediate (1-3 years)</option>
            <option value="advanced">Advanced (3+ years)</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="input-field"
            placeholder="Enter your location"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-3"
          >
            Get My Career Analysis
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
