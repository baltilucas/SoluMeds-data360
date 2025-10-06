CREATE TABLE nacionalidad(
    idNacionalidad INT PRIMARY KEY AUTO_INCREMENT,
    nacionalidad VARCHAR(100)
);

INSERT INTO
    nacionalidad(nacionalidad)
VALUES
    ("CHILENO");

CREATE TABLE paciente(
    idPaciente INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    rut VARCHAR(13),
    fechaNacimiento DATE,
    sexo TINYINT,
    direccion VARCHAR(200),
    telefono VARCHAR(12),
    idNacionalidad INT,
    FOREIGN KEY (idNacionalidad) REFERENCES nacionalidad(idNacionalidad)
);

INSERT INTO
    paciente (
        nombre,
        rut,
        fechaNacimiento,
        sexo,
        direccion,
        telefono,
        idNacionalidad
    )
VALUES
    (
        'Juanito Perez',
        '12.345.678-9',
        '1998-09-29',
        1,
        'Calle Falsa 123, Santiago',
        '912345678',
        1
    ),
    (
        'Cristian Valenzuela',
        '23.456.789-0',
        '1981-09-29',
        1,
        'Av. Libertador 456, Santiago',
        '923456789',
        1
    ),
    (
        'Camila Gonzalez',
        '34.567.890-1',
        '1992-09-29',
        2,
        'Calle Larga 789, Santiago',
        '934567890',
        1
    );

CREATE TABLE alergia(
    idAlergia INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100)
);

INSERT INTO
    alergia (nombre)
VALUES
    ("Polen"),
    ("Ácaros del polvo"),
    ("Látex"),
    ("Mariscos"),
    ("Maní"),
    ("Leche"),
    ("Huevo"),
    ("Soja"),
    ("Gluten"),
    ("Penicilina"),
    ("Picadura de abeja"),
    ("Cloro"),
    ("Niquel (metal)"),
    ("Perfumes"),
    ("Cápsulas de gelatina");

CREATE TABLE pacienteAlergia(
    idPaciente INT,
    idAlergia INT,
    gravedad VARCHAR(40),
    PRIMARY KEY (idPaciente, idAlergia),
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente),
    FOREIGN KEY (idAlergia) REFERENCES alergia(idAlergia)
);

INSERT INTO
    pacienteAlergia(idPaciente, idAlergia, gravedad)
VALUES
    (1, 3, "Grave"),
(1, 1, "Moderado");

CREATE TABLE enfermedadCronica(
    idEnfermedad INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(200)
);

INSERT INTO
    enfermedadCronica (nombre)
VALUES
    ("Hipertensión arterial"),
    ("Diabetes mellitus tipo 2"),
    ("Asma"),
    ("Enfermedad pulmonar obstructiva crónica (EPOC)"),
    ("Insuficiencia cardíaca"),
    ("Artritis reumatoide"),
    ("Osteoporosis"),
    ("Cáncer"),
    ("Enfermedad renal crónica"),
    ("Hepatitis crónica"),
    ("Hipotiroidismo"),
    ("Esquizofrenia"),
    ("Depresión mayor"),
    ("Parkinson"),
    ("Alzheimer");

CREATE TABLE pacienteEnfermedad(
    idPaciente INT,
    idEnfermedad INT,
    comentario VARCHAR(220),
    PRIMARY KEY (idPaciente, idEnfermedad),
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente),
    FOREIGN KEY (idEnfermedad) REFERENCES enfermedadCronica(idEnfermedad)
);

CREATE TABLE tipoExamen(
    idExamen INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)
);

INSERT INTO
    tipoExamen (nombre)
VALUES
    ("Hemograma completo"),
    ("Perfil lipídico"),
    ("Glicemia en ayunas"),
    ("Prueba de función hepática"),
    ("Prueba de función renal"),
    ("Examen de orina"),
    ("Electrocardiograma"),
    ("Radiografía de tórax"),
    ("Ecografía abdominal"),
    ("Resonancia magnética"),
    ("Tomografía computarizada"),
    ("Examen de VIH"),
    ("PCR COVID-19"),
    ("Examen de tiroides (TSH, T4)"),
    ("Test de embarazo en sangre");

