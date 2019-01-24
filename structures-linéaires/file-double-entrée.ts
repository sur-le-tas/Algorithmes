import { ListeChainéeDouble } from './liste-chainée'

//
// ────────────────────────────────────────────────────────────────────────────
//   :::::::: File à double entrée (Double-ended queue / Deque) ::::::::
// ────────────────────────────────────────────────────────────────────────────
// A les possibilités d'une file (queue) et d'une pile (stack).
// les tableaux JS, étant dynamiques, sont des files à double entrée.

//
// ═════════ File à double entrée implémentée via simple tableau JS ═════════
//
export class FileDoubleEntrée<T> {
	private éléments: T[] = []

	// push front
	empileDevant(élément: T) {
		this.éléments.unshift(élément)
	}

	// push back
	empileDerrière(élément: T) {
		this.éléments.push(élément)
	}

	// pop front
	dépileDevant(): T | undefined {
		return this.éléments.shift()
	}

	// pop back
	dépileDerrière(): T | undefined {
		return this.éléments.pop()
	}

	// peek front
	regardeDevant(): T | undefined {
		return this.éléments[0]
	}

	// peek back
	regardeDerrière(): T | undefined {
		return this.éléments[this.éléments.length - 1]
	}

	get taille(): number {
		return this.éléments.length
	}

	get vide(): boolean {
		return this.éléments.length === 0
	}
}

//
// ═════════ File à double entrée implémentée via liste chaînée double ═════════
//
export class FileDoubleEntrée_ListeChainéeDouble<T> {
	private éléments = new ListeChainéeDouble<T>()

	empileDevant(élément: T) {
		this.éléments.ajoute(élément)
	}

	// push back
	empileDerrière(élément: T) {
		this.éléments.ajouteFin(élément)
	}

	// pop front
	dépileDevant(): T | undefined {
		return this.éléments.retire()
	}

	// pop back
	dépileDerrière(): T | undefined {
		return this.éléments.retireFin()
	}

	// peek front
	regardeDevant(): T | undefined {
		return this.éléments.regarde()
	}

	// peek back
	regardeDerrière(): T | undefined {
		return this.éléments.regardeFin()
	}

	get taille(): number {
		return this.éléments.taille
	}

	get vide(): boolean {
		return this.éléments.vide
	}
}
