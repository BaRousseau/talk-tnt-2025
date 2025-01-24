# ECMAScript 2025, the 16th edition

_⚠️ Date de sortie prévue : Juin 2025._

En 2025, JavaScript s'apprête à introduire des fonctionnalités innovantes qui renforcent encore davantage sa polyvalence et ses capacités.

Ces nouveautés sont en cours de standardisation par le TC39 ([source officielle](https://tc39.es/ecma262/)).

Ces propositions sont [dans la liste des Finished Proposals (Stage 4)](https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md).

## 1. `Promise.try`

Une méthode pratique pour gérer les erreurs dans les fonctions synchrones et asynchrones, en encapsulant automatiquement les exceptions dans une promesse rejetée.

Pourquoi est-ce utile ?

1. **Gestion simplifiée des erreurs** : Unifie le traitement des erreurs pour le code synchrone et asynchrone.
2. **Lisibilité accrue** : Réduit le besoin de blocs `try-catch` explicites.

Exemple :

```javascript
Promise.try(() => {
  if (Math.random() > 0.5) {
    throw new Error("Random error!");
  }
  return "Success";
})
  .then(console.log)
  .catch(console.error);
```

---

## 2. Aides pour les itérateurs synchrones

Des méthodes utilitaires pour faciliter le traitement des itérateurs synchrones, similaires à celles disponibles pour les itérateurs asynchrones.

Pourquoi est-ce important ?

1. **Uniformité** : Aligne les fonctionnalités des itérateurs synchrones et asynchrones.
2. **Simplification** : Réduit le code nécessaire pour manipuler les itérateurs.

Exemple :

```javascript
const iterator = [1, 2, 3].values();
const result = iterator.map((x) => x * 2).toArray();
console.log(result); // [2, 4, 6]
```

---

## 3. Modules JSON

JavaScript permettra d'importer directement des fichiers JSON comme modules.

Pourquoi est-ce utile ?

1. **Interopérabilité** : Facilite l'utilisation de fichiers de configuration ou de données.
2. **Simplification** : Évite les lectures manuelles de fichiers JSON.

Exemple :

```javascript
import config from "./config.json";
console.log(config.apiKey);
```

---

## 4. Attributs d'importation

Les attributs d'importation permettent de fournir des métadonnées supplémentaires pour les modules importés.

Pourquoi est-ce important ?

1. **Flexibilité** : Permet un contrôle plus précis lors de l'importation.
2. **Compatibilité étendue** : Soutient des cas d'utilisation spécifiques, comme l'importation conditionnelle.

Exemple :

```javascript
import data from "./data.json" with { type: "json" };
console.log(data);
```

---

## 5. Modificateurs RegExp

Une fonctionnalité permettant d'appliquer des modificateurs à des expressions régulières existantes.

Pourquoi est-ce utile ?

1. **Réutilisation** : Facilite la création d'expressions régulières dérivées.
2. **Écriture concise** : Évite la duplication de code.

Exemple :

```javascript
const baseRegex = /abc/;
const modifiedRegex = baseRegex.withFlags("gi");
console.log(modifiedRegex.test("ABC")); // true
```

---

## 6. Nouvelles méthodes pour les ensembles

Des méthodes supplémentaires pour les objets `Set`, élargissant leur utilité.

Pourquoi est-ce important ?

1. **Manipulation étendue** : Simplifie les opérations courantes sur les ensembles.
2. **Expressivité accrue** : Réduit le besoin de solutions ad hoc.

Exemple :

```javascript
const set1 = new Set([1, 2, 3]);
const set2 = new Set([3, 4, 5]);
const union = set1.union(set2);
console.log([...union]); // [1, 2, 3, 4, 5]
```

---

## 7. Groupes de capture nommés en double dans les RegExp

Les expressions régulières pourront inclure des groupes de capture nommés en double.

Pourquoi est-ce utile ?

1. **Souplesse** : Autorise des correspondances plus complexes avec des groupes réutilisables.
2. **Interopérabilité** : Aligne JavaScript sur d'autres langages qui prennent déjà en charge cette fonctionnalité.

Exemple :

```javascript
const regex = /(?<num>\d+)-(?<num>\d+)/;
const match = regex.exec("123-456");
console.log(match.groups.num); // "456"
```

---
