import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  LinearProgress,
  IconButton,
  TextField,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function QuestionCard({
  step,
  totalSteps,
  question,
  selected,
  setSelected,
  handleNext,
  handleBack,
}) {
  const progress = (step / totalSteps) * 100;

  // These questions require manual input (so we keep the Next button)
  const needsInput = [
    "HOW OLD ARE YOU?",
    "WHAT IS YOUR HEIGHT (CM)?",
    "WHAT IS YOUR WEIGHT (KG)?",
    "WHAT IS YOUR GOAL WEIGHT (KG)?",
  ].includes(question.text);

  // Automatically go to next question for multiple-choice answers
  const handleSelect = (opt) => {
    setSelected(opt);
    if (!needsInput) {
      setTimeout(() => handleNext(), 400); // smooth auto transition
    }
  };

  return (
    <Card
      sx={{
        zIndex: 1,
        width: 400,
        borderRadius: 3,
        p: 4,
        textAlign: "center",
        backgroundColor: "rgba(255,255,255,0.95)",
        position: "relative",
      }}
    >
      {/* Header (Back + Step info) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          mb: 1,
          gap: 1,
        }}
      >
        <IconButton onClick={handleBack} size="small" disabled={step === 1}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="body2" sx={{ ml: "auto", mr: "auto" }}>
          Step {step} of {totalSteps}
        </Typography>
      </Box>

      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 6,
          borderRadius: 3,
          mb: 3,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": { backgroundColor: "#3b6ff5" },
        }}
      />

      {/* Question Text */}
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, mb: 3, textTransform: "uppercase" }}
      >
        {question.text}
      </Typography>

      {/* Options or Input */}
      <Box>
        {needsInput ? (
          <TextField
            type="number"
            label="Enter your answer"
            variant="outlined"
            required
            fullWidth
            value={selected || ""}
            onChange={(e) => setSelected(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": { borderRadius: 2 },
            }}
          />
        ) : (
          Array.isArray(question.options) &&
          question.options.map((opt, index) => (
            <Box
              key={index}
              onClick={() => handleSelect(opt)}
              sx={{
                borderRadius: 1,
                py: 1,
                my: 0.5,
                cursor: "pointer",
                backgroundColor: selected === opt ? "#000" : "transparent",
                color: selected === opt ? "#fff" : "#000",
                transition: "0.2s",
              }}
            >
              {opt}
            </Box>
          ))
        )}
      </Box>

      {/* Next / Submit Button (only for input-type questions) */}
      {needsInput && (
        <Button
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#477CD8",
            borderRadius: 1,
            textTransform: "uppercase",
            fontWeight: 600,
            ":hover": { backgroundColor: "#345de4" },
          }}
          onClick={handleNext}
          disabled={!selected}
        >
          {step === totalSteps ? "Submit" : "Next Step"}
        </Button>
      )}
    </Card>
  );
}
