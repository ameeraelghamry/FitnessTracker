import React from "react";
import { Box, Typography, Avatar, Grid } from "@mui/material";
import Trainer1 from "../../assets/images/Trainer2.jpeg";
import Trainer2 from "../../assets/images/Trainer1.jpeg";
import Trainer3 from "../../assets/images/Trainer3.jpg";

const trainers = [
  { name: "Alex Johnson", role: "Strength Coach", img: Trainer1 },
  { name: "Mia Lopez", role: "Cardio Specialist", img: Trainer2 },
  { name: "Ryan Smith", role: "Flexibility Trainer", img: Trainer3 },
];

const TrainersSection = () => (
  <Box sx={{ py: 8, px: { xs: 3, md: 8 }, backgroundColor: "#111", color: "#fff" }}>
    <Typography variant="h4" fontWeight={700} mb={4} textAlign="center">
      Meet Our Trainers
    </Typography>

    <Grid container spacing={3} justifyContent="center">
      {trainers.map((t) => (
        <Grid item xs={12} md={4} key={t.name} textAlign="center">
          <Avatar
            src={t.img}
            alt={t.name}
            sx={{ width: 120, height: 120, margin: "auto", mb: 2 }}
          />
          <Typography variant="h6">{t.name}</Typography>
          <Typography variant="body2" color="#bbb">
            {t.role}
          </Typography>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default TrainersSection;
