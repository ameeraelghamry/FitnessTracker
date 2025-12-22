import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Divider,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import GroupIcon from "@mui/icons-material/Group";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const API_BASE_URL = "http://localhost:5000/api/social";

/**
 * Social Sharing Component - Connected to Backend
 * 
 * Feature: Allow users to share their fitness progress with friends 
 * or join groups for motivation and accountability.
 */
const SocialShare = ({ 
  userId = null, // If provided, fetches stats from backend
  shareType = "progress", // progress, streak, achievement, workout, invite
  title = "Check out my fitness progress!", 
  text = "I'm crushing my fitness goals on FitVerse!", 
  url = window.location.href,
  hashtags = ["fitness", "workout", "FitVerse", "health"],
  workoutData = null,
  achievementData = null,
  size = "medium",
  color = "primary",
  variant = "icon" // "icon" | "button" | "card"
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState(text);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);
  const [userStats, setUserStats] = useState(null);
  const [shareContent, setShareContent] = useState(null);

  // Get user ID from localStorage if not provided
  const getEffectiveUserId = () => {
    if (userId) return userId;
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.id || null;
  };

  // Fetch user stats and share content from backend
  const fetchShareContent = async () => {
    const effectiveUserId = getEffectiveUserId();
    if (!effectiveUserId) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/content/${effectiveUserId}?type=${shareType}`);
      if (response.ok) {
        const data = await response.json();
        setShareContent(data);
        setUserStats(data.stats);
        setCustomMessage(data.text);
      }
    } catch (error) {
      console.error("Error fetching share content:", error);
    } finally {
      setLoading(false);
    }
  };

  // Log share to backend
  const logShareToBackend = async (platform) => {
    const effectiveUserId = getEffectiveUserId();
    if (!effectiveUserId) return;

    try {
      await fetch(`${API_BASE_URL}/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: effectiveUserId,
          platform,
          contentType: shareType,
        }),
      });
    } catch (error) {
      console.error("Error logging share:", error);
    }
  };

  const handleClick = (event) => {
    if (variant === "card") {
      fetchShareContent();
      setShareDialogOpen(true);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getShareUrl = () => shareContent?.shareUrl || url;
  const getShareText = () => customMessage || shareContent?.text || text;
  const getHashtags = () => shareContent?.hashtags || hashtags;

  const encodedUrl = encodeURIComponent(getShareUrl());
  const encodedText = encodeURIComponent(getShareText());
  const hashtagString = getHashtags().join(",");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${hashtagString}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleShare = async (platform) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
    await logShareToBackend(platform);
    handleClose();
    setShareDialogOpen(false);
    setSnackbar({ open: true, message: `Shared on ${platform}!`, severity: "success" });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${getShareText()}\n${getShareUrl()}`);
      await logShareToBackend("copy");
      setSnackbar({ open: true, message: "Link copied to clipboard!", severity: "success" });
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to copy link", severity: "error" });
    }
    handleClose();
    setShareDialogOpen(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: shareContent?.title || title, 
          text: getShareText(), 
          url: getShareUrl() 
        });
        await logShareToBackend("native");
        setSnackbar({ open: true, message: "Shared successfully!", severity: "success" });
      } catch (err) {
        if (err.name !== "AbortError") {
          handleClick({ currentTarget: document.querySelector('[data-share-button]') });
        }
      }
    } else {
      handleClick({ currentTarget: document.querySelector('[data-share-button]') });
    }
  };

  // Render based on variant
  const renderTrigger = () => {
    if (variant === "button") {
      return (
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={handleClick}
          sx={{
            borderColor: "#477CD8",
            color: "#477CD8",
            "&:hover": {
              borderColor: "#3b6bbf",
              bgcolor: "rgba(71, 124, 216, 0.1)",
            },
          }}
        >
          Share Progress
        </Button>
      );
    }

    if (variant === "card") {
      return (
        <Card
          onClick={handleClick}
          sx={{
            cursor: "pointer",
            borderRadius: 3,
            bgcolor: "rgba(71, 124, 216, 0.1)",
            border: "1px dashed rgba(71, 124, 216, 0.3)",
            transition: "all 0.3s ease",
            height: "100%",
            "&:hover": {
              bgcolor: "rgba(71, 124, 216, 0.15)",
              borderColor: "#477CD8",
            },
          }}
        >
          <CardContent sx={{ textAlign: "center", py: 3 }}>
            <ShareIcon sx={{ fontSize: 40, color: "#477CD8", mb: 1 }} />
            <Typography variant="body1" fontWeight={600} color="#477CD8">
              Share Your Progress
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Motivate friends & stay accountable
            </Typography>
          </CardContent>
        </Card>
      );
    }

    // Default: icon
    return (
      <Tooltip title="Share with friends">
        <IconButton
          data-share-button
          onClick={navigator.share ? handleNativeShare : handleClick}
          size={size}
          color={color}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(71, 124, 216, 0.1)",
              transform: "scale(1.1)",
            },
            transition: "all 0.2s ease",
          }}
        >
          <ShareIcon />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <>
      {renderTrigger()}

      {/* Quick Share Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 220,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Share Your Progress
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Motivate friends & stay accountable
          </Typography>
        </Box>
        <Divider />

        <MenuItem onClick={() => handleShare("facebook")}>
          <ListItemIcon><FacebookIcon sx={{ color: "#1877F2" }} /></ListItemIcon>
          <ListItemText>Facebook</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleShare("twitter")}>
          <ListItemIcon><TwitterIcon sx={{ color: "#1DA1F2" }} /></ListItemIcon>
          <ListItemText>Twitter</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleShare("whatsapp")}>
          <ListItemIcon><WhatsAppIcon sx={{ color: "#25D366" }} /></ListItemIcon>
          <ListItemText>WhatsApp</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleShare("linkedin")}>
          <ListItemIcon><LinkedInIcon sx={{ color: "#0A66C2" }} /></ListItemIcon>
          <ListItemText>LinkedIn</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleCopyLink}>
          <ListItemIcon><ContentCopyIcon /></ListItemIcon>
          <ListItemText>Copy Link</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => { handleClose(); fetchShareContent(); setShareDialogOpen(true); }}>
          <ListItemIcon><GroupIcon sx={{ color: "#477CD8" }} /></ListItemIcon>
          <ListItemText>Customize & Share</ListItemText>
        </MenuItem>
      </Menu>

      {/* Detailed Share Dialog */}
      <Dialog 
        open={shareDialogOpen} 
        onClose={() => setShareDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ShareIcon color="primary" />
            Share Your Fitness Progress
          </Box>
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Share your achievements with friends for motivation and accountability!
              </Typography>

              {/* Stats Preview Card */}
              {userStats && (
                <Card sx={{ mb: 3, bgcolor: "linear-gradient(135deg, #477CD8 0%, #3b6bbf 100%)", background: "linear-gradient(135deg, #477CD8 0%, #3b6bbf 100%)" }}>
                  <CardContent sx={{ color: "white" }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.9 }}>
                      Your Stats
                    </Typography>
                    <Stack direction="row" spacing={3} flexWrap="wrap">
                      <Box>
                        <Typography variant="h4" fontWeight={700}>
                          {userStats.totalWorkouts}
                        </Typography>
                        <Typography variant="caption">Workouts</Typography>
                      </Box>
                      <Box>
                        <Typography variant="h4" fontWeight={700}>
                          {(userStats.totalVolume / 1000).toFixed(1)}k
                        </Typography>
                        <Typography variant="caption">Volume (kg)</Typography>
                      </Box>
                      <Box>
                        <Typography variant="h4" fontWeight={700}>
                          {userStats.currentStreak}
                        </Typography>
                        <Typography variant="caption">Day Streak 🔥</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              )}

              {/* Workout/Achievement Preview */}
              {(workoutData || achievementData) && (
                <Card sx={{ mb: 3, bgcolor: "#f5f5f5" }}>
                  <CardContent>
                    {workoutData && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: "#477CD8" }}>
                          <FitnessCenterIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {workoutData.name}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Chip label={workoutData.duration} size="small" />
                            <Chip label={workoutData.volume} size="small" />
                          </Stack>
                        </Box>
                      </Box>
                    )}
                    {achievementData && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: "#FFD700" }}>
                          <EmojiEventsIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {achievementData.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {achievementData.description}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              )}

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Your Message"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Typography variant="caption" color="text.secondary">
                Hashtags: {getHashtags().map(h => `#${h}`).join(" ")}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle2" gutterBottom>
                Share to:
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <IconButton
                  onClick={() => handleShare("facebook")}
                  sx={{ bgcolor: "#1877F2", color: "white", "&:hover": { bgcolor: "#166fe5" } }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleShare("twitter")}
                  sx={{ bgcolor: "#1DA1F2", color: "white", "&:hover": { bgcolor: "#1a91da" } }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleShare("whatsapp")}
                  sx={{ bgcolor: "#25D366", color: "white", "&:hover": { bgcolor: "#22c55e" } }}
                >
                  <WhatsAppIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleShare("linkedin")}
                  sx={{ bgcolor: "#0A66C2", color: "white", "&:hover": { bgcolor: "#0958a8" } }}
                >
                  <LinkedInIcon />
                </IconButton>
              </Stack>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialogOpen(false)}>Cancel</Button>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopyLink}>
            Copy Link
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SocialShare;
