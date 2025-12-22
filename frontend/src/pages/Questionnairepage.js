import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Avatar, Button } from "@mui/material";
import QuestionCard from "../components/mainpage/Questioncard";
import backgroundImage from "../assets/images/proimmm 4.svg";
import introImage from "../assets/images/Image.svg";

const questions = [
  { id: "age", text: "HOW OLD ARE YOU?" },
  { id: "gender", text: "WHAT'S YOUR GENDER?", options: ["Male", "Female"] },
  { id: "fitnessGoal", text: "WHAT IS YOUR FITNESS GOAL?", options: ["Lose Weight", "Gain Muscle", "Stay Fit"] },
  { id: "trainingDaysPerWeek", text: "HOW MANY DAYS A WEEK DO YOU TRAIN?", options: [1, 2, 3, 4, 5, 6, 7] },
  { id: "heightCm", text: "WHAT IS YOUR HEIGHT (CM)?" },
  { id: "weightKg", text: "WHAT IS YOUR WEIGHT (KG)?" },
  {
    id: "equipment",
    text: "WHAT EQUIPMENTS DO YOU HAVE AVAILABLE?",
    options: ["Dumbbells or Kettlebells", "Barbells", "Machines or Cables", "Resistance Bands", "No Equipment"],
  },
  {
    id: "targetZones",
    text: "WHAT ARE YOUR TARGET ZONES?",
    options: ["Arm", "Back", "Chest", "Abs", "Legs", "Glutes"],
  },
  {
    id: "fitnessLevel",
    text: "WHAT IS YOUR FITNESS LEVEL?",
    options: ["New to Fitness", "Beginner", "Intermediate", "Advanced"],
  },
  { id: "goalWeightKg", text: "WHAT IS YOUR GOAL WEIGHT (KG)?" },
  {
    id: "workoutDuration",
    text: "WHAT IS A PERFECT LENGTH OF A WORKOUT FOR YOU?",
    options: ["15 min", "Up to 30 mins", "1 hour", "I'll do whatever it takes"],
  },
];

export default function QuestionnairePage({ onFinish, onClose }) {
  const [showIntro, setShowIntro] = useState(true);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = questions.length;
  const currentQuestion = questions[step - 1];

  const goNext = (valueFromCard) => {
    const value = valueFromCard !== undefined ? valueFromCard : selected;

    // ❗ Basic validation for numeric questions
    if (currentQuestion.id === "age") {
      const age = Number(value);
      if (!age || age < 18 || age > 100) {
        setError("Please enter a valid age between 10 and 100.");
        return;
      }
    }

    if (currentQuestion.id === "heightCm") {
      const height = Number(value);
      if (!height || height < 100 || height > 250) {
        setError("Please enter a valid height between 100 and 250 cm.");
        return;
      }
    }

    if (currentQuestion.id === "weightKg") {
      const weight = Number(value);
      if (!weight || weight < 30 || weight > 300) {
        setError("Please enter a valid weight between 30 and 300 kg.");
        return;
      }
    }

    if (currentQuestion.id === "goalWeightKg") {
      const goalWeight = Number(value);
      const currentWeight = Number(answers.weightKg);
      const goal = answers.fitnessGoal;

      if (!goalWeight || goalWeight < 30 || goalWeight > 300) {
        setError("Please enter a realistic goal weight between 30 and 300 kg.");
        return;
      }

      // Validate goal weight based on fitness goal
      if (goal === "Lose Weight") {
        if (goalWeight >= currentWeight) {
          setError(`Goal weight (${goalWeight} kg) must be less than your current weight (${currentWeight} kg) when your goal is to lose weight.`);
          return;
        }
        if (goalWeight >= currentWeight * 0.95) {
          setError("For weight loss, your goal weight should be at least 5% less than your current weight.");
          return;
        }
      } else if (goal === "Gain Muscle") {
        if (goalWeight <= currentWeight) {
          setError(`Goal weight (${goalWeight} kg) must be greater than your current weight (${currentWeight} kg) when your goal is to gain muscle.`);
          return;
        }
      }
      // "Stay Fit" doesn't need strict validation - goal weight can be close to current weight
    }

    // Clear any previous error if validation passes
    setError("");

    // Build updated answers object including current selection
    let updatedAnswers = answers;
    if (value !== null && value !== undefined && currentQuestion.id) {
      updatedAnswers = { ...answers, [currentQuestion.id]: value };
      setAnswers(updatedAnswers);
    }

    if (step < totalSteps) {
      setStep((prev) => prev + 1);
      setSelected(null);
      setError("");
    } else {
      // Submit and trigger signup transition, sending all answers up
      setSubmitted(true);
      setTimeout(() => {
        if (onFinish) onFinish(updatedAnswers);
      }, 1200);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        zIndex: 9999,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(97, 97, 97, 0.15)",
          zIndex: 1,
        },
        "& > *": { zIndex: 2 },
      }}
    >
      {/* 🌟 Intro Card */}
      {showIntro ? (
        <Card
          sx={{
            width: 400,
            maxWidth: "90%",
            textAlign: "center",
            borderRadius: 3,
            boxShadow: 5,
            p: 3,
            backgroundColor: "rgba(255,255,255,0.95)",
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Let’s Get Started
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: "text.secondary", px: 2 }}>
              Let’s get started with your training, where we’ll help you achieve your fitness goal.
            </Typography>

            <Avatar
              src={introImage}
              alt="Intro"
              sx={{
                width: 150,
                height: 150,
                mx: "auto",
                mb: 3,
              }}
            />

            <Button
              fullWidth
              onClick={() => setShowIntro(false)}
              sx={{
                backgroundColor: "#3b82f6",
                color: "#fff",
                borderRadius: "8px",
                fontWeight: 600,
                textTransform: "none",
                py: 1.2,
                "&:hover": { backgroundColor: "#2563eb" },
              }}
            >
              Get Started!
            </Button>
          </CardContent>
        </Card>
      ) : submitted ? (
        // ✅ Thank You Card (before Signup appears)
        <Card
          sx={{
            width: 400,
            maxWidth: "90%",
            textAlign: "center",
            borderRadius: 3,
            boxShadow: 5,
            p: 3,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                fontWeight: 700,
                color: "#1e293b",
              }}
            >
              🎉 Thank You!
            </Typography>

            <Typography variant="body1" sx={{ color: "#475569", mb: 2 }}>
              You’ve completed the questionnaire.
            </Typography>

            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Let’s move on to your personalized fitness journey!
            </Typography>
          </CardContent>
        </Card>
      ) : (
        // 🧩 Question Cards
        <QuestionCard
          step={step}
          totalSteps={totalSteps}
          question={currentQuestion}
          selected={selected}
          setSelected={setSelected}
          error={error}
          handleNext={goNext}
          handleBack={handleBack}
          onClose={onClose}
        />
      )}
    </Box>
  );
}
