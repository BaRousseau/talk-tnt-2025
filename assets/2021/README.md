# ECMAScript 2021, the 12th edition

En 2021, JavaScript a continué d'évoluer avec l'ajout de fonctionnalités qui améliorent la convivialité, la précision, et les performances du langage.

Ces nouveautés ont été standardisées par le TC39 ([source officielle](https://tc39.es/ecma262/)).

## 1. `replaceAll`

La méthode `replaceAll` permet de remplacer toutes les occurrences d'une sous-chaîne dans une chaîne donnée.

Pourquoi est-ce utile ?

1. **Concision** : Simplifie le remplacement global sans avoir à utiliser des expressions régulières avec le drapeau `g`.
2. **Lisibilité** : Rend le code plus clair et accessible.

Exemple :

```javascript
const str = "abc abc abc";
console.log(str.replaceAll("abc", "123")); // "123 123 123"
```

---

## 2. `Promise.any`

`Promise.any` renvoie la première promesse résolue parmi un ensemble de promesses. Si toutes les promesses sont rejetées, elle renvoie un `AggregateError`.

Pourquoi est-ce utile ?

1. **Résultat rapide** : Permet de récupérer le premier succès parmi plusieurs opérations asynchrones.
2. **Tolérance aux échecs** : Ne s'arrête pas en cas de rejet de certaines promesses.

Exemple :

```javascript
const promises = [
  Promise.reject("Error"),
  Promise.resolve("Success"),
  Promise.resolve("Another success"),
];

Promise.any(promises)
  .then((result) => {
    console.log(result); // "Success"
  })
  .catch((error) => {
    console.error(error);
  });
```

---

## 3. `AggregateError`

`AggregateError` est un nouveau type d'erreur qui représente plusieurs erreurs en même temps, souvent utilisé avec `Promise.any`.

Pourquoi est-ce utile ?

1. **Regroupement des erreurs** : Fournit une vue d'ensemble des échecs multiples.
2. **Interopérabilité** : Facilite la gestion des erreurs complexes.

Exemple :

```javascript
try {
  throw new AggregateError(
    [new Error("First error"), new Error("Second error")],
    "Multiple errors occurred"
  );
} catch (error) {
  console.log(error.message); // "Multiple errors occurred"
  console.log(error.errors); // [Error: First error, Error: Second error]
}
```

---

## 4. Opérateurs d'affectation logique

Les opérateurs `??=`, `&&=`, et `||=` combinent des affectations et des opérations logiques.

Pourquoi est-ce utile ?

1. **Concision** : Réduit le besoin d'écrire des expressions conditionnelles explicites.
2. **Clarté** : Rend le code plus intuitif.

Exemple :

```javascript
let a = null;
a ??= 42;
console.log(a); // 42

let b = true;
b &&= false;
console.log(b); // false

let c = false;
c ||= true;
console.log(c); // true
```

---

## 5. `WeakRef` et `FinalizationRegistry`

`WeakRef` permet de maintenir une référence faible à un objet, sans empêcher sa collecte par le garbage collector. `FinalizationRegistry` permet de définir des opérations à exécuter lorsque des objets sont collectés.

Pourquoi est-ce important ?

1. **Gestion mémoire avancée** : Facilite le développement d'outils nécessitant un suivi ou un nettoyage mémoire.
2. **Interopérabilité** : Idéal pour des cas comme les caches ou les wrappers.

Exemple :

```javascript
let target = { key: "value" };
const weakRef = new WeakRef(target);

console.log(weakRef.deref()); // { key: "value" }

target = null; // L'objet peut être collecté

const registry = new FinalizationRegistry((heldValue) => {
  console.log(`Object with value ${heldValue} was garbage collected.`);
});

registry.register(weakRef, "someValue");
```

---

## 6. Séparateurs pour les littéraux numériques

Les séparateurs `_` peuvent être utilisés dans les nombres pour les rendre plus lisibles.

Pourquoi est-ce utile ?

1. **Lisibilité** : Facilite la lecture des grands nombres ou des valeurs hexadécimales.
2. **Clarté** : Améliore la compréhension immédiate des valeurs numériques.

Exemple :

```javascript
const largeNumber = 1_000_000;
console.log(largeNumber); // 1000000

const hexNumber = 0xff_ff_ff;
console.log(hexNumber); // 16777215
```

---

## 7. Précision de `Array.prototype.sort`

La méthode `Array.prototype.sort` a été améliorée pour réduire les cas où l'ordre de tri était défini par l'implémentation.

Pourquoi est-ce important ?

1. **Prédictibilité** : Garantit un comportement cohérent entre différents moteurs JavaScript.
2. **Confiance** : Facilite l'écriture de tests et de comportements reproductibles.

Exemple :

```javascript
const arr = ["c", "b", "a"];
arr.sort();
console.log(arr); // ["a", "b", "c"]
```

---
