/**
 * @interface ApiClientOptions
 * @extends RequestInit
 *
 * Custom options for configuring API requests, extending the standard `RequestInit` options.
 * Allows for additional headers and a JSON string body in the request configuration.
 *
 * @property {Record<string, string>} [headers] - Optional custom headers to include in the request.
 * @property {string} [body] - Optional JSON string for the request body, typically used for POST/PUT requests.
 */
interface ApiClientOptions extends RequestInit {
  headers?: Record<string, string>;
  body?: string;
}

/**
 * Makes a fetch request to the specified endpoint with optional authentication and returns the response as JSON.
 *
 * This generic `apiClient` function performs a fetch request to the API using the provided endpoint and configuration options.
 * It includes optional authentication through a Bearer token, which, if provided, is automatically added to the `Authorization` header.
 *
 * @template T - The expected type of the response data.
 * @param {string} endpoint - The API endpoint to request (appended to the base URL).
 * @param {ApiClientOptions} [options={}] - Optional configuration for the request, extending `RequestInit` and supporting custom headers and body.
 * @param {string} [authToken] - Optional Bearer token for authentication; if provided, the token is included in the `Authorization` header.
 * @returns {Promise<T>} - A promise that resolves to the response data, cast to type `T`.
 *
 * @throws {Error} - Throws an error if the response is not successful (non-2xx status).
 *
 * @example
 * // Example usage to fetch a list of users with an auth token:
 * const users = await apiClient<User[]>('/users', {}, 'your-auth-token');
 *
 * @example
 * // Example usage to create a new user (POST request):
 * const newUser = await apiClient<User>('/users', {
 *   method: 'POST',
 *   body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' })
 * }, 'your-auth-token');
 */
export async function apiClient<T>(
  endpoint: string,
  options: ApiClientOptions = {},
  authToken?: string, // Optional authentication token
): Promise<T> {
  const BASE_URL = "https://jsonplaceholder.typicode.com";

  const config: ApiClientOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}), // Add auth header if token is provided
    },
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

/**
 * Generic function to fetch data from a specified resource with an optional search term.
 *
 * @param resource - The name of the resource endpoint (e.g., 'users', 'posts').
 * @param searchField - The field to filter on (e.g., 'name', 'title').
 * @param searchTerm - The term to search for (optional).
 * @returns A promise that resolves to an array of data of type T.
 */
export async function fetchData<T>(
  resource: string,
  searchField: string,
  searchTerm: string = "",
): Promise<T[]> {
  // If there's a search term, construct the endpoint with a query parameter
  const endpoint = searchTerm
    ? `/${resource}?${searchField}_like=${searchTerm}`
    : `/${resource}`;
  return apiClient<T[]>(endpoint);
}

/**
 * @interface FilterOptions
 *
 * Configuration options for filtering, sorting, and paginating API request results.
 * This interface allows specifying optional parameters to control data retrieval and presentation.
 *
 * @property {string} [sortBy] - Optional field name to sort the results by.
 * @property {"asc" | "desc"} [order] - Optional sorting order: "asc" for ascending or "desc" for descending.
 * @property {number} [limit] - Optional limit on the maximum number of results to return.
 * @property {number} [start] - Optional starting index for pagination; used to skip a specified number of results.
 *
 * @example
 * // Example usage for retrieving sorted and paginated results:
 * const options: FilterOptions = {
 *   sortBy: 'id',
 *   order: 'asc',
 *   limit: 10,
 *   start: 20,
 * };
 */
interface FilterOptions {
  sortBy?: string; // Field to sort by
  order?: "asc" | "desc"; // Order of sorting
  limit?: number; // Maximum number of results to return
  start?: number; // Starting index for pagination
}

/**
 * Generic function to fetch filtered data from an API endpoint.
 *
 * @param resource - The name of the resource (e.g., 'users', 'posts').
 * @param filters - An object where keys are field names and values are the values to filter by.
 * @param options - Additional options for sorting, ordering, and pagination.
 * @returns A promise that resolves to an array of data of type T.
 */
export async function fetchFilteredData<T>(
  resource: string,
  filters: Record<string, string | number>, // Fields and values to filter on
  options: FilterOptions = {},
): Promise<T[]> {
  const queryParams = new URLSearchParams();

  // Add filter parameters to the query string
  Object.entries(filters).forEach(([field, value]) => {
    queryParams.append(field, value.toString());
  });

  // Add sorting, ordering, and pagination options
  if (options.sortBy) queryParams.append("_sort", options.sortBy);
  if (options.order) queryParams.append("_order", options.order);
  if (options.limit) queryParams.append("_limit", options.limit.toString());
  if (options.start) queryParams.append("_start", options.start.toString());

  const endpoint = `/${resource}?${queryParams.toString()}`;
  return apiClient<T[]>(endpoint);
}
