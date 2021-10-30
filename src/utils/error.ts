/**
 * Custom error handling jwt transform
 */

export class JWtTransformError extends Error {
	public name: string
	public message: string

	constructor(message: string) {
		super(message)
		this.name = this.constructor.name
		this.message = message
		Error.captureStackTrace(this, this.constructor)
	}
}
