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

  // Questions requiring manual input
  const needsInput = [
    "HOW OLD ARE YOU?",
    "WHAT IS YOUR HEIGHT (CM)?",
    "WHAT IS YOUR WEIGHT (KG)?",
    "WHAT IS YOUR GOAL WEIGHT (KG)?",
  ].includes(question.text);

   const isMultiSelect = [
    "WHAT ARE YOUR TARGET ZONES?",
    "WHAT equipments do you have available ?",
  ].includes(question.text);

  const handleSelect = (opt) => {
    if (isMultiSelect) {
      // Toggle selection for multi-choice
      let current = Array.isArray(selected) ? [...selected] : [];
      if (current.includes(opt)) {
        current = current.filter((item) => item !== opt);
      } else {
        current.push(opt);
      }
      setSelected(current);
    } else {
      setSelected(opt);
      if (!needsInput) {
        setTimeout(() => handleNext(), 400);
      }
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
      {/* Header */}
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
        <Typography variant="body2" sx={{ ml: "29%", mr: "30%" }}>
          Step {step} of {totalSteps}
        </Typography>
      </Box>

      {/* Progress */}
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

      {/* Question */}
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, mb: 3, textTransform: "uppercase" }}
      >
        {question.text}
      </Typography>

      {/* Answer Options */}
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
        backgroundColor: isMultiSelect
          ? Array.isArray(selected) && selected.includes(opt)
            ? "#477CD8"
            : "#e4e4e4ff"
          : selected === opt
          ? "#477CD8"
          : "#e4e4e4ff",
        transition: "0.2s",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: "1rem",
          textAlign: "center",
          color: isMultiSelect
            ? Array.isArray(selected) && selected.includes(opt)
              ? "#fff"
              : "#000"
            : selected === opt
            ? "#fff"
            : "#000",
          fontWeight: 500,
        }}
      >
        {opt}
      </Typography>
    </Box>
          ))
        )}
      </Box>

      {/* Next Button (for input and multi-select) */}
      {(needsInput || isMultiSelect) && (
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
          disabled={
            needsInput
              ? !selected
              : isMultiSelect && (!selected || selected.length === 0)
          }
        >
          {step === totalSteps ? "Submit" : "Next Step"}
        </Button>
      )}
    </Card>
  );
}
