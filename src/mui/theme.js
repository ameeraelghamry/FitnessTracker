const styles = {
  root: (backgroundImage) => ({
    minHeight: "100vh",
    width: "100vw",
    background: `linear-gradient(rgba(15,15,15,0.85), rgba(25,25,25,0.95)), url(${backgroundImage}) center/cover no-repeat`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  paper: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: "rgba(22,28,39,0.97)", 
    boxShadow: 8,
    minWidth: 350,
    maxWidth: 420,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  titleBox: {
    mb: 2,
    textAlign: "center",
  },
  mainTitle: {
    color: "#C1E8FF", 
    fontWeight: "bold",
    mb: 1,
    letterSpacing: "2px",
    textShadow: "0 2px 16px rgba(0,0,0,0.4)",
  },
  subtitle: {
    color: "#C1E8FF",
    fontSize: "1rem",
    fontWeight: 400,
    letterSpacing: "1px",
  },
  buttonBox: {
    mt: 3,
    display: "flex",
    justifyContent: "center",
    gap: 2,
  },
  formBox: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mt: 2,
  },
  loginButton: {
    color: "#477CD8",
    fontWeight: "bold",
    letterSpacing: "1.5px",
    
  },
  signupButton: {
    color: "#477CD8",
    fontWeight: "bold",
    letterSpacing: "1.5px",
   
  },
  textField: {
    input: { color: "#F6F6F6", fontWeight: 500, letterSpacing: "1px" }, 
    label: { color: "#87A3B8" },
    "& .MuiFilledInput-root": {
      backgroundColor: "rgba(255,255,255,0.07)",
    },
    "& .MuiFilledInput-root.Mui-focused": {
      backgroundColor: "rgba(255,255,255,0.14)",
    },
    borderRadius: 2,
  },
};

export default styles;