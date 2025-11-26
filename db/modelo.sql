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

CREATE UNIQUE INDEX idx_rut ON paciente(rut);

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
INSERT INTO paciente (nombrePaciente, segundoNombrePaciente, apellidoPaciente, segundoApellidoPaciente, correoPersonal, correoSolumeds, rut, fechaNacimiento, sexo, direccion, telefono, idNacionalidad, idPrevision, prais) VALUES
('Lucas', 'Andrés', 'Pavez', 'Venegas', 'lucas.pavez@gmail.com', 'lucas.pavez@solumeds.cl', '12.345.678-5', '1990-03-15', 1, 'Av. Siempre Viva 123, Santiago', '912345678', 1, 2, 0),
('Camila', 'Fernanda', 'González', 'Rojas', 'camila.gonzalez@gmail.com', 'camila.gonzalez@solumeds.cl', '11.234.567-0', '1985-07-22', 0, 'Calle Falsa 456, Valparaíso', '921234567', 1, 1, 1),
('Matías', 'Ignacio', 'Soto', 'Cárdenas', 'matias.soto@gmail.com', 'matias.soto@solumeds.cl', '13.345.678-2', '1992-11-05', 1, 'Av. Providencia 789, Santiago', '932345678', 1, 2, 0),
('Valentina', 'Isidora', 'López', 'Navarro', 'valentina.lopez@gmail.com', 'valentina.lopez@solumeds.cl', '14.456.789-1', '1995-01-30', 0, 'Calle Los Robles 321, Concepción', '943456789', 1, 1, 1),
('Benjamín', 'Emiliano', 'Rojas', 'Fuentes', 'benjamin.rojas@gmail.com', 'benjamin.rojas@solumeds.cl', '15.567.890-8', '1988-09-17', 1, 'Av. Los Leones 654, Santiago', '954567890', 1, 2, 0),
('Isidora', 'María', 'Vega', 'Paredes', 'isidora.vega@gmail.com', 'isidora.vega@solumeds.cl', '16.678.901-6', '1993-12-10', 0, 'Calle Las Flores 987, Valdivia', '965678901', 1, 1, 1),
('Santiago', 'José', 'Castillo', 'Morales', 'santiago.castillo@gmail.com', 'santiago.castillo@solumeds.cl', '17.789.012-3', '1989-05-08', 1, 'Av. Chile 123, La Serena', '976789012', 1, 2, 0),
('Fernanda', 'Catalina', 'Muñoz', 'Aguirre', 'fernanda.munoz@gmail.com', 'fernanda.munoz@solumeds.cl', '18.890.123-0', '1991-08-20', 0, 'Calle Los Pinos 456, Temuco', '987890123', 1, 1, 1),
('Joaquín', 'Alejandro', 'Rivas', 'Silva', 'joaquin.rivas@gmail.com', 'joaquin.rivas@solumeds.cl', '19.901.234-7', '1987-04-12', 1, 'Av. Libertador 789, Antofagasta', '998901234', 1, 2, 0),
('María', 'José', 'Herrera', 'Cisterna', 'maria.herrera@gmail.com', 'maria.herrera@solumeds.cl', '20.012.345-4', '1994-06-25', 0, 'Calle Los Nogales 321, Chillán', '909012345', 1, 1, 1),
('Diego', 'Andrés', 'Méndez', 'Carrasco', 'diego.mendez@gmail.com', 'diego.mendez@solumeds.cl', '21.123.456-1', '1990-02-18', 1, 'Av. Las Condes 654, Santiago', '910123456', 1, 2, 0),
('Antonia', 'Isabel', 'Salazar', 'Figueroa', 'antonia.salazar@gmail.com', 'antonia.salazar@solumeds.cl', '22.234.567-8', '1996-10-02', 0, 'Calle El Roble 987, Valparaíso', '921234567', 1, 1, 1),
('Gabriel', 'Fernando', 'Reyes', 'Pinto', 'gabriel.reyes@gmail.com', 'gabriel.reyes@solumeds.cl', '23.345.678-5', '1988-03-05', 1, 'Av. Los Carrera 123, Santiago', '932345678', 1, 2, 0),
('Nicole', 'Camila', 'Torres', 'Arias', 'nicole.torres@gmail.com', 'nicole.torres@solumeds.cl', '24.456.789-2', '1992-07-19', 0, 'Calle Las Acacias 456, Concepción', '943456789', 1, 1, 1),
('Tomás', 'Alejandro', 'Orellana', 'Riquelme', 'tomas.orellana@gmail.com', 'tomas.orellana@solumeds.cl', '25.567.890-9', '1985-12-28', 1, 'Av. Kennedy 789, Santiago', '954567890', 1, 2, 0),
('Francisca', 'Isabel', 'Cáceres', 'Vargas', 'francisca.caceres@gmail.com', 'francisca.caceres@solumeds.cl', '26.678.901-7', '1993-09-14', 0, 'Calle Los Claveles 321, Temuco', '965678901', 1, 1, 1),
('Nicolás', 'José', 'Gutiérrez', 'Molina', 'nicolas.gutierrez@gmail.com', 'nicolas.gutierrez@solumeds.cl', '27.789.012-4', '1989-11-30', 1, 'Av. Pedro de Valdivia 654, Santiago', '976789012', 1, 2, 0),
('Catalina', 'María', 'Parra', 'Espinoza', 'catalina.parra@gmail.com', 'catalina.parra@solumeds.cl', '28.890.123-1', '1995-05-06', 0, 'Calle Los Aromos 987, Valdivia', '987890123', 1, 1, 1),
('Javier', 'Andrés', 'Cortez', 'Maldonado', 'javier.cortez@gmail.com', 'javier.cortez@solumeds.cl', '29.901.234-8', '1991-03-21', 1, 'Av. O’Higgins 123, La Serena', '998901234', 1, 2, 0),
('Paula', 'Isidora', 'Navarro', 'Rojas', 'paula.navarro@gmail.com', 'paula.navarro@solumeds.cl', '30.012.345-5', '1987-08-12', 0, 'Calle Los Olmos 456, Chillán', '909012345', 1, 1, 1),
('Cristóbal', 'Benjamín', 'Fuentes', 'Vidal', 'cristobal.fuentes@gmail.com', 'cristobal.fuentes@solumeds.cl', '31.123.456-2', '1994-02-28', 1, 'Av. Matta 789, Santiago', '910123456', 1, 2, 0),
('Daniela', 'Camila', 'Campos', 'Mena', 'daniela.campos@gmail.com', 'daniela.campos@solumeds.cl', '32.234.567-9', '1990-06-15', 0, 'Calle Los Robles 321, Concepción', '921234567', 1, 1, 1),
('Felipe', 'Ignacio', 'Alarcón', 'Bravo', 'felipe.alarcon@gmail.com', 'felipe.alarcon@solumeds.cl', '33.345.678-6', '1988-09-03', 1, 'Av. Colón 654, Santiago', '932345678', 1, 2, 0);

