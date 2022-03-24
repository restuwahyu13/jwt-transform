import { assert } from 'is-any-type'
import { JWtTransformError } from './error'

const isValidJwt = (jwtToken: string, category: string): boolean => {
	try {
		if (!assert.isString(jwtToken) || assert.isUndefined(process.version as any)) return false

		const jwtValidToken: string[] = jwtToken.split('.')
		if (jwtValidToken.length !== 3) return false

		if (category === 'encrypt') {
			JSON.parse(Buffer.from(jwtValidToken[0], 'base64').toString())
			JSON.parse(Buffer.from(jwtValidToken[1], 'base64').toString())
			return true
		} else {
			const pattern: boolean = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/gi.test(jwtToken)
			return pattern
		}
	} catch (e) {
		return false
	}
}

export const validator = (token: string, rotate: number, category: string): boolean | Promise<any> => {
	let error: any
	if (assert.isUndefined(token as any)) {
		error = typeof window != 'undefined' ? new Error('token is required') : new JWtTransformError('token is required')
		return Promise.reject(error)
	} else if (assert.isUndefined(rotate as any)) {
		error = typeof window != 'undefined' ? new Error('rotate is required') : new JWtTransformError('rotate is required')
		return Promise.reject(error)
	} else if (!isValidJwt(token, category)) {
		error =
			typeof window != 'undefined' ? new Error('token must be jwt format') : new JWtTransformError('token must be jwt format')
		return Promise.reject(error)
	} else if (!assert.isNumber(rotate as any)) {
		error =
			typeof window != 'undefined'
				? new Error('rotate must be number format')
				: new JWtTransformError('rotate must be number format')
		return Promise.reject(error)
	} else {
		return true
	}
}
