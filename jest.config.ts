// jest.config.ts
/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files using ts-jest
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"], // Treat TypeScript files as ES modules
};
