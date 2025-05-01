"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./QuizResult";
import { QuizResultType } from "@/types";

export default function QuizList({
  assessments,
}: {
  assessments: QuizResultType[];
}) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState<QuizResultType | null>(null);

  return (
    <>
      <Card className="shadow-none bg-transparent">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="gradient gradient-title text-3xl md:text-4xl">
                Recent Quizzes
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Review your past quiz performance
              </CardDescription>
            </div>
            <Button onClick={() => router.push("/interview/mock")}>
              Start New Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments?.map((assessment: QuizResultType, i) => (
              <Card
                key={assessment.id}
                className="cursor-pointer bg-background hover:bg-muted/50 transition-colors shadow-md border border-border hover:border-primary hover:border-2"
                onClick={() => setSelectedQuiz(assessment)}
              >
                <CardHeader>
                  <CardTitle className="gradient gradient-title text-2xl">
                    Quiz {i + 1}
                  </CardTitle>
                  <CardDescription className="flex justify-between w-full text-sm text-muted-foreground">
                    <div>Score: {assessment.quizScore.toFixed(1)}%</div>
                    <div>
                      {format(
                        new Date(assessment.createdAt),
                        "MMMM dd, yyyy HH:mm"
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                {assessment.improvementTip && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground italic">
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Quiz Details</DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
