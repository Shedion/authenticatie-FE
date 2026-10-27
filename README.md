# Authenticatie – frontend

De Vue-frontend voor een inlogsysteem. Gebruikers kunnen zich hier registreren, inloggen en uitloggen. De frontend praat met een Laravel-API die in een aparte repository staat: [authenticatie](https://github.com/Shedion/authenticatie).

Schoolproject voor de opleiding Software Developer (mbo 4) aan het Deltion College.

## Functies

- **Registratieformulier** met controle op de invoer
- **Inlogformulier**: na het inloggen wordt het token bewaard, zodat de gebruiker ingelogd blijft
- **Beveiligde pagina's**: niet-ingelogde gebruikers worden doorgestuurd naar de inlogpagina
- **Uitloggen**
- **Foutmeldingen** uit de API worden netjes aan de gebruiker getoond

## Gebruikte technieken

- Vue 3
- Vite
- JavaScript
- Vue Router

## Zelf draaien

Zorg dat eerst de [backend](https://github.com/Shedion/authenticatie) draait op `http://localhost:8000`. Daarna:

```bash
git clone https://github.com/Shedion/authenticatie-FE.git
cd authenticatie-FE
npm install
npm run dev
```

Open daarna de link die in je terminal verschijnt (meestal `http://localhost:5173`).
