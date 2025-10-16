# Links rutas y protocolos

A continuación se describen las rutas correspondientes donde estarán las aplicaciones correspondientes.

## `/Alergias`


- GET - `/`: Devuelve el total de alergias registradas en el sistema, da un json de la forma:
    ```
    [
        {
            "idAlergia": 1,
            "nombre": "Polen"
        },
        {
            "idAlergia": 2,
            "nombre": "Ácaros del polvo"
        },
        {
            "idAlergia": 3,
            "nombre": "Látex"
        }
    ]
    ```

- POST - `/` : permite añadir una alergia al listado de alergias disponible. recibe un json con body del formato:
    ``` 
    {
        "nombre":"<nombre_alergia>"
    }
    ```

- GET - `/<idAlergia>`:devuelve el dato de una alergia en particular, dado por la id.

- 