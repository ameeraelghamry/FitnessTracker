const API_URL = "http://localhost:5000/api";

// Routine services
export const fetchRoutines = async () => {
  const res = await fetch(`${API_URL}/routines`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch routines");
  return res.json();
};

export const fetchUserStats = async () => {
  const res = await fetch(`${API_URL}/routines/stats`, {
    credentials: "include",
  });
  if (!res.ok) return { plans_count: 0, exercises_count: 0, total_sets: 0 };
  return res.json();
};

export const fetchRoutineDates = async () => {
  try {
    const res = await fetch(`${API_URL}/routines/dates`, {
      credentials: "include",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Fetch routine dates error:", err);
    return [];
  }
};

export const fetchRoutineById = async (id) => {
  const res = await fetch(`${API_URL}/routines/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch routine");
  return res.json();
};

export const createRoutine = async (data) => {
  const res = await fetch(`${API_URL}/routines`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create routine");
  }
  return res.json();
};

export const updateRoutine = async (id, data) => {
  const res = await fetch(`${API_URL}/routines/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update routine");
  return res.json();
};

export const deleteRoutine = async (id) => {
  const res = await fetch(`${API_URL}/routines/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete routine");
  return res.json();
};

// Exercise services
export const fetchExercises = async () => {
  try {
    const res = await fetch(`${API_URL}/exercises`, {
      credentials: "include",
    });
    if (!res.ok) {
      console.error("Fetch exercises failed:", res.status, res.statusText);
      return [];
    }
    return res.json();
  } catch (err) {
    console.error("Fetch exercises error:", err);
    return [];
  }
};

export const fetchFilteredExercises = async () => {
  try {
    const res = await fetch(`${API_URL}/exercises/filtered`, {
      credentials: "include",
    });
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch (err) {
    console.error("Fetch filtered exercises error:", err);
    return [];
  }
};

export const searchExercises = async (query) => {
  try {
    const res = await fetch(`${API_URL}/exercises/search?q=${encodeURIComponent(query)}`, {
      credentials: "include",
    });
    if (!res.ok) {
      console.error("Search exercises failed:", res.status);
      return [];
    }
    return res.json();
  } catch (err) {
    console.error("Search exercises error:", err);
    return [];
  }
};

// User services
export const fetchUserDashboard = async () => {
  try {
    const res = await fetch(`${API_URL}/user/dashboard`, {
      credentials: "include",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("Fetch dashboard error:", err);
    return null;
  }
};

export const fetchUserEquipment = async () => {
  try {
    const res = await fetch(`${API_URL}/user/equipment`, {
      credentials: "include",
    });
    if (!res.ok) return { equipment: [] };
    return res.json();
  } catch (err) {
    console.error("Fetch equipment error:", err);
    return { equipment: [] };
  }
};
