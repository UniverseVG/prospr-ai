"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { QuizResultType } from "@/types";

const primaryColor = "var(--primary)";

export default function PerformanceChart({
  assessments,
}: {
  assessments: QuizResultType[];
}) {
  const [chartData, setChartData] = useState<{ date: string; score: number }[]>(
    []
  );

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <Card className="shadow-md animate-smooth bg-gradient-to-b from-card to-muted hover:ring-2 hover:ring-primary transition-all duration-300">
      <CardHeader>
        <CardTitle className="gradient-title gradient text-3xl md:text-4xl">
          Performance Trend
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Your quiz scores over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                angle={-15}
                textAnchor="end"
                height={50}
                stroke={primaryColor}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
                stroke={primaryColor}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-background border rounded-lg p-2 shadow-md">
                        <p className="text-sm font-medium text-foreground">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke={primaryColor}
                strokeWidth={3}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
