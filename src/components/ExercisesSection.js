import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@mui/material";

export default function ExercisesSection() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            const options = {
                method: "GET",
                url: "https://www.exercisedb.dev/api/v1/exercises?limit=28",
            };

            try {
                const { data } = await axios.request(options);
                console.log("API Response:", data);

                if (Array.isArray(data.data)) {
                    setExercises(data.data);
                } else {
                    console.error("Unexpected API structure:", data);
                    setExercises([]);
                }
            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        };

        fetchExercises();
    }, []);

    return (
        <Grid container spacing={3} sx={{ p: 4 }}>
            {exercises.map((exercise, idx) => (
                <Grid item xs={12} sm={6} md={3} key={exercise.exerciseId ?? idx}>
                    <Card
                        sx={{
                            height: "100%",
                            background: "#1A1A1A",
                            boxShadow: 3,
                            transition: "transform 0.3s",
                            "&:hover": { transform: "scale(1.05)" },
                        }}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                sx={{ height: 180 }}
                                image={exercise.gifUrl || ""}
                                alt={exercise.name}
                                onError={(e) => (e.target.style.display = "none")}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    sx={{ color: "#fff", textTransform: "capitalize" }}
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
                        <CardActions>
                            <Button size="small" color="primary">
                                Start
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
