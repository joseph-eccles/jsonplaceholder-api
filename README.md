# API Client

This project provides a TypeScript-based, reusable API client designed to interact with REST APIs, such as [JSONPlaceholder](https://jsonplaceholder.typicode.com). The client supports flexible filtering, sorting, and pagination, with optional authentication, making it adaptable for various resources.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic API Call](#basic-api-call)
  - [Using Filters and Options](#using-filters-and-options)
  - [Making Multiple Requests](#making-multiple-requests)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Contributing](#contributing)

## Features

- **Generic API Client**: Provides a reusable `apiClient` function for making HTTP requests with optional authentication.
- **Filtering and Pagination**: Allows for advanced filtering, sorting, and pagination options.
- **Concurrent Requests**: Supports making multiple requests simultaneously.
- **Error Handling**: Built-in error handling and logging for failed requests.
- **TypeScript Support**: Strongly typed for predictable, safe API interactions.

## Getting Started

To use this API client, you need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. This project is configured to be used in a Node or browser-based JavaScript/TypeScript environment.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/api-client.git
   cd api-client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the TypeScript files:
   ```bash
   npm run build
   ```

## Usage

### Basic API Call

The `apiClient` function allows you to make an API call with optional authentication.

#### Example: Fetch a User

```typescript
import { apiClient } from "./apiClient";

async function fetchUser() {
  const user = await apiClient<User>("/users/1");
  console.log(user);
}

fetchUser();
```

### Using Filters and Options

The `fetchFilteredData` function allows you to fetch resources with optional filters, sorting, and pagination.

#### Example: Fetch Users with Filters

```typescript
import fetchFilteredData from "./fetchFilteredData";

async function fetchFilteredUsers() {
  const users = await fetchFilteredData<User>(
    "users",
    { name_like: "Lea" },
    { sortBy: "name", order: "asc", limit: 5 },
  );
  console.log(users);
}

fetchFilteredUsers();
```

### Making Multiple Requests

The `fetchMultipleResources` function allows you to perform multiple API requests concurrently and returns all results in a single call.

#### Example: Fetch Users and Posts Simultaneously

```typescript
import fetchMultipleResources from "./fetchMultipleResources";

async function fetchUsersAndPosts() {
  const requests = [
    { resource: "users", filters: { name_like: "Lea" }, options: { limit: 5 } },
    {
      resource: "posts",
      filters: { userId: 1 },
      options: { sortBy: "id", order: "desc" },
    },
  ];

  const [users, posts] = await fetchMultipleResources(requests);
  console.log("Users:", users);
  console.log("Posts:", posts);
}

fetchUsersAndPosts();
```

## Project Structure

The project follows a modular structure to organize source code, configuration, and tests effectively.

```
/project-root
├── /src
│   ├── /services                  # Contains the API client and service functions
│   │   ├── apiClient.ts           # Main API client function for making requests
│   │   └── userService.ts         # User-related API requests
│   ├── /types                     # TypeScript type definitions and interfaces
│   └── /tests                     # Unit and integration tests
├── README.md                      # Project documentation
├── tsconfig.json                  # TypeScript configuration file
└── package.json                   # Project metadata and dependencies
```

### Explanation of Key Files

- **apiClient.ts**: Core API client function for sending HTTP requests with optional authentication support.
- **userService.ts**: Provides reusable functions for managing user-related API requests, including fetching, creating, updating, and deleting users.
- **tests**: Contains Jest or Postman test files to verify API client functionality.

## Testing

### Running Tests with Jest

The API client can be tested using Jest. Tests cover the `apiClient`, `fetchFilteredData`, and `fetchMultipleResources` functions to ensure they handle different API responses and errors correctly.

1. **Install Jest**:

   ```bash
   npm install --save-dev jest
   ```

2. **Run Tests**:
   ```bash
   npm test
   ```

### Running Tests with Postman and Newman

1. **Import Postman Collection**: Import the collection to Postman and set up any necessary environment variables.
2. **Run Tests with Newman**:
   ```bash
   newman run postman-collection.json -e postman-environment.json
   ```

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or want to add features, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make changes and commit with clear, concise commit messages.
4. Push your branch and open a pull request.
