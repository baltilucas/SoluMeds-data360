-- Tabla de nacionalidades
CREATE TABLE nacionalidad (
    idNacionalidad INT PRIMARY KEY AUTO_INCREMENT,
    pais VARCHAR(100)
);

INSERT INTO
    nacionalidad (pais)
VALUES
    ('CHILE'),
    ('PERU'),
    ('VENEZUELA'),
    ('ARGENTINA');

-- corregido "ARGENITNA"
-- Tabla de tipos de previsión
CREATE TABLE tipoprevision (
    idTipoPrevision INT PRIMARY KEY AUTO_INCREMENT,
    tipoPrevision VARCHAR(50)
);

-- Debes especificar la columna, ya que tipoprevision tiene un campo autoincremental
INSERT INTO
    tipoprevision (tipoPrevision)
VALUES
    ('FONASA'),
    ('ISAPRE');

-- Tabla de previsión
CREATE TABLE prevision (
    idPrevision INT PRIMARY KEY AUTO_INCREMENT,
    nombrePrevision VARCHAR(60),
    idTipoPrevision INT,
    FOREIGN KEY (idTipoPrevision) REFERENCES tipoprevision(idTipoPrevision)
);

-- Corregido: se debe incluir idTipoPrevision en el INSERT
INSERT INTO
    prevision (nombrePrevision, idTipoPrevision)
VALUES
    ('FONASA A', 1),
    ('FONASA B', 1),
    ('FONASA C', 1),
    ('BANMEDICA', 2),
    ('CRUZ BLANCA', 2),
    ('ESSENTIAL', 2);

-- 0 será femenino, 1 masculino, 3 otro
CREATE TABLE paciente (
    idPaciente INT PRIMARY KEY AUTO_INCREMENT,
    nombrePaciente VARCHAR(50) NOT NULL,
    segundoNombrePaciente VARCHAR(50),
    apellidoPaciente VARCHAR(50) NOT NULL,
    segundoApellidoPaciente VARCHAR(50),
    correoPersonal VARCHAR(100) NOT NULL,
    correoSolumeds VARCHAR(100) NOT NULL,
    rut VARCHAR(20),
    fechaNacimiento DATE NOT NULL,
    sexo TINYINT NOT NULL,
    direccion VARCHAR(200),
    telefono VARCHAR(12) NOT NULL,
    idNacionalidad INT,
    idPrevision INT,
    prais BOOLEAN DEFAULT 0,
    FOREIGN KEY (idNacionalidad) REFERENCES nacionalidad(idNacionalidad),
    FOREIGN KEY (idPrevision) REFERENCES prevision(idPrevision)
);

-- Insert de ejemplo corregido
INSERT INTO
    paciente (
        nombrePaciente,
        segundoNombrePaciente,
        apellidoPaciente,
        segundoApellidoPaciente,
        correoPersonal,
        correoSolumeds,
        rut,
        fechaNacimiento,
        sexo,
        direccion,
        telefono,
        idNacionalidad,
        idPrevision,
        prais
    )
VALUES
    (
        'Cristian',
        'Alfonso',
        'Valenzuela',
        'Sobarzo',
        'cristianvalenzuela@gmail.com',
        'cvalenzuela@solumeds.cl',
        '20496709-1',
        '2000-10-10',
        1,
        'Los Olivos 1234',
        '987654321',
        1,
        1,
        0
    );

CREATE TABLE doctor(
    idDoctor INT PRIMARY KEY AUTO_INCREMENT,
    nombreDoctor VARCHAR(200)
);

CREATE TABLE alergia(
    idAlergia INT PRIMARY KEY AUTO_INCREMENT,
    nombreAlergia VARCHAR(100)
);

INSERT INTO
    alergia (nombreAlergia)
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

CREATE TABLE severidad(
    idSeveridad INT PRIMARY KEY AUTO_INCREMENT,
    severidad VARCHAR(50)
);

INSERT INTO
    severidad(severidad)
VALUES
    ('LEVE'),
    ('MODERADO'),
    ('GRAVE');

CREATE TABLE alergiapaciente(
    idPaciente INT,
    idAlergia INT,
    idSeveridad INT,
    sintomas TEXT,
    fechaDiagnostico DATE default curdate(),
    PRIMARY KEY (idPaciente, idAlergia),
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente),
    FOREIGN KEY (idAlergia) REFERENCES alergia(idAlergia),
    FOREIGN KEY (idSeveridad) REFERENCES severidad(idSeveridad)
);

CREATE TABLE vacuna(
    idVacuna INT PRIMARY KEY AUTO_INCREMENT,
    nombreVacuna VARCHAR(200),
    componenete VARCHAR(255)
);

CREATE TABLE vacunapaciente(
    idPaciente INT,
    idVacuna INT,
    fecha timestamp,
    dosis float,
    establecimiento VARCHAR(255),
    proveedor VARCHAR(100),
    PRIMARY KEY (idPaciente, idVacuna),
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente),
    FOREIGN KEY (idVacuna) REFERENCES vacuna(idVacuna)
);

CREATE TABLE formato(
    idFormato INT PRIMARY KEY AUTO_INCREMENT,
    nombreFormato VARCHAR(70)
);

INSERT INTO
    formato(nombreFormato)
VALUES
    ("comprimido"),
    ("jarabe"),
    ("inyectable");

CREATE TABLE principioActivo(
    idPrincipio INT PRIMARY KEY AUTO_INCREMENT,
    nombrePrincipio VARCHAR(200)
);

