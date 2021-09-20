import { instanceOf } from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const parseToArray = el => {
	if (!Array.isArray(el)) return [];
	return el;
};

export const parseToNumber = el => {
	if (Number.isNaN) {
		if (typeof el === 'string') {
			const number = Number(el);
			return number === 'NaN' ? 0 : number;
		}
		if (Array.isArray(el)) {
			return el.length;
		}
		if (typeof el === 'object') {
			return Object.keys(el).length;
		}
		if (typeof el === 'function') {
			const args = [];
			const f = el(...args);
			if (f !== undefined) {
				return parseToNumber(f);
			}
			return 0;
		}
		if (el === null || el === undefined) {
			return 0;
		}
	}
	return el;
};
