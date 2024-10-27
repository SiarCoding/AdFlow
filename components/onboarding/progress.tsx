"use client";

import { CheckCircle2 } from "lucide-react";

interface OnboardingProgressProps {
  currentStep: number;
}

export function OnboardingProgress({ currentStep }: OnboardingProgressProps) {
  const steps = [
    "Account erstellen",
    "Daten analysieren",
    "Fertigstellung",
  ];

  return (
    <div className="relative">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center relative"
            style={{ width: index === steps.length - 1 ? "auto" : "33%" }}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep > index + 1
                  ? "bg-primary text-primary-foreground"
                  : currentStep === index + 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > index + 1 ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            <span className="text-sm mt-2 text-center">{step}</span>
            {index < steps.length - 1 && (
              <div
                className={`absolute top-4 -right-1/2 h-[2px] w-full ${
                  currentStep > index + 1 ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}