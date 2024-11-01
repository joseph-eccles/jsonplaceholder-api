import { apiClient } from "../services/apiClient";

async function fetchUsers() {
  try {
    // Call the apiClient function with the /users endpoint
    const users = await apiClient("/users/1");
    console.log("Fetched users:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Execute the function
fetchUsers();
