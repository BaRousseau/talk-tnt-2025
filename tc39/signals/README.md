Les Signals sont une fonctionnalité en développement dans l’écosystème JavaScript, actuellement en Stage 2 au sein du processus de spécification ECMAScript via le TC39. Ils introduisent une manière plus élégante et plus efficace de gérer l’annulation d’opérations asynchrones et de transmettre des signaux d’interruption entre différentes parties du code, sans avoir à utiliser des mécanismes comme les Promises ou les AbortController.

1. Concept de Signals en JavaScript

Les Signals sont destinés à offrir une méthode plus précise et performante pour gérer les annulations, ce qui est particulièrement utile dans des scénarios où de longues opérations ou des tâches asynchrones peuvent être annulées avant d’être terminées, comme dans le cas des appels réseau, des boucles de calculs intensifs ou d’autres tâches longues dans un navigateur ou un environnement serveur.

L’idée derrière les Signals est de permettre de signaler une annulation de manière propre et contrôlée, ce qui pourrait améliorer la gestion des ressources et les performances des applications modernes.

2. La Problématique actuelle : AbortController et Promises

Actuellement, pour gérer l’annulation des tâches asynchrones, JavaScript utilise principalement deux mécanismes :
    •	AbortController : Il s’agit d’un objet permettant d’annuler des opérations asynchrones, comme des requêtes fetch. Ce mécanisme repose sur l’usage d’un AbortSignal, qui est transmis aux tâches en cours (par exemple, lors d’une requête fetch) pour leur signaler qu’elles doivent être annulées.

Exemple d’utilisation d’AbortController :

const controller = new AbortController();
const signal = controller.signal;

fetch('https://example.com/data', { signal })
  .then(response => response.json())
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('La requête a été annulée.');
    }
  });

// Annuler la requête après 2 secondes
setTimeout(() => controller.abort(), 2000);

    •	Promise.race avec un AbortSignal : Cette approche permet de “racer” entre une promesse principale et une promesse qui représente un signal d’annulation. Lorsque l’annulation est déclenchée, la promesse d’annulation “gagne” et interrompt l’exécution de la tâche principale.

Bien que ces mécanismes fonctionnent, ils peuvent devenir assez verbeux et difficiles à maintenir dans des systèmes complexes, surtout lorsque de nombreuses tâches asynchrones doivent être annulées ou gérées en parallèle.

3. Les Signals : Une Nouvelle Méthode d’Annulation

Le Signal vise à fournir une API plus simple, directe et performante pour gérer ces cas d’annulation, en réduisant la complexité et le besoin d’utiliser des abstractions comme AbortController. Voici quelques avantages clés des Signals :

3.1. Simplification de l’annulation des opérations

Avec les Signals, l’annulation d’une tâche ou la propagation d’un signal d’annulation devient plus fluide, en utilisant un objet centralisé, le Signal, qui peut être partagé entre différents processus ou tâches asynchrones sans avoir à gérer plusieurs mécanismes (comme un AbortController pour chaque tâche).

3.2. Performance et contrôle

L’une des raisons pour lesquelles les Signals sont proposés est leur efficacité en termes de performance. Comparé à l’utilisation de AbortController, les Signals pourraient être moins coûteux, car ils sont conçus pour être plus légers et n’ont pas besoin de “suivre” toutes les tâches asynchrones, ce qui pourrait réduire la surcharge liée à l’annulation.

4. Syntaxe et Fonctionnement

Les Signals dans JavaScript sont encore en développement, mais voici à quoi pourrait ressembler leur usage.

Création d’un Signal :

Un Signal peut être créé à partir d’un objet SignalController (une nouvelle API proposée pour gérer l’annulation de manière centralisée).

const signalController = new SignalController();
const signal = signalController.signal;

Utilisation du Signal :

Une fois un Signal créé, il peut être utilisé pour écouter ou protéger des opérations asynchrones, comme des requêtes fetch ou des tâches de calcul.

// Exemple avec fetch
fetch('https://example.com/data', { signal })
  .then(response => response.json())
  .catch(error => {
    if (error.name === 'SignalError') {
      console.log('La requête a été annulée.');
    }
  });

Annulation avec Signal :

L’annulation se fait en invoquant la méthode abort() sur le SignalController, ce qui déclenche une exception ou un signal d’annulation dans toutes les tâches liées à ce Signal.

// Annuler après 2 secondes
setTimeout(() => {
  signalController.abort(); // Lancer l'annulation
}, 2000);

5. Pourquoi les Signals sont importants ?

5.1. Simplification du code

Les Signals permettent une gestion plus claire de l’annulation dans des applications complexes, où plusieurs tâches doivent être annulées ou gérées simultanément. Cela réduit la verbosité du code et facilite son entretien.

5.2. Meilleure performance

L’idée est que les Signals peuvent fournir une annulation plus légère et performante par rapport à AbortController, en minimisant l’overhead associé à l’observation des états d’annulation ou à la gestion des “courses” entre plusieurs promesses.

5.3. Flexibilité

Les Signals sont également plus flexibles, car ils permettent d’envoyer des informations supplémentaires à travers les tâches annulées. Ce signal peut être propulsé dans des contextes où la simple annulation n’est pas suffisante, comme dans le cas d’une gestion de la ressource.

6. Exemples d’usage concret

Voici quelques scénarios où les Signals pourraient simplifier les choses par rapport aux autres mécanismes existants :

6.1. Annulation d’un ensemble de requêtes réseau

Imaginez une situation où vous effectuez plusieurs requêtes réseau en parallèle, mais que vous souhaitez annuler toutes ces requêtes si une certaine condition est remplie (par exemple, une navigation vers une autre page).

const signalController = new SignalController();
const signal = signalController.signal;

Promise.all([
  fetch('https://example.com/data1', { signal }),
  fetch('https://example.com/data2', { signal }),
  fetch('https://example.com/data3', { signal })
])
  .then(responses => {
    console.log('Réponses reçues', responses);
  })
  .catch(error => {
    if (error.name === 'SignalError') {
      console.log('Toutes les requêtes ont été annulées.');
    }
  });

// Annuler après 3 secondes
setTimeout(() => signalController.abort(), 3000);

6.2. Annulation dans un système de tâches parallèles

Dans un scénario où plusieurs tâches doivent être annulées en parallèle (par exemple, un traitement de fichiers, de calculs ou de données), l’utilisation des Signals permettra de gérer l’annulation de manière centralisée et cohérente.

const signalController = new SignalController();
const signal = signalController.signal;

async function longRunningTask(signal) {
  while (!signal.aborted) {
    // Effectuer des tâches à intervalles réguliers
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Tâche en cours...');
  }
  console.log('Tâche annulée.');
}

longRunningTask(signal);

// Annuler après 5 secondes
setTimeout(() => signalController.abort(), 5000);

7. Conclusion

Les Signals apportent une manière plus directe et performante de gérer l’annulation dans JavaScript, ce qui est particulièrement utile dans des applications complexes et performantes. Bien que la proposition soit encore en développement, elle présente un potentiel important pour simplifier et optimiser les tâches asynchrones dans le langage. L’introduction des Signals pourrait réduire la complexité et améliorer l’efficacité de la gestion des annulations dans des systèmes modernes, rendant ainsi le code JavaScript plus propre et performant.

