import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuizQuestion, QuizResultType } from "@/types";
import { CheckCircle2, Trophy, XCircle } from "lucide-react";
import React from "react";

const QuizResult = ({
  result,
  hideStartNew = false,
  onStartNew,
}: {
  result: QuizResultType | null;
  hideStartNew?: boolean;
  onStartNew?: () => void;
}) => {
  return (
    <div className="mx-auto">
      <h1 className="flex items-center gap-2 text-3xl gradient gradient-title">
        <Trophy className="h-8 w-8 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent className="space-y-6">
        {/* Score Overview */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">{result?.quizScore?.toFixed(1)}%</h3>
          <Progress value={result?.quizScore} className="w-full" />
        </div>

        {/* Improvement Tip */}
        {result?.improvementTip && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium">Improvement Tip</p>
            <p className="text-muted-foreground">{result.improvementTip}</p>
          </div>
        )}

        {/* Questions Overview */}
        <div className="space-y-4">
          <h3 className="font-medium">Questions Overview</h3>
          {result?.questions?.map(
            (question: QuizQuestion, index: number) => {
              return (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">
                      {index + 1}. {question.question}
                    </p>
                    {question.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Your answer: {question.userAnswer}</p>
                    {!question.isCorrect && (
                      <p>Correct answer: {question.answer}</p>
                    )}
                  </div>

                  <div className="text-sm bg-muted p-2 rounded">
                    <p className="font-medium">Explanation</p>
                    <p>{question.explanation}</p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </CardContent>
      {!hideStartNew && (
        <CardFooter className="mt-4">
          <Button onClick={onStartNew} className="w-full">
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
};

export default QuizResult;
