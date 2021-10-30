/**
 * jwt-transform
 * @author Copyright(c) 2021 by Restu wahyu saputra
 * MIT Licensed
 */

import { assert } from 'is-any-type'
import { validator } from './utils/validator'

let alphabet: string = 'abcdefghijklmnopqrstuvwxyz'
let lc: string[] = alphabet.replace(/\s/g, '').toLowerCase().split('')
let uc: string[] = alphabet.replace(/\s/g, '').toUpperCase().split('')

/**
 * encrypt jwt token using caesar cipher cryptography from real jwt token into fake jwt token
 *
 * @param {  String } token
 * @param {  Number } rotate
 * @return { String | Promise } string | promise
 */

export function encrypt(token: string, rotate: number): string | Promise<any> {
	const isValidator: any = validator(token, rotate, 'encrypt')

	if (assert.isPromise(isValidator as any)) {
		return isValidator
	} else {
		return Array.from(token)
			.map((v: string): string => {
				if (lc.indexOf(v.toLowerCase()) === -1 || uc.indexOf(v.toUpperCase()) === -1) return v

				const lcEncryptIndex: number = (lc.indexOf(v.toLowerCase()) + rotate) % alphabet.length
				const lcEncryptedChar: string = lc[lcEncryptIndex]

				const ucEncryptIndex: number = (uc.indexOf(v.toUpperCase()) + rotate) % alphabet.length
				const ucEncryptedChar: string = uc[ucEncryptIndex]

				return lc.indexOf(v) !== -1 ? lcEncryptedChar : ucEncryptedChar
			})
			.join('')
	}
}

/**
 * decrypt jwt token using caesar cipher cryptography from fake jwt token into real jwt token
 *
 * @param {  String } token
 * @param {  Number } rotate
 * @return { String | Promise } string | promise
 */

export function decrypt(token: string, rotate: number): string | Promise<any> {
	const isValidator: any = validator(token, rotate, 'decrypt')

	if (assert.isPromise(isValidator as any)) {
		return isValidator
	} else {
		return Array.from(token)
			.map((v: string): string => {
				if (lc.indexOf(v.toLowerCase()) === -1 || uc.indexOf(v.toUpperCase()) === -1) return v

				let lcEncryptIndex: number = (lc.indexOf(v.toLowerCase()) - rotate) % alphabet.length
				lcEncryptIndex = lcEncryptIndex < 0 ? lcEncryptIndex + alphabet.length : lcEncryptIndex
				const lcEncryptedChar: string = lc[lcEncryptIndex]

				let ucEncryptIndex: number = (uc.indexOf(v.toUpperCase()) - rotate) % alphabet.length
				ucEncryptIndex = ucEncryptIndex < 0 ? ucEncryptIndex + alphabet.length : ucEncryptIndex
				const ucEncryptedChar: string = uc[ucEncryptIndex]

				return lc.indexOf(v) !== -1 ? lcEncryptedChar : ucEncryptedChar
			})
			.join('')
	}
}
