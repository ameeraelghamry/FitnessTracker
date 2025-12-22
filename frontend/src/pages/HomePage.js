import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import Header from "../components/mainpage/header";
import HeroSection from "../components/mainpage/HeroSection";
import ProgramsSection from "../components/mainpage/ProgramsSection";
import TrainersSection from "../components/mainpage/TrainersSection";
import Footer from "../components/mainpage/Footer";
import JoinSection from "../components/mainpage/JoinSection";
import QuestionnairePage from "../pages/Questionnairepage";
import Signup from "../components/mainpage/Signup";
import Login from "../components/mainpage/Login";

const HomePage = () => {
  const [openQuestionnaire, setOpenQuestionnaire] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenQuestionnaire = () => {
    setOpenQuestionnaire(true);
    setShowSignup(false);
  };

  const handleCloseQuestionnaire = () => {
    setOpenQuestionnaire(false);
    setShowSignup(false);
  };

  const handleLoginOpen = () => setOpenLogin(true);
  const handleLoginClose = () => setOpenLogin(false);

  return (
    <>
      <Header onLoginClick={handleLoginOpen} />

      {/* Sections */}
      <HeroSection onGetStarted={handleOpenQuestionnaire} />
      <ProgramsSection />
      <TrainersSection />
      <JoinSection onGetStarted={handleOpenQuestionnaire} />
      <Footer />

      {/* Questionnaire + Signup Modal */}
      <Modal
        open={openQuestionnaire}
        onClose={handleCloseQuestionnaire}
        sx={{
          backdropFilter: "blur(2px)",
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
          {!showSignup ? (
            <QuestionnairePage
              onFinish={() => setShowSignup(true)}
              onClose={handleCloseQuestionnaire}
            />
          ) : (
            <Box
              sx={{
                width: 400,
                backgroundColor: "white",
                borderRadius: 3,
                boxShadow: 5,
                p: 3,
                position: "relative",
              }}
            >
              <Signup onClose={handleCloseQuestionnaire} />
            </Box>
          )}
        </Box>
      </Modal>

      {/* Login Modal */}
      <Modal
        open={openLogin}
        onClose={handleLoginClose}
        sx={{
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <Box
          sx={{
            width: 400,
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: 5,
            p: 3,
            mx: "auto",
            mt: "10%",
            position: "relative",
          }}
        >
          <Login onClose={handleLoginClose} />
        </Box>
      </Modal>
    </>
  );
};

export default HomePage;
