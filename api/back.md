# Backend

<p align="left">
  <img height="200" src="../countries.png" />
</p>

## Rutas (test)

- GET: http://localhost:3001/countries ("Se trae todos los paises desde la API y los guarda en la DB").
- GET: http://localhost:3001/countries/per ("Se trae todos los detalles de un pais en especifico, consultado por su ID, en este caso se trae la info de PERU").

```
  {
  "id": "PER",
  "name": "Peru",
  "flags": "https://flagcdn.com/pe.svg",
  "continent": "Americas",
  "capital": [
  "Lima"
  ],
  "subregion": "South America",
  "area": 1285216,
  "population": 32971846,
  "activities": []
  }
Nota: En este caso la consulta es por params y Activities esta vacio ya que no tiene nada seteado aun
```

- GET: http://localhost:3001/countries?name=Venezuela ("Se trae todos los detalles de un pais en especifico, en este caso se trae la info de Venezuela")

```
  [
  {
    "id": "VEN",
    "name": "Venezuela",
    "flags": "https://flagcdn.com/ve.svg",
    "continent": "Americas",
    "capital": [
      "Caracas"
    ],
    "subregion": "South America",
    "area": 916445,
    "population": 28435943
  }
]
Nota: En este caso la consulta es por query(url)
```

- POST: http://localhost:3001/activity ("Se crea una nueva actividad por body")

```
Si se hace desde el postman se debe pasar un objeto por body, como el siguiente:
{
    "name": "Danza",
    "difficulty": "2",
    "duration": "15 min",
    "season": "Fall",
  }

```

- - GET: http://localhost:3001/activity ("Se trae actividades contenidas en la base de datos")

```
[
  {
    "id": "f7e16ba0-653c-4185-b6ed-7cffde1dd4c5",
    "name": "jose",
    "difficulty": "2",
    "duration": "30",
    "season": "Summer"
  },
  {
    "id": "a5432146-9277-45a2-a57a-2f76d5a2bed6",
    "name": "dance",
    "difficulty": "2",
    "duration": "30",
    "season": "Summer"
  },
  {
    "id": "a1da0c1a-8b9d-4ec5-9c49-6debd8cdc46b",
    "name": "song",
    "difficulty": "2",
    "duration": "30 minutos",
    "season": "Summer"
  }
]
```
