import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import QuestionCard from "../components/Questioncard";
import backgroundImage from "../assets/images/proimmm 4.svg";
import introImage from "../assets/images/Image.svg"; // 🆕 add your intro image here

const questions = [
  { text: "HOW OLD ARE YOU?" },
  { text: "WHAT'S YOUR GENDER?", options: ["Male", "Female", "Other"] },
  { text: "WHAT IS YOUR FITNESS GOAL?", options: ["Lose Weight", "Gain Muscle", "Stay Fit"] },
  { text: "HOW MANY DAYS A WEEK DO YOU TRAIN?", options: [1, 2, 3, 4, 5, 6, 7] },
  { text: "WHAT IS YOUR HEIGHT (CM)?" },
  { text: "WHAT IS YOUR WEIGHT (KG)?" },
  { text: "WHAT TIME DO YOU PREFER TO TRAIN?", options: ["Morning", "Afternoon", "Evening"] },
  {
    text: "WHAT ARE YOUR TARGET ZONES?",
    options: ["Arm", "Back", "Chest", "Abs", "Legs", "Butt"],
  },
  {
    text: "WHAT IS YOUR FITNESS LEVEL?",
    options: ["New to fitness", "Beginner", "Intermediate", "Advanced"],
  },
  { text: "WHAT IS YOUR GOAL WEIGHT (KG)?" },
  {
    text: "WHAT'S YOUR PREFERRED PLACE TO WORKOUT?",
    options: ["Home", "Gym"],
  },
  {
    text: "WHAT IS A PERFECT LENGTH OF A WORKOUT FOR YOU?",
    options: ["15 min", "Up to 30 mins", "1 hour", "I'll do whatever it takes"],
  },
];

export default function QuestionnairePage() {
  const [showIntro, setShowIntro] = useState(true); // 🆕 controls the intro screen
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
      setStep(step + 1);
      setSelected(null);
    } else {
      setSubmitted(true);
    }
  };

  const handleNext = () => goNext();
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };
  const handleSkip = () => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.text]: "Skipped" }));
    goNext();
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        },
        "& > *": {
          zIndex: 2,
        },
      }}
    >
      {showIntro ? (
        <Card
          sx={{
            width: 400,
            maxWidth: "90%",
            textAlign: "center",
            borderRadius: 3,
            boxShadow: 5,
            p: 3,
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Let’s Get Started
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 3, color: "text.secondary", px: 2 }}
            >
              Let’s get started with your training, where we’ll help you to
              achieve your fitness goal
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
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#3b82f6",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#2563eb" },
              }}
              onClick={() => setShowIntro(false)} // 🔥 switch to questionnaire
            >
              Get Started!
            </Button>
          </CardContent>
        </Card>
      ) : submitted ? (
        <Box
          sx={{
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            Thank You!
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            You’ve completed the questionnaire.
          </Typography>
        </Box>
      ) : (
        <QuestionCard
          step={step}
          totalSteps={totalSteps}
          question={currentQuestion}
          selected={selected}
          setSelected={setSelected}
          handleNext={handleNext}
          handleBack={handleBack}
          handleSkip={handleSkip}
        />
      )}
    </Box>
  );
}