CREATE TABLE doctor(
    idDoctor INT PRIMARY KEY AUTO_INCREMENT,
    nombreDoctor VARCHAR(200)
);

INSERT INTO
    doctor (nombreDoctor)
VALUES
    ('Dr. Alejandro Martínez'),
    ('Dra. Valentina Rojas'),
    ('Dr. Gabriel Fuentes'),
    ('Dra. Camila Torres'),
    ('Dr. Ignacio Pérez'),
    ('Dra. Mariana Soto'),
    ('Dr. Sebastián Navarro'),
    ('Dra. Fernanda Castro'),
    ('Dr. Ricardo Delgado'),
    ('Dra. Isidora Molina');

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
    fechaDiagnostico DATE,
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

INSERT INTO
    vacuna (nombreVacuna, componenete)
VALUES
    ('ImmunoPlus', 'Proteína viral recombinante'),
    ('ViroGuard', 'ARN mensajero sintético'),
    ('BioShield', 'Vector adenoviral inactivado'),
    (
        'NanoVax',
        'Nanopartículas lipídicas con antígeno'
    ),
    (
        'PentaProtect',
        'Proteínas de cinco cepas virales'
    ),
    ('SafeShot', 'Virus atenuado inactivo'),
    ('AeroImmune', 'Fragmentos de cápside viral'),
    ('ImmuneBoost', 'ARN liposomal modificado'),
    (
        'RegenVax',
        'Proteínas recombinantes de superficie'
    ),
    (
        'VitaDefend',
        'Antígenos purificados de múltiples patógenos'
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

INSERT INTO
    principioActivo (nombrePrincipio)
VALUES
    ('Paracetamol'),
    ('Ibuprofeno'),
    ('Amoxicilina'),
    ('Ciprofloxacino'),
    ('Metformina'),
    ('Lisinopril'),
    ('Omeprazol'),
    ('Aspirina'),
    ('Prednisona'),
    ('Salbutamol'),
    ('Levotiroxina'),
    ('Simvastatina'),
    ('Claritromicina'),
    ('Lorazepam'),
    ('Fluconazol'),
    ('Dextrometorfano'),
    ('Hidroclorotiazida'),
    ('Losartán'),
    ('Alprazolam'),
    ('Metronidazol');

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

INSERT INTO
    medicamento (nombreMedicamento, idPrincipio, idFormato, dosis)
VALUES
    ('Kitadol', 1, 1, 500),
    ('Ibucare', 2, 1, 400),
    ('AmoxiPlus', 3, 3, 250),
    ('CiproFast', 4, 3, 500),
    ('GlucoMet', 5, 1, 850),
    ('CardioLisin', 6, 1, 10),
    ('Omepral', 7, 1, 20),
    ('AspiRed', 8, 1, 100),
    ('PredniSol', 9, 1, 5),
    ('VentolinX', 10, 2, 2),
    ('ThyroLev', 11, 1, 50),
    ('CholSim', 12, 1, 20),
    ('ClariMax', 13, 3, 250),
    ('LoraCalm', 14, 1, 1),
    ('FlucoMed', 15, 3, 150),
    ('TosNoX', 16, 2, 5),
    ('HydroDiur', 17, 1, 25),
    ('LosartanEx', 18, 1, 50),
    ('AlprazRest', 19, 1, 0.5),
    ('MetroClean', 20, 3, 500);

CREATE TABLE receta(
    idReceta INT PRIMARY KEY AUTO_INCREMENT,
    idPaciente INT NOT NULL,
    fecha DATE,
    idDoctor INT,
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente),
    FOREIGN KEY (idDoctor) REFERENCES doctor(idDoctor)
);

