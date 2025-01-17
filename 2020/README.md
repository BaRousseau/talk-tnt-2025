# ECMAScript 2020, the 11th edition

En 2020, JavaScript a introduit plusieurs nouvelles fonctionnalités qui améliorent la syntaxe, les performances, et la convivialité du langage.

Ces fonctionnalités sont standardisées par le TC39 ([source officielle](https://tc39.es/ecma262/)).

## 1. `matchAll`

Cette méthode permet d'obtenir toutes les correspondances d'une expression régulière dans une chaîne, tout en fournissant des détails complets sur chaque correspondance, comme les groupes capturés.

Pourquoi est-ce utile ?

1. **Récupération complète des données** : Contrairement à `match`, qui ne retourne que les correspondances principales, `matchAll` inclut aussi les groupes capturés, ce qui est idéal pour des analyses complexes.
2. **Itérabilité** : Les résultats sont retournés sous forme d'un itérable, permettant une manipulation plus flexible avec des boucles ou des transformations.

Exemple :

```javascript
const regex = /t(e)(st(\d?))/g;
const str = "test1test2test3";
const matches = str.matchAll(regex);

for (const match of matches) {
  console.log(match);
}
```

---

## 2. `import()`

La syntaxe `import()` permet de charger des modules dynamiquement et de manière asynchrone. Cela est utile pour le code spliting ou le chargement conditionnel des modules.

Pourquoi est-ce une révolution ?

1. **Code Splitting** : Permet de charger uniquement les parties nécessaires d'une application, réduisant ainsi la taille initiale du bundle.
2. **Chargement conditionnel** : Les modules peuvent être importés en fonction des besoins ou des actions de l'utilisateur.
3. **Amélioration des performances** : Réduit le JavaScript exécuté au démarrage, accélérant le temps de chargement initial.
4. **Interopérabilité** : Facilite l'intégration de bibliothèques ou modules tiers uniquement au moment requis.

Exemple :

```javascript
import("./module.js")
  .then((module) => {
    module.doSomething();
  })
  .catch((error) => {
    console.error("Error loading module:", error);
  });
```

---

## 3. `BigInt`

`BigInt` est un nouveau type primitif qui permet de manipuler des nombres entiers très grands, au-delà de la limite des nombres classiques en JavaScript (2^53 - 1).

Pourquoi est-ce important ?

1. **Précision accrue** : Utile pour les applications nécessitant des calculs exacts avec de grands entiers (cryptographie, finance, etc.).
2. **Interopérabilité avec d'autres systèmes** : Certains systèmes externes nécessitent des entiers au-delà des capacités de `Number`.

Exemple :

```javascript
const bigInt = 1234567890123456789012345678901234567890n;
const anotherBigInt = BigInt("1234567890123456789012345678901234567890");

console.log(bigInt + 2n); // 1234567890123456789012345678901234567892n
```

---

## 4. `Promise.allSettled`

Cette méthode permet de traiter un tableau de promesses et renvoie les résultats de toutes, qu'elles soient résolues ou rejetées. Contrairement à `Promise.all`, elle n'arrête pas son exécution si une promesse est rejetée.

Pourquoi est-ce utile ?

1. **Tolérance aux erreurs** : Permet de gérer les résultats même en cas de rejet de certaines promesses.
2. **Analyse complète** : Fournit un résumé des promesses, qu'elles soient résolues ou rejetées, sans court-circuiter.

Exemple :

```javascript
const promises = [
  Promise.resolve(42),
  Promise.reject("Error"),
  Promise.resolve("Success"),
];

Promise.allSettled(promises).then((results) => {
  results.forEach((result) => console.log(result));
});
```

---

## 5. `globalThis`

`globalThis` fournit un moyen standard d'accéder à l'objet global, quel que soit l'environnement d'exécution (navigateur, Node.js, etc.).

Pourquoi est-ce important ?

1. **Standardisation** : Évite les variations comme `window`, `global`, ou `self`, selon l'environnement.
2. **Interopérabilité** : Simplifie le code qui doit fonctionner dans des contextes multiples.

Exemple :

```javascript
console.log(globalThis); // Fonctionne dans tous les environnements
```

---

## 6. `export * as ns from 'module'`

Cette syntaxe facilite l'exportation de tous les éléments d'un module sous un namespace donné.

Pourquoi est-ce utile ?

1. **Lisibilité** : Regroupe tous les exports sous un même namespace.
2. **Organisation** : Simplifie la gestion des modules avec de nombreux exports.

Exemple :

```javascript
// module.js
export const a = 1;
export const b = 2;

// main.js
export * as myModule from "./module.js";

// Utilisation
import { myModule } from "./main.js";
console.log(myModule.a, myModule.b); // 1, 2
```

---

## 7. Ordre d'énumération dans `for-in`

L'ordre d'itération des clés dans une boucle `for-in` a été davantage standardisé pour respecter l'ordre d'insertion.

Pourquoi est-ce utile ?

1. **Fiabilité** : Garantit un comportement prévisible entre différents moteurs JavaScript.
2. **Compatibilité** : Facilite le développement d'applications basées sur des itérations ordonnées.

Exemple :

```javascript
const obj = { b: 1, a: 2, c: 3 };
for (const key in obj) {
  console.log(key); // Garantit l'ordre d'insertion : 'b', 'a', 'c'
}
```

---

## 8. `import.meta`

`import.meta` est un objet propre à chaque module. Il contient des informations contextuelles sur le module, comme son URL.

Pourquoi est-ce utile ?

1. **Métadonnées modulaires** : Fournit un accès aux informations spécifiques au module (par exemple, URL ou contexte d'exécution).
2. **Interopérabilité** : Simplifie l'interaction avec les systèmes de modules.

Exemple :

```javascript
console.log(import.meta); // Fournit des informations comme l'URL du module
```

---

## 9. Nullish Coalescing (`??`)

L'opérateur `??` permet de retourner la première valeur qui n'est ni `null` ni `undefined`, offrant une alternative plus précise à `||` pour les valeurs nullish.

Pourquoi est-ce utile ?

1. **Précision** : Évite les comportements inattendus avec des valeurs falsy comme `0` ou `""`.
2. **Lisibilité** : Rend le code plus clair pour les développeurs.

Exemple :

```javascript
const value = null ?? "default";
console.log(value); // 'default'
```

---

## 10. Optional Chaining (`?.`)

Cet opérateur simplifie l'accès aux propriétés profondes d'un objet sans avoir à vérifier chaque niveau de l'objet. Il court-circuite si une valeur est `null` ou `undefined`.

Pourquoi est-ce utile ?

1. **Simplicité** : Réduit la nécessité d'écrire du code répétitif pour vérifier chaque niveau.
2. **Sécurité** : Prévient les erreurs liées aux accès non définis.

Exemple :

```javascript
const obj = { a: { b: null } };
console.log(obj?.a?.b?.c); // undefined (sans erreur)
```

---
