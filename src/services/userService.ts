import { apiClient } from "./apiClient";

/**
 * User interface defining the structure of user data received from the API.
 */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/**
 * Fetch all users (authentication optional).
 *
 * @param authToken - (Optional) The authentication token to authorize the request.
 * @returns Promise<User[]> - A promise that resolves to an array of User objects.
 */
export async function getUsers(authToken?: string): Promise<User[]> {
  return apiClient<User[]>("/users", {}, authToken);
}

/**
 * Fetch a specific user by ID (authentication optional).
 *
 * @param userId - The ID of the user to fetch.
 * @param authToken - (Optional) The authentication token to authorize the request.
 * @returns Promise<User> - A promise that resolves to a User object.
 */
export async function getUserById(
  userId: number,
  authToken?: string,
): Promise<User> {
  return apiClient<User>(`/users/${userId}`, {}, authToken);
}

/**
 * Create a new user (requires authentication).
 *
 * @param userData - The data for the new user to create.
 * @param authToken - The authentication token to authorize the request.
 * @returns Promise<User> - A promise that resolves to the newly created User object.
 */
export async function createUser(
  userData: Partial<User>,
  authToken?: string,
): Promise<User> {
  return apiClient<User>(
    "/users",
    {
      method: "POST",
      body: JSON.stringify(userData),
    },
    authToken,
  );
}

/**
 * Update an existing user by ID (requires authentication).
 *
 * @param userId - The ID of the user to update.
 * @param updatedData - The updated data for the user.
 * @param authToken - The authentication token to authorize the request.
 * @returns Promise<User> - A promise that resolves to the updated User object.
 */
export async function updateUser(
  userId: number,
  updatedData: Partial<User>,
  authToken?: string,
): Promise<User> {
  return apiClient<User>(
    `/users/${userId}`,
    {
      method: "PUT",
      body: JSON.stringify(updatedData),
    },
    authToken,
  );
}

/**
 * Delete a user by ID (requires authentication).
 *
 * @param userId - The ID of the user to delete.
 * @param authToken - The authentication token to authorize the request.
 * @returns Promise<void> - A promise that resolves when the user is deleted.
 */
export async function deleteUser(
  userId: number,
  authToken?: string,
): Promise<void> {
  await apiClient<void>(
    `/users/${userId}`,
    {
      method: "DELETE",
    },
    authToken,
  );
}
