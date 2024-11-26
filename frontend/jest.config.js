module.exports = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'jsdom', // Use jsdom for browser-like testing environment
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS imports
    '^@mui/(.*)$': '<rootDir>/node_modules/@mui/$1', // Mock Material-UI imports if necessary
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',   // Add TypeScript transformation support
    '^.+\\.(js|jsx)$': 'babel-jest', // Handle JavaScript files with Babel
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@mui|some-other-library-to-transpile)/', // Transpile certain node_modules if necessary
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Optional setup file
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};
