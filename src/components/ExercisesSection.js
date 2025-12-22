import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ExercisesSection() {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const { data } = await axios.get(
                    "https://www.exercisedb.dev/api/v1/exercises?limit=28"
                );
                setExercises(data.data || []);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        };

        fetchExercises();
    }, []);

    const handleExerciseClick = (exercise) => {
        navigate(`/exercise/${exercise.id}`, { state: { exercise } });
    };

    return (
        <Grid container spacing={3} sx={{ p: 4 }}>
            {exercises.map((exercise, idx) => (
                <Grid item xs={12} sm={6} md={3} key={exercise.id ?? idx}>
                    <Card
                        sx={{
                            height: "100%",
                            background: "#1A1A1A",
                            boxShadow: 3,
                            display: "flex",
                            flexDirection: "column",
                            transition: "transform 0.3s",
                            "&:hover": { transform: "scale(1.05)" },
                        }}
                    >
                        <CardActionArea
                            sx={{ flexGrow: 1 }}
                            onClick={() => handleExerciseClick(exercise)}
                        >
                            <CardMedia
                                component="img"
                                height="180"
                                image={
                                    exercise.gifUrl ||
                                    "https://via.placeholder.com/300x180?text=Exercise"
                                }
                                alt={exercise.name}
                                onError={(e) => {
                                    e.target.src =
                                        "https://via.placeholder.com/300x180?text=Exercise";
                                }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    sx={{ color: "#fff", textTransform: "capitalize", minHeight: 56 }}
                                >
                                    {exercise.name}
                                </Typography>
                                <Typography variant="body2" color="#fff">
                                    Body Part: {exercise.bodyParts?.[0]}
                                </Typography>
                                <Typography variant="body2" color="#fff">
                                    Target: {exercise.targetMuscles?.[0]}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
