# Links rutas y protocolos

A continuación se describen las rutas correspondientes donde estarán las aplicaciones correspondientes, en el path base se encuentra el listado de paths disponibles por si acaso.

Sobre cada sección está el nombre y la ruta desde la que crecen las demás, por ejemplo en la primera sección alergias, si se está en localhost la ruta a la que se consumen sus apis sería:

```
http://localhost:4000/alergias/
```

## Tablas Maestras

En estas se ven las entidades principales, como alergias, medicamentos y demás.


### Alergias - `/alergias`

- **GET `/`**: Devuelve el total de alergias registradas en el sistema en formato JSON.

- **POST `/`**: Permite añadir una nueva alergia al listado disponible. Recibe un JSON en el body con la siguiente estructura:

```json
{"nombreAlergia": "Almendras"}
```

- **GET `/<idAlergia>`**: Devuelve los datos de una alergia específica, identificada por su `id`.

- **DELETE `/<idAlergia>`**: Elimina una alergia del registro según su `id`.

- **PUT `/<idAlergia>`**: Modifica el nombre de una alergia existente. Recibe en el body un JSON con la nueva información, por ejemplo:

```json
{"nombreAlergia": "Maní"}
```


### Enfermedades Crónicas - `/enfermedadescronicas`

- **GET `/`**: Devuelve el total de enfermedades crónicas registradas en el sistema en formato JSON.

- **POST `/`**: Permite añadir una nueva enfermedad crónica al listado disponible. Recibe un JSON en el body con la siguiente estructura:

```json
{"nombreEnfermedad": "Diabetes"}
```

- **GET `/<idEnfermedadCronica>`**: Devuelve los datos de una enfermedad crónica específica, identificada por su `idEnfermedadCronica`.

- **DELETE `/<idEnfermedadCronica>`**: Elimina una enfermedad crónica del registro según su `idEnfermedadCronica`.

- **PUT `/<idEnfermedadCronica>`**: Modifica el nombre de una enfermedad crónica existente. Recibe en el body un JSON con la nueva información, por ejemplo:

```json
{"nombreEnfermedad": "Hipertensión"}
```

### Exámenes - `/examenes`

- **GET `/`**: Devuelve el total de exámenes registrados en el sistema en formato JSON.

- **POST `/`**: Permite añadir un nuevo examen al listado disponible. Recibe un JSON en el body con la siguiente estructura:

```json
{
  "idTipoExamen": 1,
  "nombreExamen": "Hemograma completo"
}
```

- **GET `/<idExamen>`**: Devuelve los datos de un examen específico, identificado por su `idExamen`.

- **DELETE `/<idExamen>`**: Elimina un examen del registro según su `idExamen`.

- **PUT `/<idExamen>`**: Modifica los datos de un examen existente. Recibe en el body un JSON con la nueva información, por ejemplo:

```json
{
  "idTipoExamen": 2,
  "nombreExamen": "Orina completa"
}
```

### Intervenciones - `/intervenciones`

- **GET `/`**: Devuelve el total de intervenciones registradas en el sistema en formato JSON.

- **POST `/`**: Permite añadir una nueva intervención al listado disponible. Recibe un JSON en el body con la siguiente estructura:

```json
{"nombreIntervencion": "Apendicectomía"}
```

- **GET `/<idIntervencion>`**: Devuelve los datos de una intervención específica, identificada por su `idIntervencion`.

- **DELETE `/<idIntervencion>`**: Elimina una intervención del registro según su `idIntervencion`.

- **PUT `/<idIntervencion>`**: Modifica el nombre de una intervención existente. Recibe en el body un JSON con la nueva información, por ejemplo:

```json
{"nombreIntervencion": "Colecistectomía"}
```

### Medicamentos - `/medicamentos`

- **GET `/`**: Devuelve el total de medicamentos registrados en el sistema en formato JSON.

- **POST `/`**: Permite añadir un nuevo medicamento al listado disponible. Recibe un JSON en el body con la siguiente estructura:

```json
{
  "nombreMedicamento": "Paracetamol",
  "idPrincipio": 1,
  "idFormato": 2,
  "dosis": 500
}
```

