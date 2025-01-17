# ECMAScript 2022, the 13th edition

En 2022, JavaScript a introduit plusieurs améliorations significatives, renforçant la flexibilité et la puissance du langage pour répondre aux besoins des développeurs modernes.

Ces nouveautés ont été standardisées par le TC39 ([source officielle](https://tc39.es/ecma262/)).

## 1. Top-Level `await`

Il est désormais possible d'utiliser le mot-clé `await` au niveau supérieur des modules, sans nécessiter de fonction asynchrone.

Pourquoi est-ce utile ?

1. **Simplicité** : Évite d'encapsuler le code dans une fonction asynchrone.
2. **Interopérabilité** : Améliore l'intégration avec des modules asynchrones ou des API modernes.

Exemple :

```javascript
// Importation d'un module asynchrone
const data = await fetch("https://api.example.com/data").then((res) =>
  res.json()
);
console.log(data);
```

---

## 2. Nouveaux éléments de classes

Les classes prennent en charge :

- Champs d'instance publics et privés
- Champs statiques publics et privés
- Méthodes et accesseurs privés (tant pour les instances que pour les statiques)

Pourquoi est-ce important ?

1. **Encapsulation** : Renforce le contrôle de l'accès aux propriétés et méthodes.
2. **Lisibilité** : Clarifie le statut des membres de classe (publics ou privés).

Exemple :

```javascript
class MyClass {
  #privateField = 42;
  static #privateStaticField = "static";

  getPrivateField() {
    return this.#privateField;
  }
}

const instance = new MyClass();
console.log(instance.getPrivateField()); // 42
```

---

## 3. Blocs statiques

Les blocs statiques permettent d'effectuer une initialisation au niveau de la classe.

Pourquoi est-ce utile ?

1. **Configuration avancée** : Permet de gérer des états complexes ou de calculer des valeurs au moment de la définition de la classe.

Exemple :

```javascript
class MyClass {
  static counter;

  static {
    MyClass.counter = 0;
  }
}

console.log(MyClass.counter); // 0
```

---

## 4. Syntaxe `#x in obj`

Cette syntaxe permet de vérifier la présence d'un champ privé dans un objet.

Pourquoi est-ce utile ?

1. **Encapsulation renforcée** : Fournit un moyen de valider l'existence de champs privés sans les exposer.

Exemple :

```javascript
class MyClass {
  #privateField = 42;
}

const instance = new MyClass();
console.log(#privateField in instance); // true
```

---

## 5. Indices de correspondance via le drapeau `/d`

Le drapeau `/d` pour les expressions régulières fournit les indices de début et de fin des sous-chaînes correspondantes.

Pourquoi est-ce utile ?

1. **Analyse avancée** : Facilite l'extraction des positions des correspondances.
2. **Précision** : Offre un contrôle granulaire sur les résultats des correspondances.

Exemple :

```javascript
const regex = /a(b)c/d;
const str = "abc";
const match = regex.exec(str);
console.log(match.indices); // [[0, 3], [1, 2]]
```

---

## 6. Propriété `cause` sur les objets `Error`

La propriété `cause` permet de chaîner les erreurs en enregistrant la cause d'une erreur.

Pourquoi est-ce important ?

1. **Traçabilité** : Simplifie le suivi des causes des erreurs complexes.
2. **Lisibilité** : Fournit une meilleure compréhension des contextes d'erreur.

Exemple :

```javascript
try {
  throw new Error("Initial error", { cause: "Underlying issue" });
} catch (error) {
  console.log(error.message); // "Initial error"
  console.log(error.cause); // "Underlying issue"
}
```

---

## 7. Méthode `at` pour Strings, Arrays et TypedArrays

La méthode `at` permet d'accéder aux éléments par index relatif, y compris les index négatifs.

Pourquoi est-ce utile ?

1. **Simplicité** : Évite de calculer manuellement les index à partir de la fin.
2. **Polyvalence** : Fonctionne avec plusieurs types d'objets.

Exemple :

```javascript
const arr = [1, 2, 3];
console.log(arr.at(-1)); // 3

const str = "hello";
console.log(str.at(-2)); // "l"
```

---

## 8. `Object.hasOwn`

`Object.hasOwn` est une alternative pratique à `Object.prototype.hasOwnProperty`.

Pourquoi est-ce utile ?

1. **Lisibilité** : Réduit la verbosité du code.
2. **Sécurité** : Évite les problèmes liés à la manipulation du prototype.

Exemple :

```javascript
const obj = { key: "value" };
console.log(Object.hasOwn(obj, "key")); // true
```

---
