import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const programs = [
  { title: "Strength Training", desc: "Build muscle and boost endurance." },
  { title: "Cardio Fitness", desc: "Improve stamina and heart health." },
  { title: "Flexibility", desc: "Enhance mobility and prevent injuries." },
];

const ProgramsSection = () => (
  <Box sx={{ py: 8, px: { xs: 3, md: 8 }, backgroundColor: "#0A0A0A", color: "#fff" }}>
    <Typography variant="h4" fontWeight={700} mb={4} textAlign="center">
      Our Programs
    </Typography>

    <Grid container spacing={3}>
      {programs.map((prog) => (
        <Grid item xs={12} md={4} key={prog.title}>
          <Card
            sx={{
              backgroundColor: "#1A1A1A",
              color: "#fff",
              textAlign: "center",
              height: "100%",
              borderRadius: 3,
              "&:hover": { transform: "scale(1.03)" },
              transition: "0.3s",
              cursor :"pointer"
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                {prog.title}
              </Typography>
              <Typography variant="body2">{prog.desc}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default ProgramsSection;
