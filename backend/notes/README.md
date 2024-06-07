## GETTING STARTED

- Clone the repo `https://github.com/kimaru355/teach2give-assignments`
- Navigate to _backend/notes_
- run `npm install` to install dependencies
- create _.env_ in notes dir to with these fields _DB_USER_, _DB_PWD_, _DB_NAME_, _MA_SERVER_
- run `npm start` to start the server

## TEST API

- The server runs on `http://localhost:3003`
- Import _test-api.json_ file with _Insomnia_
- _Insomnia_ is a free open-source api testing app
- You can download _Insomnia_ from `https://insomnia.rest/download`

## ROUTES

- POST /notes/create - Create note
- PUT /notes/:id - Update note
- DELETE /notes/:id - Delete note
- GET /notes/all - Get all notes
- GET /notes/:id - Get note
