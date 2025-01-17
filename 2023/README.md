# ECMAScript 2023, the 14th edition

En 2023, JavaScript a introduit des fonctionnalités majeures qui enrichissent encore davantage les capacités du langage.

Ces nouveautés ont été standardisées par le TC39 ([source officielle](https://tc39.es/ecma262/)).

## 1. Nouvelles méthodes sur Array et TypedArray

Méthodes introduites :

- `toSorted`: Retourne une copie triée de l'array sans modifier l'original.
- `toReversed`: Retourne une copie inversée de l'array sans modifier l'original.
- `toSpliced`: Retourne une copie modifiée selon les règles du splicing.
- `findLast`: Trouve le dernier élément correspondant à une condition.
- `findLastIndex`: Trouve l'index du dernier élément correspondant à une condition.

Pourquoi est-ce utile ?

1. **Non-destructif** : Ces méthodes préservent les données d'origine.
2. **Flexibilité accrue** : Permettent des manipulations sans affecter les structures initiales.

Exemple :

```javascript
const arr = [1, 2, 3, 4, 5];

console.log(arr.toSorted((a, b) => b - a)); // [5, 4, 3, 2, 1]
console.log(arr.toReversed()); // [5, 4, 3, 2, 1]
console.log(arr.findLast((x) => x % 2 === 0)); // 4
console.log(arr.findLastIndex((x) => x % 2 === 0)); // 3
```

---

## 2. Support des commentaires `#!`

Il est désormais possible d'utiliser des commentaires `#!` au début des fichiers JavaScript. Cela est particulièrement utile pour les fichiers exécutables.

Pourquoi est-ce utile ?

1. **Interopérabilité** : Permet de spécifier des interpréteurs ou des environnements d'exécution.
2. **Pratique** : Simplifie l'écriture de scripts exécutables.

Exemple :

```javascript
#! /usr/bin/env node
console.log("Hello, world!");
```

---

## 3. Symboles comme clés dans les collections faibles

La plupart des symboles peuvent maintenant être utilisés comme clés dans les WeakMap et WeakSet.

Pourquoi est-ce important ?

1. **Nouveaux cas d'utilisation** : Étend les possibilités de ces collections pour inclure des clés symboliques.
2. **Interopérabilité améliorée** : Prend en charge les symboles natifs et personnalisés.

Exemple :

```javascript
const sym = Symbol("key");
const weakMap = new WeakMap();
const obj = {};

weakMap.set(obj, sym);
console.log(weakMap.get(obj)); // Symbol(key)
```

---
