import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { OptimizationResult } from "@/lib/services/optimization";

interface OptimizationResultsProps {
  results: OptimizationResult[];
}

export function OptimizationResults({ results }: OptimizationResultsProps) {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{result.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {result.description}
                </p>
              </div>
              <Badge variant={
                result.impact === "high" ? "destructive" :
                result.impact === "medium" ? "default" :
                "secondary"
              }>
                {result.improvement}
              </Badge>
            </div>
            <Button className="w-full" size="sm">
              {result.action}
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}