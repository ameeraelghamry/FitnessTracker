import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import calvesIcon from "../assets/icons/calves.png";
import legsIcon from "../assets/icons/leg.png";
import chestIcon from "../assets/icons/chest.png";
import backIcon from "../assets/icons/back.png";

// ✅ Corrected slides list
const SLIDES = [
  { icon: backIcon, label: "Back", apiName: "back" },
  { icon: chestIcon, label: "Chest", apiName: "chest" },
  { icon: backIcon, label: "Upper Arms", apiName: "upper arms" },
  { icon: legsIcon, label: "Upper Legs", apiName: "upper legs" },
  { icon: calvesIcon, label: "Lower Legs", apiName: "lower legs" },
  { icon: backIcon, label: "Waist", apiName: "waist" },
  { icon: backIcon, label: "Lower Arms", apiName: "lower arms" },
  { icon: backIcon, label: "Shoulders", apiName: "shoulders" },
  { icon: backIcon, label: "Cardio", apiName: "cardio" },
  { icon: backIcon, label: "Neck", apiName: "neck" },
];

function EmblaCarousel() {
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
      {SLIDES.map((slide, index) => (
        <Link
          key={index}
          to={`/bodypart/${encodeURIComponent(slide.apiName)}`}
          style={{ textDecoration: "none" }}
        >
          <Box
            sx={{
              background: "#222",
              color: "#fff",
              borderRadius: 2,
              p: 2,
              textAlign: "center",
              cursor: "pointer",
              width: 120,
              transition: "0.3s",
              "&:hover": { background: "#333", transform: "scale(1.05)" },
            }}
          >
            <img src={slide.icon} alt={slide.label} width="50" />
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              {slide.label}
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  );
}

export default EmblaCarousel;
