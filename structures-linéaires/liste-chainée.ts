//
// ────────────────────────────────────────────────────────────────────────────
//   :::::::: Liste chaînée (Linked list) ::::::::
// ────────────────────────────────────────────────────────────────────────────
// Collection linéaire d'éléments (appelées noeuds ou cellules) pointant vers des éléments voisins via un pointeur (simple référence).

//
// ═════════ Noeud ═════════
//
class Noeud<T> {
	valeur: T
	suivant?: Noeud<T> | undefined
	précédent?: Noeud<T> | undefined

	constructor(valeur: T, suivant?: Noeud<T>, précédent?: Noeud<T>) {
		this.valeur = valeur
		this.suivant = suivant
		this.précédent = précédent
	}
}

//
// ═════════ Liste chaînée simple ═════════
// tête(23)→ (17)→ (5)→ (68)→ ⊗
//
export class ListeChainéeSimple<T> {
	protected tête: Noeud<T> | undefined

	ajoute(valeur: T) {
		// Le noeud est d'abord créé en référençant la tête
		const nouveauNoeud = new Noeud(valeur)
		nouveauNoeud.suivant = this.tête
		// Puis le noeud devient la nouvelle tête
		this.tête = nouveauNoeud
	}

	ajouteFin(valeur: T) {
		if (this.tête === undefined) {
			this.ajoute(valeur)
		} else {
			const nouveauNoeud = new Noeud(valeur)
			let actuel = this.tête

			// Traverse toute la liste pour ajouter à la fin
			while (actuel.suivant !== undefined) {
				actuel = actuel.suivant
			}
			actuel.suivant = nouveauNoeud
		}
	}

	contient(valeur: T): boolean {
		let actuel = this.tête

		while (actuel !== undefined) {
			if (actuel.valeur === valeur) return true
			actuel = actuel.suivant
		}

		return false
	}

	supprime(valeur: T, toutes?: boolean) {
		let actuel = this.tête
		// Conserve la référence au précédent pour rattacher les pointeurs lors de la suppression
		let précédent: Noeud<T> | undefined

		while (actuel !== undefined) {
			// Suppression des noeuds avec la valeur
			if (actuel.valeur === valeur) {
				if (précédent === undefined) {
					// La tête contient la valeur à supprimer: on remplace donc la tête par le noeud suivant
					this.tête = actuel.suivant
				} else {
					// On attache le pointeur du noeud précédent au noeud suivant en sautant le noeud actuel
					précédent.suivant = actuel.suivant
				}

				if (!toutes) break
			}

			précédent = actuel
			actuel = actuel.suivant
		}
	}

	regarde(position?: number): T | undefined {
		let actuel = this.tête
		let compteur = 0

		if (actuel === undefined) return undefined

		// Retourne tête si position non spécifiée
		if (!position) return actuel.valeur

		while (actuel !== undefined) {
			if (compteur === position) return actuel.valeur

			actuel = actuel.suivant
			compteur++
		}

		// Si position > taille
		return undefined
	}

	retire(position?: number): T | undefined {
		let actuel = this.tête
		let précédent: Noeud<T> | undefined
		let compteur = 0

		if (actuel === undefined) return undefined

		// Récupère tête si position non spécifiée
		if (!position) {
			const valeur = actuel.valeur
			this.tête = actuel.suivant
			return valeur
		}

		while (actuel !== undefined) {
			if (compteur === position) {
				const valeur = actuel.valeur

				// Rattache les pointeurs correctement pour supprimer le noeud récupéré
				if (précédent === undefined) {
					this.tête = actuel.suivant
				} else {
					précédent.suivant = actuel.suivant
				}

				return valeur
			}

			précédent = actuel
			actuel = actuel.suivant
			compteur++
		}

		// Si position > taille
		return undefined
	}

	transforme(fn: (valeur: T) => T) {
		let actuel = this.tête

		while (actuel !== undefined) {
			actuel.valeur = fn(actuel.valeur)
			actuel = actuel.suivant
		}
	}

	get taille(): number {
		// On peut conserver la taille dans une propriété maintenue à jour pour de meilleures performances,
		// ce qui serait préférable dans une application réelle.
		let actuel = this.tête
		let compteur = 0

		while (actuel !== undefined) {
			actuel = actuel.suivant
			compteur++
		}

		return compteur
	}

	get vide(): boolean {
		return this.tête === undefined
	}

	get tableau(): T[] {
		let actuel = this.tête
		const valeurs: T[] = []

		while (actuel !== undefined) {
			valeurs.push(actuel.valeur)
			actuel = actuel.suivant
		}

		return valeurs
	}

	get visuel(): string {
		return this.tableau.join(' → ')
	}
}

//
// ═════════ Liste chaînée double ═════════
// tête(23)→ ←(17)→ ←(5)→ ←(68)queue
//
export class ListeChainéeDouble<T> extends ListeChainéeSimple<T> {
	protected tête: Noeud<T> | undefined
	protected queue: Noeud<T> | undefined

