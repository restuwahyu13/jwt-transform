import { assert } from 'is-any-type'

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
	try {
		if (assert.isUndefined(token as any)) {
			throw new Error('token is required')
		} else if (assert.isUndefined(rotate as any)) {
			throw new Error('rotate is required')
		} else if (!isValidJwt(token, category)) {
			throw new Error('token must be jwt format')
		} else if (!assert.isNumber(rotate as any)) {
			throw new Error('rotate must be number format')
		} else {
			return true
		}
	} catch (e: any) {
		return Promise.reject(e.message)
	}
}
