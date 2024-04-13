import { JwtTransform } from '../dist'

describe('JWT Transform Group Testing', function () {
	it('Should be transform token is success', function () {
		const	secretKey = 'ptLDDOU5ejqqLjlk4CpSNxvwZVxQFRmF'
		const	accessToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

		const cipherTextOutput = 'kePnhMioUoPOAfO1ToOyOtX5iIO6OqvDBIP9.kePfjCOoUoOdSpS0TZE3UJqcOocohsLzFYO6OqvbgM4mXM9rOocogCL0OpudTZK2SpS5SJOelWvzRJJUA5kpwwRprq4IvYTdbcFBdWLXsL.YlrQdcXPYSkQQL2WZ4lcvSkPl36VUq6ePB_gjWyyc5i'

		const cipherText = JwtTransform.transform(secretKey, accessToken, secretKey.length)
		expect(cipherText).toStrictEqual(cipherTextOutput)
	})

	it('Should be untransform token is success', function () {
		const	secretKey = 'ptLDDOU5ejqqLjlk4CpSNxvwZVxQFRmF'
		const	accessToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

		const cipherText = JwtTransform.transform(secretKey, accessToken, secretKey.length)
		const plainText = JwtTransform.untransform(secretKey, cipherText, secretKey.length)

		expect(plainText).toStrictEqual(accessToken)
	})
})
