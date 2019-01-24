import { Tas } from './tas'

test('Tas Min', () => {
	const tasMin = new Tas<number>('min')

	tasMin.ajoute(9)
	tasMin.ajoute(6)
	tasMin.ajoute(8)
	tasMin.ajoute(2)
	tasMin.ajoute(5)

	expect(tasMin.regarde()).toBe(2)
	expect(tasMin.extrait()).toBe(2)
	expect(tasMin.extrait()).toBe(5)
	expect(tasMin.extrait()).toBe(6)
	expect(tasMin.extrait()).toBe(8)
	expect(tasMin.extrait()).toBe(9)
	expect(tasMin.taille).toBe(0)
})

test('Tas Max', () => {
	const tasMax = new Tas<number>('max')

	tasMax.ajoute(70)
	tasMax.ajoute(100)
	tasMax.ajoute(1)
	tasMax.ajoute(82)
	tasMax.ajoute(12)
	tasMax.ajoute(55)
	tasMax.ajoute(33)

	expect(tasMax.taille).toBe(7)
	expect(tasMax.extrait()).toBe(100)
	expect(tasMax.extrait()).toBe(82)
	expect(tasMax.extrait()).toBe(70)
	expect(tasMax.taille).toBe(4)
	expect(tasMax.extrait()).toBe(55)
	expect(tasMax.extrait()).toBe(33)
	expect(tasMax.extrait()).toBe(12)
	expect(tasMax.extrait()).toBe(1)
	expect(tasMax.taille).toBe(0)
})
