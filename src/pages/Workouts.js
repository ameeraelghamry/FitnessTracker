import React from "react";
import { Box } from "@mui/material";
import Header from "../components/header"; // adjust path if needed
import BackgroundImage from "../assets/images/workoutPage.jpg";
import SearchExercises from "../components/SearchExercises";
import EmblaCarousel from "../components/EmblaCarousel";
import ExercisesSection from "../components/ExercisesSection";
import Card from "../components/Card";
import '../css/base.css'
import '../css/embla.css'

import backIcon from '../assets/icons/back.png';
import chestIcon from '../assets/icons/chest.png';
import legsIcon from '../assets/icons/leg.png';
import calvesIcon from '../assets/icons/calves.png';

// 👇 Each slide now uses the image path instead of a component
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
    slidesToScroll: 4,   // 👈 scrolls 4 slides each time
    align: 'start'
}
const SLIDE_COUNT = 8   // 👈 2 groups of 4 slides

const Workouts = () => {
    return (
        <>
            <Header />

            {/* Hero Section with Search on top */}
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

                {/* SearchExercises content */}
                <Box sx={{ position: "relative", zIndex: 2, width: "100%" }}>
                    <SearchExercises />
                </Box>

                <Box sx={{ position: "relative", zIndex: 2, width: "100%", height: '200%' }}>
                    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                </Box>

            </Box>


            {/*next is card collection Section*/}
            <Box sx={{
                background: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, #0a1f44 50%, rgba(0, 0, 0, 1) 100%)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
            }}>
                <div>
                    <h2 style={{ textAlign: 'center', margin: '20px 0', color: 'white' }}>Exercises</h2>
                    <ExercisesSection />
                </div>
            </Box>


        </>
    );
};

export default Workouts;
