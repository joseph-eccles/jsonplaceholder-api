// Mock node-fetch module
jest.mock("node-fetch", () => ({
  __esModule: true,
  default: jest.fn(), // Mock the default export
}));

import fetch, { Response } from "node-fetch"; // Import fetch and Response
import { apiClient } from "../services/apiClient";

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("apiClient", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock between tests to prevent interference
  });

  it("should make a successful API call and return data", async () => {
    const mockData = {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    };

    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as unknown as Response);

    const data = await apiClient("/users/1");

    expect(data).toEqual(mockData);
  });

  it("should throw an error for a failed API call", async () => {
    mockedFetch.mockResolvedValue({
      ok: false,
      status: 404,
    } as unknown as Response);

    await expect(apiClient("/invalid-endpoint")).rejects.toThrow(
      "HTTP error! Status: 404",
    );
  });

  it("should include the authorization header when authToken is provided", async () => {
    const mockData = {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
    };
    const authToken = "test-token";

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as unknown as Response);

    const data = await apiClient("/users/2", {}, authToken);

    expect(data).toEqual(mockData);
  });

  it("should not include the authorization header when authToken is not provided", async () => {
    const mockData = {
      id: 3,
      name: "Clementine Bauch",
      username: "Samantha",
      email: "Nathan@yesenia.net",
      address: {
        street: "Douglas Extension",
        suite: "Suite 847",
        city: "McKenziehaven",
        zipcode: "59590-4157",
        geo: {
          lat: "-68.6102",
          lng: "-47.0653",
        },
      },
      phone: "1-463-123-4447",
      website: "ramiro.info",
      company: {
        name: "Romaguera-Jacobson",
        catchPhrase: "Face to face bifurcated interface",
        bs: "e-enable strategic applications",
      },
    };

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as unknown as Response);

    const data = await apiClient("/users/3");

    expect(data).toEqual(mockData);
  });
});
