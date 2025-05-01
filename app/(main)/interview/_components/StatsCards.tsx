// components/StatsCards.tsx
import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizResultType } from "@/types";

export default function StatsCards({
  assessments,
}: {
  assessments: QuizResultType[];
}) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce((sum, a) => sum + a.quizScore, 0);
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => assessments?.[0] ?? null;

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce((sum, a) => sum + a.questions.length, 0);
  };

  const cards = [
    {
      title: "Average Score",
      value: `${getAverageScore()}%`,
      icon: <Trophy className="h-6 w-6 text-primary" />,
    },
    {
      title: "Questions Practiced",
      value: getTotalQuestions(),
      icon: <Brain className="h-6 w-6 text-primary" />,
    },
    {
      title: "Latest Score",
      value: `${getLatestAssessment()?.quizScore.toFixed(1) ?? 0}%`,
      icon: <Target className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="shadow-md animate-smooth bg-gradient-to-b from-card to-muted hover:ring-2 hover:ring-primary transition-all duration-300"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {card.value}
            </div>
            <p className="text-xs text-muted-foreground">{card.title}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
