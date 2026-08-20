import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  clearMocks: true,
  testEnvironment: 'node',
};

export default createJestConfig(config);