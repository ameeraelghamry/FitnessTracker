import React, { useState } from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../components/mainpage/header";
import HeroSection from "../components/mainpage/HeroSection";
import ProgramsSection from "../components/mainpage/ProgramsSection";
import TrainersSection from "../components/mainpage/TrainersSection";
import Footer from "../components/mainpage/Footer";
import JoinSection from "../components/mainpage/JoinSection";
import QuestionnairePage from "../pages/Questionnairepage";

const HomePage = () => {
  const navigate = useNavigate();
  const [openQuestionnaire, setOpenQuestionnaire] = useState(false);

  const handleOpen = () => setOpenQuestionnaire(true);
  const handleClose = () => setOpenQuestionnaire(false);

  return (
    <>
      <Header />

      {/* Sections */}
      <HeroSection onGetStarted={handleOpen} />
      <ProgramsSection />
      <TrainersSection />
      <JoinSection onGetStarted={handleOpen} />
      <Footer />

      <Modal
        open={openQuestionnaire}
        onClose={handleClose}
        sx={{
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,1), rgba(40,40,40,0.8), rgba(0,0,0,1))",
            borderRadius: "20px",
            padding: "40px",
            width: "90%",
            maxWidth: "700px",
            color: "#fff",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}
          >
            ACHIEVE YOUR FITNESS DREAMS
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              fontSize: "1.1rem",
              textAlign: "center",
              color: "#f5f5f5",
            }}
          >
            Through Personalized Coaching, Cutting Edge Techniques, and Support —
            We Will Help You Achieve The Fitness Goals You’ve Always Wanted.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#477CD8",
                "&:hover": { backgroundColor: "#0039cb" },
              }}
              onClick={() => {
                handleClose();
                navigate("/signup");
              }}
            >
              Get Started
            </Button>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default HomePage;
