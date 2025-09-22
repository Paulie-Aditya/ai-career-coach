"use client";

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-primary-600"
          aria-label="Loading"
          role="status"
        />
        <p className="text-sm text-gray-600">
          Generating your personalized career analysis…
        </p>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
