# ECMAScript 2024, the 15th edition

En 2024, JavaScript a continué d'évoluer avec des ajouts significatifs qui renforcent sa flexibilité et ses capacités de traitement des données.

Ces nouveautés ont été standardisées par le TC39 ([source officielle](https://tc39.es/ecma262/)).

## 1. Redimensionnement et transfert des ArrayBuffers

JavaScript permet désormais de redimensionner et de transférer les `ArrayBuffer` et `SharedArrayBuffer`.

Pourquoi est-ce utile ?

1. **Optimisation de la mémoire** : Ajuste dynamiquement les tailles des tampons pour mieux utiliser les ressources.
2. **Interopérabilité** : Facilite les opérations dans des environnements de calcul intensif ou de manipulation binaire.

Exemple :

```javascript
const buffer = new ArrayBuffer(10);
const resizedBuffer = buffer.resize(20);
console.log(resizedBuffer.byteLength); // 20
```

---

## 2. Drapeau `/v` pour les expressions régulières

Le drapeau `/v` introduit des fonctionnalités avancées pour travailler avec des ensembles de chaînes dans les expressions régulières.

Pourquoi est-ce important ?

1. **Puissance accrue** : Simplifie la gestion de cas complexes dans les correspondances.
2. **Précision** : Offre des outils plus avancés pour manipuler les ensembles de chaînes.

Exemple :

```javascript
const regex = /[a-z]/v;
console.log(regex.test("abc")); // true
```

---

## 3. Méthode `Promise.withResolvers`

Cette méthode pratique facilite la création de promesses en exposant directement leurs résolveurs.

Pourquoi est-ce utile ?

1. **Lisibilité** : Réduit la complexité lors de la manipulation de promesses.
2. **Conception simplifiée** : Améliore la gestion asynchrone.

Exemple :

```javascript
const { promise, resolve, reject } = Promise.withResolvers();
resolve("Success");
promise.then(console.log); // "Success"
```

---

## 4. `Object.groupBy` et `Map.groupBy`

Ces méthodes permettent de regrouper des données en fonction d'une clé ou d'une fonction de regroupement.

Pourquoi est-ce important ?

1. **Agrégation de données simplifiée** : Réduit le besoin de boucles complexes.
2. **Lisibilité** : Rassemble les opérations de regroupement en une seule méthode.

Exemple :

```javascript
const data = ["apple", "banana", "cherry", "avocado"];
const grouped = Object.groupBy(data, (word) => word[0]);
console.log(grouped); // { a: ["apple", "avocado"], b: ["banana"], c: ["cherry"] }
```

---

## 5. `Atomics.waitAsync`

Cette méthode permet d'attendre de manière asynchrone les modifications apportées à la mémoire partagée.

Pourquoi est-ce utile ?

1. **Traitement asynchrone** : Offre des mécanismes plus fluides pour travailler avec des données partagées.
2. **Interopérabilité avec les threads** : Améliore la coordination entre les threads.

Exemple :

```javascript
const sharedArray = new Int32Array(new SharedArrayBuffer(4));
Atomics.store(sharedArray, 0, 0);

Atomics.waitAsync(sharedArray, 0, 0).value.then(() => {
  console.log("Memory updated!");
});
Atomics.store(sharedArray, 0, 1);
```

---

## 6. Méthodes `isWellFormed` et `toWellFormed` pour les chaînes

JavaScript introduit des outils pour vérifier et garantir que les chaînes contiennent uniquement des caractères Unicode bien formés.

Pourquoi est-ce important ?

1. **Compatibilité Unicode** : Améliore la gestion des chaînes dans des contextes multilingues.
2. **Fiabilité** : Réduit les erreurs liées à des données mal formées.

Exemple :

```javascript
const malformed = "\uD800"; // Demi-symbole non apparié
console.log(malformed.isWellFormed()); // false
console.log(malformed.toWellFormed()); // "\uFFFD" (remplace par un caractère de substitution)
```

---
