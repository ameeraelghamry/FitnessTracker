import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
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
      {/* ✅ Pass the same handler so Join Now opens the questionnaire */}
      <JoinSection onGetStarted={handleOpen} /> 
      <Footer />

      {/* Questionnaire Modal */}
      <Modal
        open={openQuestionnaire}
        onClose={handleClose}
        sx={{
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <QuestionnairePage
            onFinish={() => {
              handleClose();
              navigate("/signup");
            }}
            onClose={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
};

export default HomePage;