	ajoute(valeur: T) {
		const nouveauNoeud = new Noeud(valeur)

		if (this.tête === undefined || this.queue === undefined) {
			this.tête = this.queue = nouveauNoeud
		} else {
			nouveauNoeud.suivant = this.tête
			this.tête.précédent = nouveauNoeud
			this.tête = nouveauNoeud
		}
	}

	ajouteFin(valeur: T) {
		const nouveauNoeud = new Noeud(valeur)

		if (this.tête === undefined || this.queue === undefined) {
			this.tête = this.queue = nouveauNoeud
		} else {
			nouveauNoeud.précédent = this.queue
			this.queue.suivant = nouveauNoeud
			this.queue = nouveauNoeud
		}
	}

	contient(valeur: T): boolean {
		return super.contient(valeur)
	}

	supprime(valeur: T, toutes?: boolean) {
		let actuel = this.tête

		while (actuel !== undefined) {
			if (actuel.valeur === valeur) {
				if (actuel.précédent === undefined && actuel.suivant === undefined) {
					// Il s'agit à la fois de la tête et de la queue (un seul noeud), je reset les deux bouts
					this.tête = this.queue = undefined
				} else if (actuel.précédent === undefined) {
					// Il s'agit de la tête, je déplace le pointeur d'un cran vers le suivant
					this.tête = actuel.suivant
				} else if (actuel.suivant === undefined) {
					// Il s'agit de la queue, je déplace le pointeur d'un cran vers le précédent
					this.queue = actuel.précédent
				} else {
					// Au milieu, je déplace les pointeurs d'un cran dans les deux sens
					actuel.précédent.suivant = actuel.suivant
					actuel.suivant.précédent = actuel.précédent
				}

				if (!toutes) break
			}

			actuel = actuel.suivant
		}
	}

	regarde(position?: number): T | undefined {
		let actuel = this.tête
		let compteur = 0

		if (actuel === undefined) return undefined

		// Retourne tête si position non spécifiée
		if (!position) return actuel.valeur

		while (actuel !== undefined) {
			if (compteur === position) return actuel.valeur

			actuel = actuel.suivant
			compteur++
		}

		// Si position > taille
		return undefined
	}

	regardeFin(position?: number): T | undefined {
		let actuel = this.queue
		let compteur = 0

		if (actuel === undefined) return undefined

		// Retourne queue si position non spécifiée
		if (!position) return actuel.valeur

		while (actuel !== undefined) {
			if (compteur === position) return actuel.valeur

			actuel = actuel.précédent
			compteur++
		}

		// Si position > taille
		return undefined
	}

	retire(position?: number): T | undefined {
		let actuel = this.tête
		let compteur = 0

		if (actuel === undefined) return undefined

		// Récupère tête si position non spécifiée
		if (!position) {
			const valeur = actuel.valeur
			// Si c'est le seul noeud je reset la queue aussi
			this.tête = actuel.suivant === undefined ? (this.queue = undefined) : actuel.suivant
			return valeur
		}

		while (actuel !== undefined) {
			if (compteur === position) {
				const valeur = actuel.valeur

				// Je décale le pointeur d'un cran
				if (actuel.suivant === undefined) {
					// Je suis à la queue
					this.queue = actuel.précédent
				} else {
					// Je suis au milieu
					actuel.suivant.précédent = actuel.précédent
				}

				return valeur
			}

			actuel = actuel.suivant
			compteur++
		}

		// Si position > taille
		return undefined
	}

	retireFin(position?: number): T | undefined {
		let actuel = this.queue
		let compteur = 0

		if (actuel === undefined) return undefined

		// Récupère queue si position non spécifiée
		if (!position) {
			const valeur = actuel.valeur
			// Si c'est le seul noeud je reset la tête aussi
			this.queue = actuel.précédent === undefined ? (this.tête = undefined) : actuel.précédent
			return valeur
		}

		while (actuel !== undefined) {
			if (compteur === position) {
				const valeur = actuel.valeur

				// Je décale le pointeur d'un cran
				if (actuel.précédent === undefined) {
					// Je suis à la tête
					this.tête = actuel.suivant
				} else {
					// Je suis au milieu
					actuel.précédent.suivant = actuel.suivant
				}

				return valeur
			}

			actuel = actuel.précédent
			compteur++
		}

		// Si position > taille
		return undefined
	}

	transforme(fn: (valeur: T) => T) {
		super.transforme(fn)
	}

	get taille(): number {
		return super.taille
	}

	get vide(): boolean {
		return this.tête === undefined && this.queue === undefined
	}

	get tableau(): T[] {
		return super.tableau
	}

	get visuel(): string {
		return this.tableau.join(' ↔ ')
	}
}
