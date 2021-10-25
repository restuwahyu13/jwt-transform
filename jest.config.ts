import { Config } from '@jest/types'

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'js'],
	testMatch: ['<rootDir>/test/**/*.{test.ts, spec.ts}', '<rootDir>/__test__/**/*.{test.ts, spec.ts}'],
	collectCoverageFrom: ['src/**/*'],
	testPathIgnorePatterns: ['node_modules/', 'dist/', 'esm', 'tsconfig.json', 'coverage/', '.github'],
	coveragePathIgnorePatterns: ['node_modules/', 'dist/', 'esm/', 'tsconfig.json', 'coverage/', '.github', 'images']
}

export default config
