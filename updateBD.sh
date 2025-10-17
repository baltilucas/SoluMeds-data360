#!/bin/bash


DB_NAME="fichasmedicas"
echo "Comenzando reescritura de Base de Datos"

mysql -u root -p -e "DROP DATABASE IF EXISTS ${DB_NAME};"

echo "'$DB_NAME' Eliminada"

mysql -u root -p -e "CREATE DATABASE ${DB_NAME};"

echo "'$DB_NAME' Creada"

mysql -u root -p ${DB_NAME} < db/modelo.sql

echo "Esquema ingresado"


