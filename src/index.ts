enum EJwtTransform {
	ENC = 'encrypt',
	DEC = 'decrypt'
}

export class JwtTransform {
	private static alphabet: string = 'abcdefghijklmnopqrstuvwxyz'
	private static alphacount: number = JwtTransform.alphabet.length
	private static lca: string = JwtTransform.alphabet.toLowerCase()
	private static uca: string = JwtTransform.alphabet.toUpperCase()
	private static secretKeyCache: { [key: string]: string } = {}

	private static validate(secretKey: string, token: string, rotate: number, rotateType: string): void {
		let tokenType: string = 'plainText'
		if (rotateType !== EJwtTransform.DEC) {
			tokenType = 'cipherText'
		}

		if (token.length <= 0) {
			throw new TypeError(`${tokenType} not to be a empty`)
		} else if (typeof token !== 'string') {
			throw new TypeError(`${tokenType} must be a string format`)
		} else if (token.split('.').length !== 3) {
			throw new TypeError(`${tokenType} must be a jwt format`)
		} else if (rotate <= 0) {
			throw new TypeError('rotate not to be a empty')
		} else if (typeof rotate !== 'number') {
			throw new TypeError('rotate must be a number format')
		} else if (secretKey.length <= 20) {
			throw new TypeError('secretKey length must be a greater than 20 characters')
		}
	}

	private static validSecretKey(secretKey: string, token: string, rotate: number, rotateType: EJwtTransform): boolean {
		JwtTransform.validate(secretKey, token, rotate, rotateType)

		let newToken: string = token
		if (rotateType === EJwtTransform.ENC || rotateType === EJwtTransform.DEC) {
			newToken = token
		}

		const validSecretKey: boolean = /[^A-Z0-9]/i.test(secretKey)
		if (validSecretKey) {
			throw new TypeError('secretKey invalid format')
		} else if (newToken.includes(secretKey)) {
			throw new TypeError('secretKey cannot use plainText')
		}

		return /^[a-zA-Z0-9]+$/i.test(secretKey)
	}

	private static rotation(secretKey: string, token: string, rotate: number, rotateType: EJwtTransform): string {
		const tokenArr: string[] = token.split('.')
		const firstToken: string = tokenArr[0]
		const middleToken: string = tokenArr[1]
		const lastToken: string = tokenArr[2]

		let mergeToken: string = ''
		if (rotateType === EJwtTransform.ENC) {
			mergeToken = `${firstToken}.${middleToken}${secretKey}.${lastToken}`
		} else {
			mergeToken = `${firstToken}.${middleToken}.${lastToken}`
		}

		let cleanupMergeToken: string = mergeToken.replace(/\s/g, '')
		if (rotateType === 'decrypt') {
			const encryptSecretKey: string = JwtTransform.getRotatedSecretKey(secretKey, Math.abs(rotate))

			if (!cleanupMergeToken.includes(encryptSecretKey)) {
				throw new Error('secretKey not match')
			}

			const validJwtToken: string = cleanupMergeToken.replace(new RegExp(encryptSecretKey, 'g'), '')
			cleanupMergeToken = validJwtToken
		}

		rotate %= JwtTransform.alphacount
		const text: string[] = Array.from(cleanupMergeToken)

		const transformedText: string[] = text.map((v: string) => {
			if (v >= 'a' && v <= 'z') {
				return JwtTransform.lca[(26 + (v.charCodeAt(0) - 'a'.charCodeAt(0)) + rotate) % JwtTransform.alphacount]
			} else if (v >= 'A' && v <= 'Z') {
				return JwtTransform.uca[(26 + (v.charCodeAt(0) - 'A'.charCodeAt(0)) + rotate) % JwtTransform.alphacount]
			} else {
				return v
			}
		})

		return transformedText.join('')
	}

	private static getRotatedSecretKey(secretKey: string, rotate: number): string {
		const cacheKey: string = `${secretKey}-${rotate}`
		if (JwtTransform.secretKeyCache[cacheKey]) {
			return JwtTransform.secretKeyCache[cacheKey]
		}

		const text: string[] = Array.from(secretKey)

		const rotatedText: string[] = text.map((v: string) => {
			if (v >= 'a' && v <= 'z') {
				return JwtTransform.lca[(26 + (v.charCodeAt(0) - 'a'.charCodeAt(0)) + rotate) % JwtTransform.alphacount]
			} else if (v >= 'A' && v <= 'Z') {
				return JwtTransform.uca[(26 + (v.charCodeAt(0) - 'A'.charCodeAt(0)) + rotate) % JwtTransform.alphacount]
			} else {
				return v
			}
		})

		const rotatedSecretKey: string = rotatedText.join('')
		JwtTransform.secretKeyCache[cacheKey] = rotatedSecretKey

		return rotatedSecretKey
	}

	static transform(secretKey: string, plainText: string, rotate: number): string {
		try {
			JwtTransform.validSecretKey(secretKey, plainText, rotate, EJwtTransform.DEC)
			return JwtTransform.rotation(secretKey, plainText, rotate, EJwtTransform.ENC)
		} catch (e: any) {
			throw new TypeError(e)
		}
	}

	static untransform(secretKey: string, cipherText: string, rotate: number): string {
		try {
			JwtTransform.validSecretKey(secretKey, cipherText, rotate, EJwtTransform.DEC)
			return JwtTransform.rotation(secretKey, cipherText, -rotate, EJwtTransform.DEC)
		} catch (e: any) {
			throw new TypeError(e)
		}
	}
}
