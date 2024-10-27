import { toast } from "@/components/ui/use-toast";

export interface OptimizationResult {
  category: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  improvement: string;
  action: string;
}

export interface OptimizationResponse {
  optimizations: OptimizationResult[];
  success: boolean;
  error?: string;
}

export const OPTIMIZATION_STEPS = [
  { endpoint: "content", title: "Content-Analyse", progress: 25 },
  { endpoint: "audience", title: "Zielgruppen-Optimierung", progress: 50 },
  { endpoint: "campaigns", title: "Kampagnen-Optimierung", progress: 75 },
  { endpoint: "performance", title: "Performance-Analyse", progress: 100 }
] as const;

async function fetchWithTimeout(url: string, options: RequestInit, timeout = 30000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export async function fetchOptimization(endpoint: string): Promise<OptimizationResponse> {
  try {
    const response = await fetchWithTimeout(`/api/ai/optimize/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint} optimization:`, error);
    return {
      optimizations: [],
      success: false,
      error: `Fehler bei der ${endpoint}-Optimierung`
    };
  }
}

export async function runFullOptimization(
  onProgress: (progress: number) => void,
  onStep: (step: number) => void
): Promise<OptimizationResult[]> {
  let allResults: OptimizationResult[] = [];
  let successfulSteps = 0;

  for (let i = 0; i < OPTIMIZATION_STEPS.length; i++) {
    const step = OPTIMIZATION_STEPS[i];
    onStep(i + 1);
    onProgress(step.progress);

    try {
      const response = await fetchOptimization(step.endpoint);
      
      if (response.success && response.optimizations.length > 0) {
        allResults = [...allResults, ...response.optimizations];
        successfulSteps++;
      } else if (response.error) {
        toast({
          title: `Fehler bei ${step.title}`,
          description: response.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(`Error in optimization step ${step.title}:`, error);
      toast({
        title: `Fehler bei ${step.title}`,
        description: "Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    }
  }

  if (successfulSteps === 0) {
    throw new Error("Keine Optimierungen konnten durchgeführt werden");
  }

  return allResults;
}