import React from "react";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import { Facebook, Instagram, YouTube, Reddit, MusicNote, Google, WhatsApp } from "@mui/icons-material";
import { ReactComponent as Logo } from "../../assets/images/FitVerse.svg"; 

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0A0A0A",
        color: "#bbb",
        py: 6,
        px: { xs: 3, md: 10 },
      }}
    >
      <Grid container spacing={5} justifyContent="space-between">
        {/* Left section - logo and social icons */}
        <Grid item xs={12} md={3}>
          {/* SVG logo */}
          <Box sx={{ mb: 3 }}>
            <Logo width="120px" height="auto" />
          </Box>

          {/* Social Media */}
          <Box>
            <IconButton color="inherit" href="#">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" href="#">
              <Instagram />
            </IconButton>
            <IconButton color="inherit" href="#">
              <YouTube />
            </IconButton>
            <IconButton color="inherit" href="#">
              <Google />
            </IconButton>
            <IconButton color="inherit" href="#">
              <WhatsApp />
            </IconButton>
          </Box>
        </Grid>

        {/* Middle columns */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Product */}
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1" sx={{ color: "#fff", mb: 2 }}>
                Product
              </Typography>
              <FooterLink text="Elite Membership" />
              <FooterLink text="Coach" />
              <FooterLink text="Sign Up" />
              <FooterLink text="Login" />
            </Grid>

            {/* Resources */}
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1" sx={{ color: "#fff", mb: 2 }}>
                Resources
              </Typography>
              <FooterLink text="Workout Plans" />
              <FooterLink text="Exercise Database" />
              <FooterLink text="Community" />
            </Grid>

            {/* Legal */}
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1" sx={{ color: "#fff", mb: 2 }}>
                Legal
              </Typography>
              <FooterLink text="Terms of Use" />
              <FooterLink text="Privacy Policy" />
              <FooterLink text="IP / DMCA Notices" />
              <FooterLink text="Press & Media" />
            </Grid>

            {/* Support */}
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1" sx={{ color: "#fff", mb: 2 }}>
                Support
              </Typography>
              <FooterLink text="About Us" />
              <FooterLink text="Contact Us" />
              <FooterLink text="Blog" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Bottom copyright */}
      <Box sx={{ textAlign: "center", mt: 6, borderTop: "1px solid #222", pt: 3 }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} FitVerse Inc. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

/* ✅ Custom reusable Footer link component */
const FooterLink = ({ text, href = "#" }) => (
  <Link
    href={href}
    color="inherit"
    underline="none"
    sx={{
      display: "block",
      mb: 1.5,
      fontSize: "0.95rem",
      "&:hover": { color: "#fff" },
      textDecoration: "none",
    }}
  >
    {text}
  </Link>
);

export default Footer;
