#ReactiveGame

- [Descrizione](#descrizione)
- [Component Library](#styling-solution-or-component-library)
- [Pages](#pages)
- [API + User Interaction](#api--user-interaction)
- [Context API](#context-api)
- [Deployment](#deployment)

## Descrizione

Anomalia. Errore. Glitch. L'esaltazione dell'imperfezione in un mondo alla costante ricerca della perfezione. Giocare come arma per evadere. Unendo questi due punti nasce "Reactive game", un sito orgogliosamente imperfetto, dove i vari utenti possono interagire tra loro per scambiarsi opinioni ed impressioni

## Styling Solution o Component Library

- CSS3
- MUI Components: https://mui.com
- Google Font: https://swiperjs.com

## Pages

1. HomePage
2. GenrePage
3. PlatformPage
4. PublisherPage
5. AboutPage
6. LoginPage
7. RegisterPage
8. Account
9. Settings 

## API + User Interaction

1. HomePage - Visualizzazione del catalogo videogames filtrati per categoria
2. AllGames - Lista di tutti i videogiochi disponibili
3. GameSearch - Possibilità di ricercare un gioco inserendo il suo titolo
4. DetailsPage - Dettagli del videogioco scelto con possibilità di aggiungere o rimuovere dai preferiti, lasciare una recensione o interagire con la live chat
5. LoginPage - Form per il login, autenticazione con email o con Google/Apple
6. RegisterPage - Form per la registrazione dell'account
7. Account - Dettagli dell'utente loggato, giochi preferiti e recenzioni pubblicate
8. AccountSettings - Form di modifica dati utente
9. RouteNotFound - Feedback per errori 404

## Context API

- Grazie all'AppContext, garantiamo una gestione sicura e intuitiva della sessione dell'utente loggato, assicurando un'esperienza personalizzata e senza interruzioni. Inoltre, il GameContext ci consente di gestire in modo efficiente i dati relativi ai videogiochi, offrendo agli utenti un accesso fluido e rapido alle informazioni.

## Deployment

- Puoi visitare il sito seguendo questo link: https://reactivegame-valerio-petriachi.vercel.app/
