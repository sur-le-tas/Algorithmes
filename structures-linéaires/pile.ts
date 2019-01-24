import { ListeChainéeSimple } from './liste-chainée'

//
// ────────────────────────────────────────────────────────────────────────────
//   :::::::: Pile (Stack) ::::::::
// ────────────────────────────────────────────────────────────────────────────
// Dernier entré, premier sorti (LIFO)
//
// La stack fournit un ordre basé sur le temps dans la collection.
// L'âge d'un élément augmente au fur et à mesure qu'on s'approche de la base.
// Un des aspects les plus utiles est que l'ordre d'insertion est l'inverse de l'ordre de retrait :
// Donne ainsi la possibilité d'inverser l'ordre des éléments.

//
// ═════════ Pile implémentée via simple tableau JS ═════════
//
export class Pile<T> {
	private éléments: T[] = []

	// push
	empile(élément: T) {
		this.éléments.push(élément)
	}

	// pop
	dépile(): T | undefined {
		return this.éléments.pop()
	}

	// peek
	regarde(): T | undefined {
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
// ═════════ Pile implémentée via liste chaînée simple ═════════
//
export class Pile_ListeChainéeSimple<T> {
	private éléments = new ListeChainéeSimple<T>()

	// push
	empile(élément: T) {
		this.éléments.ajoute(élément)
	}

	// pop
	dépile(): T | undefined {
		return this.éléments.retire()
	}

	// peek
	regarde(): T | undefined {
		return this.éléments.regarde()
	}

	get taille(): number {
		return this.éléments.taille
	}

	get vide(): boolean {
		return this.éléments.vide
	}
}
