"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  BriefcaseIcon,
  TrendingUp,
  TrendingDown,
  Brain,
  LineChart as LucideLineChart,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { InsightData } from "@/types";

const primaryColor = "var(--primary)";
const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

interface DashboardProps {
  insights: InsightData;
}

const FuturisticDashboard = ({ insights }: DashboardProps) => {
  // Get user details from Clerk
  const { user } = useUser();
  const userName = user?.firstName || user?.username || "User";

  // Compute a greeting based on current time
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  // Transform salary data (in thousands)
  const salaryData = insights.salaryRanges.map((range) => ({
    role: range.role,
    min: range.min / 1000,
    median: range.median / 1000,
    max: range.max / 1000,
  }));

  // Growth Trend data with a slight variation for the line chart
  const trendData = salaryData.map((item, index) => ({
    role: item.role,
    value: item.median + index * 1.5,
  }));

  // RadarChart data (reuse salaryData)
  const radarData = salaryData;

  // PieChart: each role's median salary share
  const pieData = salaryData.map((role) => ({
    name: role.role,
    value: role.median,
  }));

  const getDemandLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook: string) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LucideLineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LucideLineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-10 p-6">
      {/* Greeting Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h1 className="text-4xl font-extrabold text-foreground">
          {greeting}, {userName}!
        </h1>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Market Outlook",
            value: insights.marketOutlook,
            description: `Next update ${nextUpdateDistance}`,
            icon: <OutlookIcon className={`h-6 w-6 ${outlookColor}`} />,
            bg: "bg-gradient-to-r from-primary to-secondary",
          },
          {
            title: "Industry Growth",
            value: `${insights.growthRate.toFixed(1)}%`,
            description: "",
            icon: <TrendingUp className="h-6 w-6 text-white" />,
            bg: "bg-gradient-to-r from-secondary to-primary",
          },
          {
            title: "Demand Level",
            value: insights.demandLevel,
            description: "",
            icon: <BriefcaseIcon className="h-6 w-6 text-white" />,
            bg: "bg-gradient-to-r from-muted to-gray-700",
          },
          {
            title: "Top Skills",
            value: "",
            description: "",
            icon: <Brain className="h-6 w-6 text-white" />,
            bg: "bg-gradient-to-r from-gray-700 to-muted",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="h-full"
          >
            <Card className={`${card.bg} text-white shadow-2xl h-full`}>
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent className="space-y-2 flex flex-col justify-between min-h-[150px]">
                {card.value && (
                  <div className="text-3xl font-extrabold">{card.value}</div>
                )}
                {card.description && (
                  <CardDescription className="text-xs opacity-90">
                    {card.description}
                  </CardDescription>
                )}
                {card.title === "Top Skills" && (
                  <div className="flex flex-wrap gap-2">
                    {insights.topSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-white/20 text-white"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
                {card.title === "Industry Growth" && (
                  <Progress
                    value={insights.growthRate}
                    className="mt-2 bg-white/20"
                  />
                )}
                {card.title === "Demand Level" && (
                  <div
                    className={`h-2 w-full rounded-full ${getDemandLevelColor(
                      insights.demandLevel
                    )}`}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Ranges Bar Chart */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-primary">
                Salary Ranges by Role
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Min, Median &amp; Max (in K)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salaryData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                    />
                    <XAxis
                      dataKey="role"
                      stroke={primaryColor}
                      tick={{ fontSize: 10 }}
                      interval={0}
                      angle={-20}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis stroke={primaryColor} tick={{ fontSize: 10 }} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border rounded-lg p-2 shadow-md">
                              <p className="font-medium">{label}</p>
                              {payload.map((item) => (
                                <p key={item.name} className="text-sm">
                                  {item.name}: ${item.value}K
                                </p>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="min" fill={primaryColor} name="Min" />
                    <Bar dataKey="median" fill={primaryColor} name="Median" />
                    <Bar dataKey="max" fill={primaryColor} name="Max" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Growth Trend Line Chart */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-primary">
                Growth Trend by Role
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Visualizing median salary trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trendData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                    />
                    <XAxis
                      dataKey="role"
                      stroke={primaryColor}
                      tick={{ fontSize: 8 }}
                      interval={0}
                      angle={-25}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis stroke={primaryColor} tick={{ fontSize: 8 }} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border rounded-lg p-2 shadow-md">
                              <p className="font-medium">{label}</p>
                              {payload.map((item) => (
                                <p key={item.name} className="text-sm">
                                  {item.name}: {item.value}
                                </p>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      dataKey="value"
                      stroke={primaryColor}
                      strokeWidth={3}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Radar Chart */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-primary">
                Salary Radar
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Comparing Min, Median &amp; Max salaries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis
                      dataKey="role"
                      tick={{ fontSize: 10 }}
                      stroke={primaryColor}
                    />
                    <Radar
                      name="Min"
                      dataKey="min"
                      stroke="var(--chart-1)"
                      fill="var(--chart-1)"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Median"
                      dataKey="median"
                      stroke="var(--chart-2)"
                      fill="var(--chart-2)"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Max"
                      dataKey="max"
                      stroke="var(--chart-3)"
                      fill="var(--chart-3)"
                      fillOpacity={0.6}
                    />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Median Salary Pie Chart */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-primary">
                Median Salary Share
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Role contribution in total median salary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Pie>
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Trends & Recommended Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <Card className="shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-primary">
                Key Industry Trends
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Trends shaping the industry
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[150px]">
              <ul className="space-y-3">
                {insights.keyTrends.map((trend, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-sm text-primary">{trend}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={6}
        >
          <Card className="shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-primary">
                Recommended Skills
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Skills to develop for future success
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {insights.recommendedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-primary text-primary"
                >
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FuturisticDashboard;
