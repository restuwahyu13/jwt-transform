import { encrypt, decrypt } from '../src'

describe('JWT Transform Group Testing', function () {
	let accessToken
	let resultEncrypt
	let resultDecrypt

	beforeEach(() => {
		accessToken =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
		resultEncrypt = encrypt(accessToken, 10)
		resultDecrypt = decrypt(resultEncrypt, 10)
	})

	it('Should be transform token is success', function () {
		expect(encrypt).toBeDefined()
		expect(decrypt).toBeDefined()
		expect(resultDecrypt).toStrictEqual(accessToken)
	})

	it('Should be transform token is failed', function () {
		expect(encrypt).toBeDefined()
		expect(decrypt).toBeDefined()
		expect(resultEncrypt).not.toStrictEqual(accessToken)
	})

	it('Should be encrypt transform token is error', function () {
		expect(encrypt).toBeDefined()
		expect(encrypt(undefined as any, undefined as any)).toBeInstanceOf(Promise)
	})

	it('Should be decrypt transform token is error', function () {
		expect(decrypt).toBeDefined()
		expect(decrypt(undefined as any, undefined as any)).toBeInstanceOf(Promise)
	})

	it('Should be decrypt transform token is not valid', function () {
		expect(encrypt).toBeDefined()
		expect(decrypt).toBeDefined()
		expect(encrypt('abcd', 10)).toBeInstanceOf(Promise)
		expect(decrypt('abcd', 10)).toBeInstanceOf(Promise)
	})

	it('Should be decrypt transform rotate is not valid', function () {
		expect(encrypt).toBeDefined()
		expect(decrypt).toBeDefined()
		expect(encrypt(accessToken, '10' as any)).toBeInstanceOf(Promise)
		expect(decrypt(resultEncrypt, '10' as any)).toBeInstanceOf(Promise)
		expect(resultEncrypt).not.toStrictEqual(accessToken)
		expect(resultDecrypt).toStrictEqual(resultDecrypt)
	})
})
