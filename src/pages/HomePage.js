import React, { useState } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import BackgroundImage from "../assets/images/Group23.svg";
import QuestionnairePage from "../pages/Questionnairepage";

const HomePage = () => {
  const navigate = useNavigate();
  const [openQuestionnaire, setOpenQuestionnaire] = useState(false);

  const handleOpen = () => setOpenQuestionnaire(true);
  const handleClose = () => setOpenQuestionnaire(false);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          color: "#fff",
          px: { xs: 2, md: 8 },
          pt: { xs: 12, md: 20 },
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          }}
        />

        {/* Text Content */}
        <Box sx={{ position: "relative", zIndex: 2, maxWidth: "600px" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              textAlign: "left",
              color: "#fff",
            }}
          >
            ACHIEVE YOUR FITNESS DREAMS
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              fontSize: "1.1rem",
              textAlign: "left",
              color: "#fff",
            }}
          >
            Through Personalized Coaching, Cutting Edge Techniques, and Support —
            We Will Help You Achieve The Fitness Goals You’ve Always Wanted.
          </Typography>

          {/* Get Started Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#477CD8",
              "&:hover": { backgroundColor: "#0039cb" },
              width: "180px",
              alignSelf: "flex-start",
            }}
            onClick={handleOpen}
          >
            Get Started
          </Button>
        </Box>

        {/* Questionnaire Modal Overlay */}
        <Modal
          open={openQuestionnaire}
          onClose={handleClose}
          sx={{
            backdropFilter: "blur(0px)",
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
              onClose={handleClose} // ✅ Pass close handler
            />
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default HomePage;
