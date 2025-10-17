CREATE TABLE nacionalidad(
    idNacionalidad INT PRIMARY KEY AUTO_INCREMENT,
    pais VARCHAR(100)
);

INSERT INTO
    nacionalidad(pais)
VALUES
    ("CHILE"),
    ('PERU'),
    ('VENEZUELA'),
    ('ARGENITNA');


CREATE TABLE paciente(
    idPaciente INT PRIMARY KEY AUTO_INCREMENT,
    nombrePaciente VARCHAR(50),
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
        nombrePaciente,
        rut,
        fechaNacimiento,
        sexo,
        direccion,
        telefono,
        idNacionalidad
    )
VALUES
    (
        'Cristian Valenzuela',
        '20496709-1',
        '2000-10-10',
        1,
        'Los Olivos 1234',
        '987654321',
        1
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
    nombre VARCHAR(200)
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


