"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Brain, Sparkles, MessageSquare } from "lucide-react";
import { OptimizationProgress } from "./optimization-progress";
import { OptimizationResults } from "./optimization-results";
import { runFullOptimization, type OptimizationResult } from "@/lib/services/optimization";
import { useToast } from "@/components/ui/use-toast";

interface AIOptimizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AIOptimizationDialog({
  open,
  onOpenChange
}: AIOptimizationDialogProps) {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<OptimizationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleOptimization = async () => {
    setLoading(true);
    setProgress(0);
    setResults([]);

    try {
      const optimizationResults = await runFullOptimization(
        (progress) => setProgress(progress),
        (step) => setStep(step)
      );
      
      if (optimizationResults.length > 0) {
        setResults(optimizationResults);
        toast({
          title: "Optimierung abgeschlossen",
          description: `${optimizationResults.length} Optimierungsvorschläge gefunden.`,
        });
      }
    } catch (error) {
      console.error("Optimization error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            KI-Optimierung
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Optimierung läuft...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
            <OptimizationProgress currentStep={step} Icon={MessageSquare} />
          </div>
        ) : results.length > 0 ? (
          <OptimizationResults results={results} />
        ) : (
          <div className="space-y-6">
            <p className="text-center text-muted-foreground">
              Starten Sie die KI-Optimierung, um Ihre Marketing-Performance zu verbessern.
            </p>
            <Button 
              className="w-full" 
              onClick={handleOptimization}
              disabled={loading}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Optimierung starten
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}