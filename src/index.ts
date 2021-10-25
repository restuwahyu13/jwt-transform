/**
 * jwt-transform
 * @author Copyright(c) 2021 by Restu wahyu saputra
 * MIT Licensed
 */

import { assert } from 'is-any-type'

let alphabet: string = 'abcdefghijklmnopqrstuvwxyz'
let lc: string[] = alphabet.replace(/\s/g, '').toLowerCase().split('')
let uc: string[] = alphabet.replace(/\s/g, '').toUpperCase().split('')

/**
 * Encrypt real jwt token using caesar cipher cryptography to fake jwt token
 *
 * @param {  String | Array } text
 * @param {  Number | Array } rotate
 * @return { String | Promise } string | promise
 */

export function encrypt(text: string, rotate: number): string | Promise<Error> {
	if (!assert.isString(text)) {
		return Promise.reject(new Error('text must be string format'))
	} else if (!assert.isNumber(rotate)) {
		return Promise.reject(new Error('rotate must be number format'))
	} else {
		return Array.from(text)
			.map((v: string): string => {
				if (lc.indexOf(v.toLowerCase()) === -1 || uc.indexOf(v.toUpperCase()) === -1) {
					return v
				}

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
 * Decrypt fake jwt token using caesar cipher cryptography to real jwt token
 *
 * @param {  String | Array } text
 * @param {  Number | Array } rotate
 * @return { String | Promise } string | promise
 */

export function decrypt(text: string, rotate: number): string | Promise<Error> {
	if (!assert.isString(text)) {
		return Promise.reject(new Error('text must be string format'))
	} else if (!assert.isNumber(rotate)) {
		return Promise.reject(new Error('rotate must be number format'))
	} else {
		return Array.from(text)
			.map((v: string): string => {
				if (lc.indexOf(v.toLowerCase()) === -1 || uc.indexOf(v.toUpperCase()) === -1) {
					return v
				}

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
