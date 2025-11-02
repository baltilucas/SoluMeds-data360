#!/bin/bash


#!/bin/bash

DB_NAME="fichasmedicas"
read -s -p "Introduce la contraseña de MySQL: " DB_PASS
echo
echo "Comenzando reescritura de Base de Datos"

mysql -u root -p"${DB_PASS}" -e "DROP DATABASE IF EXISTS ${DB_NAME};"
echo "'$DB_NAME' eliminada"

mysql -u root -p"${DB_PASS}" -e "CREATE DATABASE ${DB_NAME};"
echo "'$DB_NAME' creada"

mysql -u root -p"${DB_PASS}" ${DB_NAME} < db/modelo.sql
echo "Esquema ingresado"

mysql -u root -p"${DB_PASS}" ${DB_NAME} < db/vistas.sql
echo "Vistas y procedimientos almacenados ingresados"