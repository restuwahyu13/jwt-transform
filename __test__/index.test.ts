import { NodeDiskStorage } from '../src/'

describe('Kraken Node Group Testing', function () {
	let nds

	beforeEach(() => {
		nds = new NodeDiskStorage()
	})

	it('Should be nds set is success', function () {
		expect(nds.set).toBeDefined()
		expect(nds.set('name', 'john doe')).toBeTruthy()
	})

	it('Should be nds set is value failed', function () {
		expect(nds.set).toBeDefined()
		expect(nds.set('name', Promise.resolve('john doe'))).toBeUndefined()
	})

	it('Should be nds set is key and value failed', function () {
		expect(nds.set).toBeDefined()
		expect(nds.set(Promise.resolve('name'), Promise.resolve('john doe'))).toBeUndefined()
	})

	it('Should be nds get is success', function () {
		expect(nds.get).toBeDefined()
		expect(nds.get('name')).toEqual('john doe')
	})

	it('Should be nds get value failed', function () {
		expect(nds.get).toBeDefined()
		expect(nds.get(Promise.resolve('name'))).toBeUndefined()
	})

	it('Should be nds get value undefined', function () {
		nds.clear()
		expect(nds.get).toBeDefined()
		expect(nds.get('name')).toBeUndefined()
	})

	it('Should be nds remove is success', function () {
		nds.set('name', 'john doe')
		expect(nds.remove).toBeDefined()
		expect(nds.remove('name')).toBeTruthy()
	})

	it('Should be nds remove is failed', function () {
		expect(nds.remove).toBeDefined()
		expect(nds.remove(Promise.resolve('name'))).toBeUndefined()
	})

	it('Should be nds remove value undefined', function () {
		nds.clear()
		expect(nds.remove).toBeDefined()
		expect(nds.remove('name')).toBeUndefined()
	})

	it('Should be nds clear is success', function () {
		nds.set('name', 'john doe')
		nds.set('age', 23)
		nds.set('hobby', 'swimming')

		expect(nds.clear).toBeDefined()
		expect(nds.clear()).toBeTruthy()
	})

	it('Should be nds clear is failed', function () {
		expect(nds.clear).toBeDefined()
		expect(nds.clear()).toBeUndefined()
	})

	it('Should be nds keys is success', function () {
		nds.set('name', 'john doe')
		nds.set('age', 23)

		expect(nds.keys).toBeDefined()
		expect(nds.keys()).toBeInstanceOf(Array)
		expect(nds.keys().length).toEqual(2)
		expect(nds.keys()).toStrictEqual(['name', 'age'])
	})

	it('Should be nds keys is failed', function () {
		nds.clear()
		expect(nds.keys).toBeDefined()
		expect(nds.keys()).toBeInstanceOf(Array)
		expect(nds.keys().length).toEqual(0)
		expect(nds.keys()).toStrictEqual([])
	})

	it('Should be nds set all value support success', function () {
		nds.clear()
		expect(nds.set).toBeDefined()
		expect(nds.set('name', 'john doe')).toBeTruthy()
		expect(nds.set('days', ['sunday', 'monday', 'thuesday', 'wenesday'])).toBeTruthy()
		expect(nds.set('profile', { name: 'john doe', age: 28, hobby: 'swimming' })).toBeTruthy()
		expect(nds.set('year', 2021)).toBeTruthy()
		expect(nds.set('active', true)).toBeTruthy()
	})

	it('Should be nds get all value support success', function () {
		expect(nds.get).toBeDefined()
		expect(nds.get('name')).toEqual('john doe')
		expect(nds.get('days')).toEqual(['sunday', 'monday', 'thuesday', 'wenesday'])
		expect(nds.get('profile')).toEqual({ name: 'john doe', age: 28, hobby: 'swimming' })
		expect(nds.get('year')).toEqual(2021)
		expect(nds.get('active')).toEqual(true)
	})
})
