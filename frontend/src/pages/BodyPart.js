import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import Header from "../components/mainpage/header";
import Footer from "../components/mainpage/Footer";

const BodyPartPage = () => {
    const { bodyPartName } = useParams();
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                setLoading(true);
                setErrorMsg("");

                const { data } = await axios.get(
                    `https://www.exercisedb.dev/api/v1/bodyparts/${encodeURIComponent(
                        bodyPartName
                    )}/exercises`
                );

                // ✅ Use the nested data array
                if (data && Array.isArray(data.data)) {
                    setExercises(data.data);
                } else {
                    setExercises([]);
                    setErrorMsg("No exercises found for this body part.");
                    console.error("Unexpected API response:", data);
                }
            } catch (error) {
                console.error("API Error:", error);
                setErrorMsg("Failed to load exercises.");
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, [bodyPartName]);

    if (loading)
        return (
            <Typography sx={{ p: 4, textAlign: "center" }}>Loading...</Typography>
        );

    if (errorMsg)
        return (
            <Typography sx={{ p: 4, textAlign: "center", color: "red" }}>
                {errorMsg}
            </Typography>
        );

    return (
        <>
            <Header />

            <Box
                sx={{
                    background: "#030509",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    py: 6,
                    minHeight: "100vh",
                }}
            >
                <Box sx={{ p: 4, width: "100%", maxWidth: "1200px" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            fontSize: { lg: "44px", xs: "30px" },
                            color: "#fff",
                            mb: "49px",
                            textAlign: "center",
                            textTransform: "capitalize",
                        }}
                    >
                        {bodyPartName} Exercises
                    </Typography>

                    <Grid container spacing={2}>
                        {exercises.map((exercise) => (
                            <Grid item xs={12} sm={6} md={4} key={exercise.exerciseId}>
                                <Card
                                    sx={{
                                        background: "#222",
                                        color: "#fff",
                                        height: "100%",
                                        borderRadius: 2,
                                        transition: "transform 0.3s",
                                        "&:hover": { transform: "scale(1.03)" },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={exercise.gifUrl}
                                        alt={exercise.name}
                                        sx={{ height: 200, objectFit: "contain" }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {exercise.name}
                                        </Typography>
                                        <Typography variant="body2" color="gray">
                                            Target: {exercise.targetMuscles?.join(", ") || "N/A"}
                                        </Typography>
                                        <Typography variant="body2" color="gray">
                                            Equipment: {exercise.equipment || "N/A"}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            <Footer />
        </>
    );
};

export default BodyPartPage;