- **GET `/<idMedicamento>`**: Devuelve los datos de un medicamento específico, identificado por su `idMedicamento`.

- **DELETE `/<idMedicamento>`**: Elimina un medicamento del registro según su `idMedicamento`.

- **PUT `/<idMedicamento>`**: Modifica los datos de un medicamento existente. Recibe en el body un JSON con la nueva información, por ejemplo:

```json
{
  "nombreMedicamento": "Ibuprofeno",
  "idPrincipio": 2,
  "idFormato": 1,
  "dosis": 400
}
```

### Pacientes - `/pacientes`

- **GET `/`**: Devuelve el total de pacientes registrados en el sistema en formato JSON.

- **POST `/`**: Permite añadir un nuevo paciente al listado disponible. Recibe un JSON en el body con la siguiente estructura:

```json
{
  "nombrePaciente": "juana rosa",
  "rut": "12345678-9",
  "fechaNacimiento": "1990-05-20",
  "sexo": 0,
  "direccion": "Calle Falsa 123",
  "telefono": "+56912345678",
  "idNacionalidad": 1
}
```

- **GET `/<idPaciente>`**: Devuelve los datos de un paciente específico, identificado por su `idPaciente`.

- **DELETE `/<idPaciente>`**: Elimina un paciente del registro según su `idPaciente`.

- **PUT `/<idPaciente>`**: Modifica los datos de un paciente existente. Recibe en el body un JSON con la nueva información, pueden faltar parametros, por ejemplo:

```json
{
  "rut": "12345678-9",
  "fechaNacimiento": "1990-05-20",
  "sexo": 1,
  "direccion": "Avenida Siempre Viva 742",
  "telefono": "+56987654321",
}
```

### Principio Activo - `/principiosactivos`

- **GET `/`**: Devuelve el total de principios activos registrados en el sistema en formato JSON.

- **POST `/`**: Permite añadir un nuevo principio activo al listado disponible. Recibe un JSON en el body con la siguiente estructura:

```json
{"nombrePrincipio": "Paracetamol"}
```

- **GET `/<idPrincipio>`**: Devuelve los datos de un principio activo específico, identificado por su `idPrincipio`.

- **DELETE `/<idPrincipio>`**: Elimina un principio activo del registro según su `idPrincipio`.

- **PUT `/<idPrincipio>`**: Modifica el nombre de un principio activo existente. Recibe en el body un JSON con la nueva información, por ejemplo:

```json
{"nombrePrincipio": "Ibuprofeno"}
```

### Tipo Examen - `/tipoexamenes`

- **GET `/`**: Devuelve el total de tipos de examen registrados en el sistema en formato JSON.

- **POST `/`**: Permite añadir un nuevo tipo de examen al listado disponible. Recibe un JSON en el body con la siguiente estructura:

```json
{"tipoExamen": "Sangre"}
```

- **GET `/<idTipoExamen>`**: Devuelve los datos de un tipo de examen específico, identificado por su `idTipoExamen`.

- **DELETE `/<idTipoExamen>`**: Elimina un tipo de examen del registro según su `idTipoExamen`.

- **PUT `/<idTipoExamen>`**: Modifica el nombre de un tipo de examen existente. Recibe en el body un JSON con la nueva información, por ejemplo:

```json
{"tipoExamen": "Orina"}
```

### Vacunas - `/vacunas`

- **GET `/`**: Devuelve el total de vacunas registradas en el sistema en formato JSON.

- **POST `/`**: Permite añadir una nueva vacuna al listado disponible. Recibe un JSON en el body con la siguiente estructura:

```json
{
  "nombreVacuna": "Influenza",
  "componente": "Virus inactivado"
}
```

- **GET `/<idVacuna>`**: Devuelve los datos de una vacuna específica, identificada por su `idVacuna`.

- **DELETE `/<idVacuna>`**: Elimina una vacuna del registro según su `idVacuna`.

- **PUT `/<idVacuna>`**: Modifica los datos de una vacuna existente. Recibe en el body un JSON con la nueva información, por ejemplo:

```json
{
  "nombreVacuna": "Hepatitis B",
  "componente": "Virus recombinante"
}
```
