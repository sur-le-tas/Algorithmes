import { ListeChainéeSimple, ListeChainéeDouble } from './liste-chainée'
import { Pile_ListeChainéeSimple } from './pile'
import { File_ListeChainéeSimple } from './file'

describe('Structures linéaires', () => {
	test('Liste chainée simple', () => {
		const liste = new ListeChainéeSimple<number>()

		expect(liste.vide).toBe(true)
		liste.ajoute(20)
		liste.ajoute(3)
		liste.ajoute(75)
		liste.ajoute(3)
		expect(liste.vide).toBe(false)
		expect(liste.taille).toBe(4)

		liste.transforme(valeur => valeur * 2)
		expect(liste.contient(40)).toBe(true)
		liste.supprime(6, true)
		expect(liste.taille).toBe(2)

		liste.ajoute(10)
		liste.ajouteFin(99)
		expect(liste.taille).toBe(4)

		expect(liste.regarde(3)).toBe(99)
		expect(liste.retire()).toBe(10)
		expect(liste.taille).toBe(3)

		expect(liste.visuel).toBe('150 → 40 → 99')
	})

	test('Liste chainée double', () => {
		const liste = new ListeChainéeDouble<number>()

		liste.ajoute(2)
		liste.ajouteFin(10)
		liste.ajoute(5)
		expect(liste.taille).toBe(3)

		expect(liste.regardeFin()).toBe(10)
		expect(liste.retire()).toBe(5)

		liste.ajouteFin(16)
		expect(liste.retireFin(1)).toBe(10)

		expect(liste.tableau).toEqual([2, 16])
	})

	test('Pile (stack)', () => {
		const pile = new Pile_ListeChainéeSimple<number>()

		expect(pile.vide).toBe(true)
		expect(pile.taille).toBe(0)

		pile.empile(6)
		pile.empile(5)
		pile.empile(10)

		expect(pile.dépile()).toBe(10)
		expect(pile.regarde()).toBe(5)
		expect(pile.taille).toBe(2)
	})

	test('File (queue)', () => {
		const file = new File_ListeChainéeSimple<number>()

		expect(file.vide).toBe(true)
		expect(file.taille).toBe(0)

		file.enfile(6)
		file.enfile(18)
		file.enfile(5)
		file.enfile(10)

		expect(file.défile()).toBe(6)
		expect(file.regarde()).toBe(18)
		expect(file.taille).toBe(3)
	})
})
