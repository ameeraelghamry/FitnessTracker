import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Avatar, Button } from "@mui/material";
import QuestionCard from "../components/mainpage/Questioncard";
import backgroundImage from "../assets/images/proimmm 4.svg";
import introImage from "../assets/images/Image.svg";

const questions = [
  { text: "HOW OLD ARE YOU?" },
  { text: "WHAT'S YOUR GENDER?", options: ["Male", "Female"] },
  { text: "WHAT IS YOUR FITNESS GOAL?", options: ["Lose Weight", "Gain Muscle", "Stay Fit"] },
  { text: "HOW MANY DAYS A WEEK DO YOU TRAIN?", options: [1, 2, 3, 4, 5, 6, 7] },
  { text: "WHAT IS YOUR HEIGHT (CM)?" },
  { text: "WHAT IS YOUR WEIGHT (KG)?" },
  {
    text: "WHAT EQUIPMENTS DO YOU HAVE AVAILABLE?",
    options: ["Dumbbells or Kettlebells", "Barbells", "Machines or Cables", "Resistance Bands", "No Equipment"],
  },
  {
    text: "WHAT ARE YOUR TARGET ZONES?",
    options: ["Arm", "Back", "Chest", "Abs", "Legs", "Glutes"],
  },
  {
    text: "WHAT IS YOUR FITNESS LEVEL?",
    options: ["New to Fitness", "Beginner", "Intermediate", "Advanced"],
  },
  { text: "WHAT IS YOUR GOAL WEIGHT (KG)?" },
  {
    text: "WHAT IS A PERFECT LENGTH OF A WORKOUT FOR YOU?",
    options: ["15 min", "Up to 30 mins", "1 hour", "I'll do whatever it takes"],
  },
];

export default function QuestionnairePage({ onFinish, onClose }) {
  const [showIntro, setShowIntro] = useState(true);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = questions.length;
  const currentQuestion = questions[step - 1];

  const goNext = () => {
    if (selected !== null) {
      setAnswers((prev) => ({ ...prev, [currentQuestion.text]: selected }));
    }

    if (step < totalSteps) {
      setStep((prev) => prev + 1);
      setSelected(null);
    } else {
      // Submit and trigger signup transition
      setSubmitted(true);
      setTimeout(() => {
        if (onFinish) onFinish();
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
          handleNext={goNext}
          handleBack={handleBack}
          onClose={onClose}
        />
      )}
    </Box>
  );
}
