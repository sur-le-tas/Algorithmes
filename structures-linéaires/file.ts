import { ListeChainéeSimple } from './liste-chainée'

//
// ────────────────────────────────────────────────────────────────────────────
//   :::::::: File (Queue) ::::::::
// ────────────────────────────────────────────────────────────────────────────
// Premier entré, premier sorti (FIFO)

//
// ═════════ File implémentée via simple tableau JS ═════════
//
export class File<T> {
	private éléments: T[] = []

	// enqueue
	enfile(élément: T) {
		this.éléments.push(élément)
	}

	// dequeue
	défile(): T | undefined {
		return this.éléments.shift()
	}

	// peek
	regarde(): T | undefined {
		return this.éléments[0]
	}

	get taille(): number {
		return this.éléments.length
	}

	get vide(): boolean {
		return this.éléments.length === 0
	}
}

//
// ═════════ File implémentée via liste chaînée simple ═════════
//
export class File_ListeChainéeSimple<T> {
	private éléments = new ListeChainéeSimple<T>()

	// enqueue
	enfile(élément: T) {
		this.éléments.ajouteFin(élément)
	}

	// dequeue
	défile(): T | undefined {
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
