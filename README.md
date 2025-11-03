# SoluMeds-data360

El proyecto es un ejercicio de desarrollo de 3 vistas y perfiles de uso de un sistema de menejo de datos de fichas medicas para usuarios, esto tiene el objetivo de potencialmente unificar los datos de pacientes, permitiendoles acceder facilmente a sus datos personales y por otro lado a los investigadores del área de datos acceder a datos reales dados consensuadamente.

Su backend está en express.js y tiene 3 perfiles principales, desarrollados en Ionic, Laravel y Flutter.

### Backend ExpressJS

Se tiene un backend en express, para ejeuctarlo basta con tener NodeJs instalado en versión 20 o superior y posteriormente ejecutar en la carpeta backend

```bash
npm install
```

Luego basta con ejecutar `node app.js` o bien

```bash
npm start
```


## Ionic - Perfil de Paciente

El objetivo es brindar a pacientes y usuarios del sistema de salud publico y privada un acceso sencillo a sus datos médicos, examenes e historial.

Para la instalación se requiere node en versión 20 o superior, posteriormente se instala ionic de manera global ejecutando:

```bash
npm install -g @ionic/cli
```

Verificando instalación:

```bash
ionic --version
```


Posteriormente aplicar una instalación de paquetes necesarios utilizando

```bash
npm install
```

Finalmente para ejecutar el MVP se utiliza:

```bash
ionic serve
```

También es valido `ionic s`.