CREATE TABLE examenPaciente(
    idExamen INT,
    idPaciente INT,
    fechaSubida DATE,
    link TEXT,
    PRIMARY KEY (idExamen, idPaciente),
    FOREIGN KEY (idExamen) REFERENCES tipoExamen(idExamen),
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente)
);

INSERT INTO
    examenPaciente (idExamen, idPaciente, fechaSubida, link)
VALUES
    (
        1,
        1,
        CURDATE(),
        'https://www.achs.cl/docs/librariesprovider2/empresa/producto-y-servicios/articulos-productos-y-servicio/recomendacionesgenerales_para_una_evaluacion.pdf'
    );

CREATE TABLE formatoMedicamento(
    idFormato INT PRIMARY KEY AUTO_INCREMENT,
    nombreFormato VARCHAR(100)
);

INSERT INTO
    formatoMedicamento(nombreFormato)
VALUES
    ("comprimido"),
    ("jarabe"),
    ("inyectable");

CREATE TABLE medicamento(
    idMedicamento INT PRIMARY KEY AUTO_INCREMENT,
    nombreMedicamento VARCHAR(200),
    principioActivo VARCHAR(200),
    idFormato INT,
    FOREIGN KEY (idFormato) REFERENCES formatoMedicamento(idFormato)
);

INSERT INTO
    medicamento (nombreMedicamento, principioActivo, idFormato)
VALUES
    ("Paracetamol 500mg", "Paracetamol", 1),
    ("Ibuprofeno 400mg", "Ibuprofeno", 1),
    ("Amoxicilina 500mg", "Amoxicilina", 1),
    ("Omeprazol 20mg", "Omeprazol", 1),
    ("Metformina 850mg", "Metformina", 1),
    ("Salbutamol Inhalador", "Salbutamol", 3),
    ("Jarabe para la tos", "Dextrometorfano", 2),
    ("Loratadina 10mg", "Loratadina", 1),
    ("Insulina", "Insulina", 3),
    ("Ácido Fólico 5mg", "Ácido Fólico", 1);

CREATE TABLE receta(
    idReceta INT PRIMARY KEY AUTO_INCREMENT,
    idPaciente INT,
    fechaEmision DATE,
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente)
);

CREATE TABLE medicamentoReceta(
    idMedicamento INT,
    idReceta INT,
    dosis VARCHAR(20),
    frecuencia INT,
    duracion INT,
    PRIMARY KEY (idMedicamento, idReceta),
    FOREIGN KEY (idMedicamento) REFERENCES medicamento(idMedicamento),
    FOREIGN KEY (idReceta) REFERENCES receta(idReceta)
);

CREATE TABLE procedimiento(
    idProcedimiento INT PRIMARY KEY AUTO_INCREMENT,
    nombreProcedimiento VARCHAR(200)
);

INSERT INTO
    procedimiento (nombreProcedimiento)
VALUES
    ("Apendicectomía"),
    ("Cesárea"),
    ("Colecistectomía"),
    ("Cirugía de hernia"),
    ("Cirugía cardíaca"),
    ("Trasplante renal"),
    ("Amigdalectomía"),
    ("Resección de tumor"),
    ("Bypass gástrico"),
    ("Colocación de marcapasos"),
    ("Artroscopia de rodilla"),
    ("Reemplazo de cadera"),
    ("Cirugía ocular (cataratas)"),
    ("Endoscopia"),
    ("Biopsia de piel");

CREATE TABLE pacienteProcedimiento(
    idProcedimiento INT,
    idPaciente INT,
    fechaProcedimiento DATE,
    comentario VARCHAR(240),
    PRIMARY KEY (idProcedimiento, idPaciente, fechaProcedimiento),
    FOREIGN KEY (idProcedimiento) REFERENCES procedimiento(idProcedimiento),
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente)
);