//
// ────────────────────────────────────────────────────────────────────────────
//   :::::::: Tas (Heap) ::::::::
// ────────────────────────────────────────────────────────────────────────────
// https://en.wikipedia.org/wiki/Heap_(data_structure)
// https://bradfieldcs.com/algos/trees/priority-queues-with-binary-heaps/
//
// Implémenté via un tableau.
// Les enfants de chaque parent sont plus petits (= max-heap, car la racine est alors la valeur maximum)
// ou plus grands(= min-heap, car la racine est alors la valeur minimum) que le parent lui-même.
//
// Exemple Max-Heap
// noeuds: |9|6|8|2|5|  ou  |9|8|5|2|6|
// index :  0 1 2 3 4        0 1 2 3 4
//
//          9                     9
//        /  \                  /  \
//       6    8                8    5
//     /  \                  /  \
//    2    5                2    6
//
// Maintient la donnée de manière semi-ordonnée.
// Bon compromis entre le coût de maintenir un ordre complet et celui de chercher dans le désordre.
//
// Donne un accès immédiat (O(1)) au plus gros ou plus petit élément,
// et à la modification rééquilibre la structure rapidement(O(log N)),
// ce qui permet de connaître rapidement le plus gros(ou plus petit) élément suivant un évènement.
//
// Sa principale utilisation est donc une file prioritaire (Priority Queue).

export class Tas<T = number> {
	private conteneur: T[] = []
	private compare: (a: T, b: T) => 1 | -1 | 0

	constructor(type: 'min' | 'max') {
		// TODO: comparateurs pour autre que des nombres

		if (type === 'min') {
			this.compare = (a, b) => {
				if (a < b) return -1
				if (a > b) return 1
				return 0
			}
		}

		if (type === 'max') {
			this.compare = (a, b) => {
				if (a < b) return 1
				if (a > b) return -1
				return 0
			}
		}
	}

	get taille(): number {
		return this.conteneur.length
	}

	ajoute(élément: T) {
		this.conteneur.push(élément)
		this.trieVersLeHaut(this.conteneur.length - 1)
	}

	regarde(): T | undefined {
		return this.conteneur[0]
	}

	/**
	 * Récupère la racine, et la remplace par le dernier élément du tableau
	 * qui est ensuite trié vers le bas pour rééquilibrer le tas.
	 */
	extrait(): T | undefined {
		if (this.conteneur.length === 0) return
		if (this.conteneur.length === 1) return this.conteneur.pop()

		const racine = this.conteneur[0]
		this.conteneur[0] = this.conteneur.pop()!
		this.trieVersLeBas(0)

		return racine
	}

	/**
	 * Inverse noeud avec son parent tant que ce dernier est plus grand
	 * (ou plus petit selon le type de tas),
	 * et le fait ainsi remonter vers la racine jusqu'à trouver sa place.
	 */
	private trieVersLeHaut(indexEnfant: number) {
		let indexParent = this.indexParent(indexEnfant)

		while (indexEnfant > 0 && this.compare(this.conteneur[indexParent], this.conteneur[indexEnfant]) > 0) {
			// Inversion
			;[this.conteneur[indexParent], this.conteneur[indexEnfant]] = [
				this.conteneur[indexEnfant],
				this.conteneur[indexParent],
			]

			indexEnfant = indexParent

			indexParent = this.indexParent(indexEnfant)
		}
	}

	/**
	 * Inverse noeud parent avec l'enfant le plus petit dans le cas d'un min-heap
	 * (le plus grand dans le cas d'un max-heap),
	 * et le fait ainsi descendre dans le tas jusqu'à trouver sa place.
	 */
	private trieVersLeBas(indexParent: number) {
		let indexSuivant = this.indexEnfantSuivant(indexParent)

		while (indexSuivant != null && this.compare(this.conteneur[indexParent], this.conteneur[indexSuivant]) > 0) {
			// Inversion
			;[this.conteneur[indexSuivant], this.conteneur[indexParent]] = [
				this.conteneur[indexParent],
				this.conteneur[indexSuivant],
			]

			indexParent = indexSuivant

			indexSuivant = this.indexEnfantSuivant(indexParent)
		}
	}

	private indexEnfantSuivant(indexParent: number) {
		const indexEnfantGauche = this.indexEnfantGauche(indexParent)
		const indexEnfantDroit = this.indexEnfantDroit(indexParent)

		// Si un des deux (ou les deux) enfants n'existent pas (on est hors du tableau),
		// pas de comparaison à faire.
		if (indexEnfantDroit >= this.conteneur.length) {
			if (indexEnfantGauche >= this.conteneur.length) return null
			return indexEnfantGauche
		}

		// Compare et retourne le bon index selon le type de tas
		if (this.compare(this.conteneur[indexEnfantGauche], this.conteneur[indexEnfantDroit]) <= 0) {
			return indexEnfantGauche
		}
		return indexEnfantDroit
	}

	// Si la racine commence à l'index 1, on peut simplifier le calcul de la recherche enfant/parent :
	//                |  Racine à 0  |  Racine à 1
	// Enfant gauche  |    2i + 1    |     2i
	// Enfant droit   |    2i + 2    |   2i + 1
	// Parent         |   (i-1)/2    |    i/2

	private indexEnfantGauche(indexParent: number) {
		return 2 * indexParent + 1
	}

	private indexEnfantDroit(indexParent: number) {
		return 2 * indexParent + 2
	}

	private indexParent(indexEnfant: number) {
		return Math.floor((indexEnfant - 1) / 2)
	}
}
