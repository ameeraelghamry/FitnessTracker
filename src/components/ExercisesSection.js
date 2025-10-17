import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
} from '@mui/material';

export default function ExercisesSection() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            const options = {
                method: 'GET',
                url: 'https://exercisedb.p.rapidapi.com/exercises',
                headers: {
                    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                },
            };

            try {
                const response = await axios.request(options);
                setExercises(response.data.slice(0, 20)); // limit to 20 cards
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };

        fetchExercises();
    }, []);

    return (
        <Grid container spacing={3} sx={{ p: 4 }}>
            {exercises.map((exercise) => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={2.4} // 5 per row on large screens
                    key={exercise.id}
                >
                    <Card
                        sx={{
                            maxWidth: 345,
                            height: '100%',
                            borderRadius: 3,
                            boxShadow: 3,
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'scale(1.05)' },
                        }}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="180"
                                image={exercise.gifUrl}
                                alt={exercise.name}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                    sx={{ textTransform: 'capitalize' }}
                                >
                                    {exercise.name}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Body Part: {exercise.bodyPart}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Target: {exercise.target}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 1 }}
                                >
                                    Duration: {Math.floor(Math.random() * 20) + 10} mins
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
