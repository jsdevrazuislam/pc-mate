import { useState } from "react";

export function usePCBuilder() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<PCBuildRecommendation | null>(null);

  const generateBuild = async (request: PCBuilderRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/build", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data: PCBuildRecommendation = await response.json();
      if (data?.error) {
        setError(data?.error);
      }
      else {
        setRecommendation(data);
      }
    }
    catch (err) {
      console.error("Build generation failed:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
    finally {
      setIsLoading(false);
    }
  };

  return {
    generateBuild,
    isLoading,
    error,
    recommendation,
    reset: () => {
      setRecommendation(null);
      setError(null);
    },
  };
}
