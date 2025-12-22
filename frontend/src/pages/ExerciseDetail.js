import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/mainpage/Footer";

const ExerciseDetail = () => {
    const { state } = useLocation();
    const exercise = state?.exercise;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "#0C1018",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Header />

            {!exercise ? (
                <Typography sx={{ mt: 5, textAlign: "center", color: "#fff" }}>
                    Exercise not found
                </Typography>
            ) : (
                <Box
                    sx={{
                        maxWidth: 1000,
                        margin: "100px 60px 60px 50px ",
                        padding: 3,
                        display: "flex",
                        gap: 4,
                        color: "#fff",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "flex-start",
                    }}
                >
                    {/* LEFT: GIF */}
                    <Box sx={{ flex: "0 0 400px" }}>
                        <img
                            src={exercise.gifUrl}
                            alt={exercise.name}
                            style={{
                                width: "110%",
                                borderRadius: "12px",
                                marginRight: "60px",
                            }}
                        />
                    </Box>

                    {/* RIGHT: TEXT */}
                    <Box sx={{ flex: 1, ml: { md: 8 } }}>
                        <Box
                            sx={{
                                border: "2px solid #fff",
                                borderRadius: "20px",
                                padding: 9,
                                textAlign: "center",
                                width: "100%",
                            }}
                        >
                            <Typography
                                variant="h4"
                                textTransform="capitalize"
                                gutterBottom
                            >
                                {exercise.name}
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 4,
                                    mb: 3,
                                    flexWrap: "wrap",
                                }}
                            >
                                <Typography>
                                    🦵 Body Part: <b>{exercise.bodyParts?.[0]}</b>
                                </Typography>
                                <Typography>
                                    🎯 Target: <b>{exercise.targetMuscles?.[0]}</b>
                                </Typography>
                            </Box>

                            <Typography variant="h6" gutterBottom>
                                Instructions
                            </Typography>

                            <ol
                                style={{
                                    paddingLeft: "20px",
                                    textAlign: "left",
                                    margin: "0 auto",
                                }}
                            >
                                <li>Follow the GIF carefully</li>
                                <li>Keep controlled movement</li>
                                <li>Maintain proper breathing</li>
                            </ol>
                        </Box>
                    </Box>

                </Box>
            )}

            <Footer />
        </Box>
    );
};

export default ExerciseDetail;
