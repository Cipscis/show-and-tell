import {
	describe,
	expect,
	test,
} from '@jest/globals';

import { example } from './main';

describe('example', () => {
	test('adds two numbers', () => {
		expect(example(1, 2)).toBe(3);
	});
});
