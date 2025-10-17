import React from "react";
import { Box, Typography } from "@mui/material";
import Header from "../components/mainpage/header";
import BackgroundImage from "../assets/images/workoutPage.jpg";
import SearchExercises from "../components/SearchExercises";
import EmblaCarousel from "../components/EmblaCarousel";
import ExercisesSection from "../components/ExercisesSection";
import "../css/base.css";
import "../css/embla.css";

import backIcon from "../assets/icons/back.png";
import chestIcon from "../assets/icons/chest.png";
import legsIcon from "../assets/icons/leg.png";
import calvesIcon from "../assets/icons/calves.png";
import Footer from "../components/mainpage/Footer";

const SLIDES = [
    { icon: calvesIcon, label: "Calves" },
    { icon: legsIcon, label: "Legs" },
    { icon: chestIcon, label: "Chest" },
    { icon: backIcon, label: "Back" },
    { icon: calvesIcon, label: "Weights" },
    { icon: calvesIcon, label: "Running" },
    { icon: calvesIcon, label: "Endurance" },
    { icon: calvesIcon, label: "Core" },
];

const OPTIONS = {
    loop: true,
    slidesToScroll: 4,
    align: "start",
};

const Workouts = () => {
    return (
        <>
            <Header />

            {/* Hero Section */}
            <Box
                sx={{
                    position: "relative",
                    minHeight: "100vh",
                    backgroundImage: `url(${BackgroundImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    px: { xs: 2, md: 8 },
                    pt: { xs: 12, md: 20 },
                    pb: { xs: 8, md: 12 },
                }}
            >
                {/* Overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1,
                    }}
                />

                {/* Search Section */}
                <Box sx={{ position: "relative", zIndex: 2, width: "100%" }}>
                    <SearchExercises />
                </Box>

                {/* Categories Carousel */}
                <Box sx={{ position: "relative", zIndex: 2, width: "100%", mt: 4 }}>
                    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                </Box>
            </Box>

            {/* Exercises Section */}
            <Box
                sx={{
                    background: "#030509",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    py: 6,
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        fontSize: { lg: "44px", xs: "30px" },
                        color: "#fff",
                        mb: "49px",
                        textAlign: "center",
                    }}
                >
                    Explore Exercises
                </Typography>

                <ExercisesSection />
            </Box>

            <Footer />
        </>
    );
};

export default Workouts;
