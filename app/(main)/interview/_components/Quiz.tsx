/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/useFetch";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import { toast } from "sonner";
import QuizResult from "./QuizResult";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });

    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz Completed!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    setResultData(null);
    generateQuizFn();
  };

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="#7b45bb" />;
  }

  if (resultData) {
    return (
      <div className="my-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <Card className="my-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions based on your skills and industry.
            Each question has 4 options, and you can select one answer. After
            answering all questions, you will receive your score and
            explanations for each question. Take your time and do your best!
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={generateQuizFn}>
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }
  const question = quizData[currentQuestion];
  return (
    <Card className="my-2">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{question.question}</p>
        <RadioGroup
          className="space-y-2"
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
        >
          {question.options.map((option: string, index: number) => {
            return (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem value={option} id={`option-${index}`} />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            );
          })}
        </RadioGroup>
        {showExplanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className=" font-medium">Explanation</p>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            disabled={!answers[currentQuestion]}
            variant={"outline"}
          >
            Show Explanation
          </Button>
        )}

        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          variant={"outline"}
          className="ml-auto"
        >
          {savingResult && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {currentQuestion < quizData.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
