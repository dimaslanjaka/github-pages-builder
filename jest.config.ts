import { existsSync, mkdirSync } from 'fs';
import { defaults } from 'jest-config';
import path, { join } from 'path';
import type { JestConfigWithTsJest } from 'ts-jest';

/**
 * @see {@link https://jestjs.io/docs/configuration}
 * * how to run single test {@link https://stackoverflow.com/questions/28725955/how-do-i-test-a-single-file-using-jest}
 */
const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  verbose: true,
  cache: true,
  cacheDirectory: join(__dirname, 'tmp/jest'),
  collectCoverageFrom: [
    'src/*.{js,ts}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/test/**',
    '!**/*.test.{js,ts}',
    '!**/*.builder.ts',
    '!**/.deploy_git/**'
  ],
  roots: [`<rootDir>/test`],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/tmp/', '/test/'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js|jsx|mjs|cjs)',
    '**/?(*.)+(spec|test).+(ts|tsx|js|jsx|mjs|cjs)',
    '**/test/*.test.+(ts|js)',
    '!**/.deploy_git/**',
    '!**/fixtures/**',
    '!**/vendor/**',
    '!**/dist/**',
    '!**/node_modules/**'
  ],
  extensionsToTreatAsEsm: ['.ts', '.mts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        babelConfig: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { node: 'current' }
              }
            ],
            '@babel/preset-typescript'
          ]
        },
        useESM: true,
        tsconfig: path.join(__dirname, 'tsconfig.jest.json')
      }
    ],
    '^.+\\.(js|jsx|mjs)$': [
      'babel-jest',
      {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
      }
    ],
    '^.+\\.cjs$': [
      'babel-jest',
      {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
      }
    ]
  },
  // detectLeaks: true,
  // detectOpenHandles: true,
  clearMocks: true,
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: 'coverage/test-report.html'
      }
    ]
  ]
};

if (!existsSync(<string>config.cacheDirectory)) mkdirSync(<string>config.cacheDirectory, { recursive: true });

export default config;
