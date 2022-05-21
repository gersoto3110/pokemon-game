# Proyecto final

En este proyecto decidí crear un juego para simular batallas pokemon 1 vs 1. Permite al usuario elegir al pokemon y automáticamente seleccionará un pokemon al azar para iniciar el juego.

Se realizó usando la API de [pokeapi](pokeapi.co), create-react-app y firebase.

## Funcionamiento

1. Hay que iniciar sesión para poder jugar.
2. Selecciona a tu pokemon.
   - Podes filtrar por tipo o por nombre
3. Empieza la batalla.

## Online demo
Pueden ver una demo del proyecto [aquí](https://sv-pokemon-battle.web.app/)

## Correr de forma local
Clonar el proyecto
```
git clone https://github.com/gersoto3110/pokemon-game.git
```

En la carpeta principal crear .env para configurar firebase
```
REACT_APP_FIREBASE_API_KEY=tu_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=tu_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=tu_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender
REACT_APP_FIREBASE_APP_ID=tu_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=tu_measurement_id
```
En la carpeta principal abrir la terminal
```
npm install
```
Correr el proyecto
```
npm run start
```
## Versiones de las librerías utilizadas
| Librería | Version |
| --- | --- |
| react| v18.0.0|
| firebase| v9.8.1|
| react-router-dom | v6.3.0|
| axios | v0.27.2|
