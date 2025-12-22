import {
  Card,
  Typography,
  Grid,
  Button,
  Chip,
} from "@mui/material";

const workouts = [
  { title: "Beginner Cardio", level: "Easy" },
  { title: "HIIT Advanced", level: "Hard" },
  { title: "Strength Builder", level: "Medium" },
];

const WorkoutsPage = () => {
  return (
    <Card sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Workout Programs
      </Typography>

      <Button variant="contained" sx={{ mb: 3 }}>
        Add New Workout
      </Button>

      <Grid container spacing={2}>
        {workouts.map((w, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ p: 2 }}>
              <Typography fontWeight={600}>{w.title}</Typography>
              <Chip label={w.level} size="small" sx={{ mt: 1 }} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default WorkoutsPage;