INSERT INTO
    receta(idPaciente, fecha, idDoctor)
VALUES
    (1, '2025-11-24', 2),
    (1, '2025-11-20', 2);

CREATE TABLE detallereceta(
    idReceta INT,
    idMedicamento INT,
    dias INT NOT NULL,
    frecuencia INT NOT NULL,
    horaInicio time,
    comentario text,
    PRIMARY KEY (idReceta, idMedicamento),
    FOREIGN KEY (idReceta) REFERENCES receta(idReceta),
    FOREIGN KEY (idMedicamento) REFERENCES medicamento(idMedicamento)
);

INSERT INTO
    detallereceta (
        idReceta,
        idMedicamento,
        dias,
        frecuencia,
        horaInicio
    )
VALUES
    -- Receta 1: tratamiento general
    (1, 1, 7, 8, '08:00:00'),
    -- FortaParac 500 mg cada 8h por 7 días
    (1, 2, 7, 12, '09:00:00'),
    -- Ibucare 400 mg cada 12h
    (1, 7, 14, 24, '08:00:00'),
    -- Omepral 20 mg diario
    (1, 8, 30, 24, '08:30:00'),
    -- AspiRed 100 mg diario
    (1, 6, 30, 24, '09:00:00'),
    -- CardioLisin 10 mg diario
    -- Receta 2: paciente con infección respiratoria y control general
    (2, 3, 10, 8, '07:00:00'),
    -- AmoxiPlus 250 mg cada 8h por 10 días
    (2, 13, 7, 12, '08:00:00'),
    -- ClariMax 250 mg cada 12h por 7 días
    (2, 10, 14, 6, '06:00:00'),
    -- VentolinX inhalador cada 6h por 14 días
    (2, 15, 10, 24, '22:00:00'),
    -- FlucoMed 150 mg diario por 10 días
    (2, 14, 10, 24, '21:00:00');

CREATE TABLE intervencion(
    idIntervencion INT PRIMARY KEY AUTO_INCREMENT,
    nombreIntervención VARCHAR(200)
);

INSERT INTO
    intervencion (nombreIntervención)
VALUES
    ('Apendicectomía'),
    ('Colecistectomía'),
    ('Histerectomía'),
    ('Cirugía cardíaca abierta'),
    ('Traqueotomía'),
    ('Artroplastia de rodilla'),
    ('Cirugía de hernia inguinal'),
    ('Cirugía de cataratas'),
    ('Cirugía laparoscópica de vesícula'),
    ('Biopsia quirúrgica');

CREATE TABLE intervecnionpaciente(
    idPaciente INT,
    idIntervencion INT,
    idDoctor INT,
    fechaIntervencion DATE,
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
    (12, 'Prueba de niveles de tiroides (TSH, T3, T4)');

CREATE TABLE examenpaciente(
    idPaciente INT,
    idExamen INT,
    fecha DATE,
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

INSERT INTO
    enfermedadcronica (nombreEnfermedad)
VALUES
    ('Diabetes'),
    ('Hipertensión'),
    ('Asma'),
    ('Enfermedad cardíaca'),
    ('Artritis');

CREATE TABLE enfermedadcronicapaciente(
    idPaciente INT,
    idEnfermedadCronica INT,
    fechaDiagnostico DATE,
    PRIMARY KEY (idPaciente, idEnfermedadCronica),
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente),
    FOREIGN KEY (idEnfermedadCronica) REFERENCES enfermedadcronica(idEnfermedadCronica)
);