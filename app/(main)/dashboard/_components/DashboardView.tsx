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
  RadialBarChart,
  RadialBar,
  PolarRadiusAxis,
} from "recharts";
import {
  BriefcaseIcon,
  TrendingUp,
  TrendingDown,
  Brain,
  LineChart as LucideLineChart,
  Sun,
  Moon,
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

// Smoother card animation with reduced intensity
const cardVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeInOut" },
  }),
};

const greetingTextVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const greetingIconVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 90, delay: 0.15 },
  },
};

interface DashboardProps {
  insights: InsightData;
}

const FuturisticDashboard = ({ insights }: DashboardProps) => {
  const { user } = useUser();
  const userName = user?.firstName || user?.username || "User";

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

  const salaryData = insights.salaryRanges.map((range) => ({
    role: range.role,
    min: range.min / 1000,
    median: range.median / 1000,
    max: range.max / 1000,
  }));

  const trendData = salaryData.map((item, index) => ({
    role: item.role,
    value: item.median + index * 1.5,
  }));

  const radarData = salaryData;

  const pieData = salaryData.map((role) => ({
    name: role.role,
    value: role.median,
  }));

  const aiAdoptionData = [{ name: "AI Adoption", value: 75 }];

  const emergingTechData = [
    { name: "Quantum Computing", value: 5 },
    { name: "Blockchain", value: 30 },
    { name: "AI", value: 70 },
    { name: "IoT", value: 40 },
    { name: "5G", value: 60 },
  ];

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
    {
      addSuffix: true,
    }
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={greetingTextVariants}
          className="flex items-center space-x-3"
        >
          <motion.div variants={greetingIconVariants}>
            {greeting === "Good evening" ? (
              <Moon className="h-8 w-8 text-primary" />
            ) : (
              <Sun className="h-8 w-8 text-primary" />
            )}
          </motion.div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {greeting}, {userName}!
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-muted-foreground opacity-75 mt-2 sm:mt-0"
        >
          Last updated on: {lastUpdatedDate}
        </motion.div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Market Outlook",
            value: insights.marketOutlook,
            description: `Next update ${nextUpdateDistance}`,
            icon: <OutlookIcon className={`h-8 w-8 ${outlookColor}`} />,
            bg: "bg-gradient-to-r from-primary to-secondary",
          },
          {
            title: "Industry Growth",
            value: `${insights.growthRate.toFixed(1)}%`,
            description: "",
            icon: <TrendingUp className="h-8 w-8 text-neutral" />,
            bg: "bg-gradient-to-r from-secondary to-primary",
          },
          {
            title: "Demand Level",
            value: insights.demandLevel,
            description: "",
            icon: <BriefcaseIcon className="h-8 w-8 text-neutral" />,
            bg: "bg-gradient-to-r from-secondary to-primary",
          },
          {
            title: "Top Skills",
            value: "",
            description: "",
            icon: <Brain className="h-8 w-8 text-neutral" />,
            bg: "bg-gradient-to-r from-secondary to-primary",
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
            <Card
              className={`${card.bg} text-neutral shadow-md h-full animate-smooth hover:ring-2 hover:ring-primary transition-all duration-300`}
            >
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-lg font-medium text-neutral">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent className="space-y-2 flex flex-col justify-end h-full">
                {card.value && (
                  <div className="text-3xl font-extrabold text-neutral-foreground">
                    {card.value}
                  </div>
                )}
                {card.description && (
                  <CardDescription className="text-xs text-neutral">
                    {card.description}
                  </CardDescription>
                )}
                {card.title === "Top Skills" && (
                  <div className="flex flex-wrap gap-2 justify-start">
                    {insights.topSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-white/40 text-neutral dark:bg-dark/40 sm:bg-blue-100 sm:text-blue-800 md:bg-green-100 md:text-green-800 lg:bg-yellow-100 lg:text-yellow-800 xl:bg-red-100 xl:text-red-800"
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

      {/* Charts and Additional Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Ranges Bar Chart */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <Card className="shadow-md animate-smooth bg-gradient-to-b from-card to-muted hover:ring-2 hover:ring-primary transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-primary">
                Salary Ranges by Role
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Min, Median & Max (in K)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salaryData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
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
                      content={({ active, payload, label }) =>
                        active && payload && payload.length ? (
                          <div className="bg-background border rounded-lg p-2 shadow-md">
                            <p className="font-medium">{label}</p>
                            {payload.map((item) => (
                              <p key={item.name} className="text-sm">
                                {item.name}: ${item.value}K
                              </p>
                            ))}
                          </div>
                        ) : null
                      }
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
          custom={5}
        >
          <Card className="shadow-md animate-smooth bg-gradient-to-b from-card to-muted hover:ring-2 hover:ring-primary transition-all duration-300">
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
                    margin={{ top: 20, right: 20, left: 0, bottom: 80 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                    />
                    <XAxis
                      dataKey="role"
                      stroke={primaryColor}
                      tick={{ fontSize: 7 }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke={primaryColor} tick={{ fontSize: 8 }} />
                    <Tooltip
                      content={({ active, payload, label }) =>
                        active && payload && payload.length ? (
                          <div className="bg-background border rounded-lg p-2 shadow-md">
                            <p className="font-medium">{label}</p>
                            {payload.map((item) => (
                              <p key={item.name} className="text-sm">
                                {item.name}: {item.value}
                              </p>
                            ))}
                          </div>
                        ) : null
                      }
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

      {/* Radar and Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Radar Chart */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={6}
        >
          <Card className="shadow-md animate-smooth bg-gradient-to-b from-card to-muted hover:ring-2 hover:ring-primary transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-primary">
                Salary Radar
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Comparing Min, Median & Max salaries
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
          custom={7}
        >
          <Card className="shadow-md animate-smooth bg-gradient-to-b from-card to-muted hover:ring-2 hover:ring-primary transition-all duration-300">
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
                      fontSize={10}
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

      {/* Industry Trends and Recommended Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={8}
        >
          <Card className="shadow-lg animate-smooth bg-gradient-to-b from-card to-muted h-full hover:ring-2 hover:ring-primary transition-all duration-300">
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
          custom={9}
        >
          <Card className="shadow-lg animate-smooth bg-gradient-to-b from-card to-muted h-full hover:ring-2 hover:ring-primary transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-primary">
                Recommended Skills
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Skills to develop for future success
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3 justify-start">
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

      {/* AI Adoption and Emerging Technologies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={10}
        >
          <Card className="shadow-xl bg-gradient-to-b animate-smooth from-card to-muted hover:ring-2 hover:ring-primary transition-all duration-300 relative overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-primary">
                Industry AI Adoption
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Percentage of companies adopting AI
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="h-80 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    data={aiAdoptionData}
                    startAngle={180}
                    endAngle={0}
                    innerRadius="60%"
                    outerRadius="80%"
                    barSize={10}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  >
                    <RadialBar background dataKey="value" fill={primaryColor} />
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      angleAxisId={0}
                      tick={false}
                    />
                    <PolarRadiusAxis tick={false} />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-4xl font-bold text-primary"
                    >
                      {aiAdoptionData[0].value}%
                    </motion.div>
                    <div className="text-sm text-muted-foreground">
                      Adoption Rate
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={11}
        >
          <Card className="shadow-xl animate-smooth bg-gradient-to-b from-card to-muted hover:ring-2 hover:ring-primary transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-primary">
                Emerging Technologies
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Adoption rates of key technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={emergingTechData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                    />
                    <XAxis
                      dataKey="name"
                      stroke={primaryColor}
                      tick={{ fontSize: 10 }}
                      interval={0}
                      angle={-20}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis stroke={primaryColor} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill={primaryColor}
                      name="Adoption Rate"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FuturisticDashboard;
