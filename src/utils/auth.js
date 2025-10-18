export function saveUser(user) {
  // Get users array from localStorage or initialize empty
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

export function findUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.find(
    (user) => user.email === email && user.password === password
  );
}

export function userExists(email) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.some((user) => user.email === email);
}