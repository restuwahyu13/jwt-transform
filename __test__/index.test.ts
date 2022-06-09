import { encrypt, decrypt } from '../dist'

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
})