CREATE TABLE toxicidadmedicamentos(
    idPrincipio1 INT,
    idPrincipio2 INT,
    idSeveridad INT,
    PRIMARY KEY (idPrincipio1, idPrincipio2),
    FOREIGN KEY (idPrincipio1) REFERENCES principioActivo(idPrincipio),
    FOREIGN KEY (idPrincipio2) REFERENCES principioActivo(idPrincipio),
    FOREIGN KEY (idSeveridad) REFERENCES severidad(idSeveridad),
    CHECK (idPrincipio1 < idPrincipio2)
);

CREATE TABLE medicamento(
    idMedicamento INT PRIMARY KEY AUTO_INCREMENT,
    nombreMedicamento VARCHAR(255),
    idPrincipio INT,
    idFormato INT,
    dosis float,
    FOREIGN KEY (idPrincipio) REFERENCES principioActivo(idPrincipio),
    FOREIGN KEY (idFormato) REFERENCES formato(idFormato)
);

CREATE TABLE receta(
    idReceta INT PRIMARY KEY AUTO_INCREMENT,
    idPaciente INT NOT NULL,
    fecha timestamp NOT NULL,
    idDoctor INT,
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente),
    FOREIGN KEY (idDoctor) REFERENCES doctor(idDoctor)
);

CREATE TABLE detallereceta(
    idReceta INT,
    idMedicamento INT,
    dias INT NOT NULL,
    frecuencia INT NOT NULL,
    horaInicio time,
    PRIMARY KEY (idReceta, idMedicamento),
    FOREIGN KEY (idReceta) REFERENCES receta(idReceta),
    FOREIGN KEY (idMedicamento) REFERENCES medicamento(idMedicamento)
);

CREATE TABLE intervencion(
    idIntervencion INT PRIMARY KEY AUTO_INCREMENT,
    nombreIntervención VARCHAR(200)
);

CREATE TABLE intervecnionpaciente(
    idPaciente INT,
    idIntervencion INT,
    idDoctor INT,
    fechaIntervencion DATE default curdate(),
    horaIntervención TIME,
    PRIMARY KEY (idPaciente, idIntervencion, fechaIntervencion),
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente),
    FOREIGN KEY (idIntervencion) REFERENCES intervencion(idIntervencion),
    FOREIGN KEY (idDoctor) REFERENCES doctor(idDoctor)
);

CREATE TABLE tipoexamen(
    idTipoExamen INT PRIMARY KEY AUTO_INCREMENT,
    tipoExamen VARCHAR(50)
);

INSERT INTO
    tipoexamen (tipoExamen)
VALUES
    ('SANGRE'),
    ('ORINA'),
    ('RADIOGRAFÍA'),
    ('ECOGRAFÍA'),
    ('TOMOGRAFÍA'),
    ('RESONANCIA MAGNÉTICA'),
    ('CARDIOLOGÍA'),
    ('OFTALMOLÓGICO'),
    ('AUDITIVO'),
    ('MICROBIOLÓGICO'),
    ('GENÉTICO'),
    ('HORMONAL'),
    ('NEUROLÓGICO'),
    ('DERMATOLÓGICO'),
    ('FUNCIONAL'),
    ('HEMATOLOGÍA'),
    ('INMUNOLÓGICO'),
    ('ENDOSCOPÍA'),
    ('DENSITOMETRÍA'),
    ('ALÉRGENOS');

CREATE TABLE examen(
    idExamen INT PRIMARY KEY AUTO_INCREMENT,
    idTipoExamen INT,
    nombreExamen VARCHAR(150),
    FOREIGN KEY (idTipoExamen) REFERENCES tipoexamen(idTipoExamen)
);

INSERT INTO
    examen (idTipoExamen, nombreExamen)
VALUES
    (1, 'Hemograma completo'),
    (1, 'Perfil lipídico'),
    (1, 'Glucosa en sangre'),
    (1, 'Prueba de función hepática'),
    (1, 'Prueba de función renal'),
    (2, 'Examen general de orina'),
    (2, 'Test de embarazo en orina'),
    (3, 'Radiografía de tórax'),
    (3, 'Radiografía de extremidades'),
    (4, 'Ecografía abdominal'),
    (4, 'Ecografía pélvica'),
    (
        5,
        'Tomografía axial computarizada (TAC) cerebral'
    ),
    (5, 'TAC de tórax con contraste'),
    (6, 'Resonancia magnética cerebral'),
    (6, 'Resonancia magnética de columna lumbar'),
    (7, 'Electrocardiograma (ECG)'),
    (7, 'Ecocardiograma Doppler'),
    (10, 'Cultivo bacteriológico'),
    (11, 'Prueba de ADN para detección genética'),
    (
        12,
        'Prueba de niveles de tiroides (TSH, T3, T4)'
    );

CREATE TABLE examenpaciente(
    idPaciente INT,
    idExamen INT,
    fecha DATE default curdate(),
    idDoctor INT,
    -- quien dio la orden si corresponde
    comentario TEXT,
    linkExamen TEXT,
    PRIMARY KEY (idPaciente, idExamen, fecha),
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente),
    FOREIGN KEY (idExamen) REFERENCES examen(idExamen),
    FOREIGN KEY (idDoctor) REFERENCES doctor(idDoctor)
);
CREATE TABLE enfermedadcronica(
    idEnfermedadCronica INT PRIMARY KEY AUTO_INCREMENT,
    nombreEnfermedad VARCHAR(100)
);

CREATE TABLE enfermedadcronicapaciente(
    idPaciente INT,
    idEnfermedadCronica INT,
    fechaDiagnostico DATE DEFAULT CURDATE(),
    PRIMARY KEY (idPaciente, idEnfermedadCronica),
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente),
    FOREIGN KEY (idEnfermedadCronica) REFERENCES enfermedadcronica(idEnfermedadCronica)
);
