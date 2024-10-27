import { CheckCircle2, Loader2, LucideIcon } from "lucide-react";
import { OPTIMIZATION_STEPS } from "@/lib/services/optimization";

interface OptimizationProgressProps {
  currentStep: number;
  Icon: LucideIcon;
}

export function OptimizationProgress({ currentStep, Icon }: OptimizationProgressProps) {
  return (
    <div className="space-y-4">
      {OPTIMIZATION_STEPS.map((step, i) => {
        const isActive = i + 1 === currentStep;
        const isComplete = i + 1 < currentStep;

        return (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              isActive ? "border-primary bg-primary/5" :
              isComplete ? "border-green-500 bg-green-50" :
              "border-muted"
            }`}
          >
            {isComplete ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : isActive ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : (
              <Icon className="h-5 w-5 text-muted-foreground" />
            )}
            <span className={isActive ? "font-medium" : ""}>
              {step.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}