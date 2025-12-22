import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Stack,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// Import trainer images - update paths as needed
import Trainer1 from "../assets/images/Trainer2.jpeg";
import Trainer2 from "../assets/images/Trainer1.jpeg";
import Trainer3 from "../assets/images/Trainer3.jpg";

const trainers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Strength Coach",
    specialty: "Weight Training & Powerlifting",
    experience: "8+ Years",
    certifications: ["NASM-CPT", "CSCS", "Precision Nutrition"],
    bio: "Alex specializes in strength training and has helped hundreds of clients achieve their fitness goals through personalized workout programs.",
    img: Trainer1,
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 2,
    name: "Mia Lopez",
    role: "Cardio Specialist",
    specialty: "HIIT & Endurance Training",
    experience: "6+ Years",
    certifications: ["ACE-CPT", "Group Fitness", "Spinning Certified"],
    bio: "Mia brings energy and motivation to every session. Her cardio programs are designed to maximize fat burn while improving cardiovascular health.",
    img: Trainer2,
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 3,
    name: "Ryan Smith",
    role: "Flexibility Trainer",
    specialty: "Yoga & Mobility",
    experience: "10+ Years",
    certifications: ["RYT-500", "FMS Certified", "Corrective Exercise"],
    bio: "Ryan focuses on flexibility, mobility, and injury prevention. His holistic approach combines yoga with functional movement patterns.",
    img: Trainer3,
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
];

const TrainerCard = ({ trainer }) => (
  <Card
    sx={{
      borderRadius: 4,
      background: "linear-gradient(145deg, #1a1f2e 0%, #2d3748 100%)",
      color: "white",
      overflow: "hidden",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 20px 40px rgba(71, 124, 216, 0.2)",
      },
    }}
  >
    <Box sx={{ position: "relative", p: 3, textAlign: "center" }}>
      <Avatar
        src={trainer.img}
        alt={trainer.name}
        sx={{
          width: 150,
          height: 150,
          margin: "auto",
          border: "4px solid #477CD8",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          bgcolor: "#477CD8",
          borderRadius: 2,
          px: 1.5,
          py: 0.5,
        }}
      >
        <Typography variant="caption" fontWeight={600}>
          {trainer.experience}
        </Typography>
      </Box>
    </Box>

    <CardContent sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom>
        {trainer.name}
      </Typography>
      <Typography
        variant="subtitle1"
        color="#477CD8"
        textAlign="center"
        fontWeight={600}
        gutterBottom
      >
        {trainer.role}
      </Typography>
      <Typography
        variant="body2"
        color="rgba(255,255,255,0.7)"
        textAlign="center"
        sx={{ mb: 2 }}
      >
        {trainer.specialty}
      </Typography>

      <Typography
        variant="body2"
        color="rgba(255,255,255,0.8)"
        textAlign="center"
        sx={{ mb: 3, minHeight: 60 }}
      >
        {trainer.bio}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" color="rgba(255,255,255,0.5)" sx={{ mb: 1, display: "block" }}>
          Certifications
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" useFlexGap>
          {trainer.certifications.map((cert, i) => (
            <Chip
              key={i}
              label={cert}
              size="small"
              sx={{
                bgcolor: "rgba(71, 124, 216, 0.2)",
                color: "#477CD8",
                fontSize: "0.7rem",
                mb: 0.5,
              }}
            />
          ))}
        </Stack>
      </Box>

      <Stack direction="row" spacing={1} justifyContent="center">
        <IconButton
          size="small"
          sx={{ color: "#1877F2", "&:hover": { bgcolor: "rgba(24,119,242,0.1)" } }}
          href={trainer.social.facebook}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          size="small"
          sx={{ color: "#1DA1F2", "&:hover": { bgcolor: "rgba(29,161,242,0.1)" } }}
          href={trainer.social.twitter}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          size="small"
          sx={{ color: "#E4405F", "&:hover": { bgcolor: "rgba(228,64,95,0.1)" } }}
          href={trainer.social.instagram}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          size="small"
          sx={{ color: "#0A66C2", "&:hover": { bgcolor: "rgba(10,102,194,0.1)" } }}
          href={trainer.social.linkedin}
        >
          <LinkedInIcon />
        </IconButton>
      </Stack>
    </CardContent>
  </Card>
);

const TrainersPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 50%, #0a0f1a 100%)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <FitnessCenterIcon sx={{ fontSize: 48, color: "#477CD8" }} />
          </Box>
          <Typography
            variant="h2"
            fontWeight={800}
            color="white"
            gutterBottom
            sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
          >
            Meet Our Expert Trainers
          </Typography>
          <Typography
            variant="h6"
            color="rgba(255,255,255,0.7)"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Our certified fitness professionals are dedicated to helping you achieve your health and fitness goals with personalized guidance.
          </Typography>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {[
            { label: "Expert Trainers", value: "15+", icon: <FitnessCenterIcon /> },
            { label: "Years Experience", value: "50+", icon: <EmojiEventsIcon /> },
            { label: "Happy Clients", value: "1000+", icon: <EmojiEventsIcon /> },
            { label: "Certifications", value: "30+", icon: <EmojiEventsIcon /> },
          ].map((stat, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "rgba(71, 124, 216, 0.1)",
                  border: "1px solid rgba(71, 124, 216, 0.2)",
                }}
              >
                <Typography variant="h3" fontWeight={800} color="#477CD8">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.7)">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Trainers Grid */}
        <Grid container spacing={4}>
          {trainers.map((trainer) => (
            <Grid item xs={12} md={4} key={trainer.id}>
              <TrainerCard trainer={trainer} />
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Box
          sx={{
            mt: 8,
            p: 6,
            borderRadius: 4,
            background: "linear-gradient(135deg, #477CD8 0%, #3b6bbf 100%)",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight={700} color="white" gutterBottom>
            Ready to Start Your Fitness Journey?
          </Typography>
          <Typography variant="body1" color="rgba(255,255,255,0.9)" sx={{ mb: 3 }}>
            Join FitVerse today and get matched with the perfect trainer for your goals.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TrainersPage;
