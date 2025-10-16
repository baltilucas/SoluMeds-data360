#!/bin/bash


DB_NAME="fichasmedicas"
echo "Comenzando reescritura de "

mysql -u root -p -e "DROP DATABASE IF EXIST ${DB_NAME};CREATE DATABASE ${DB_NAME};"

echo "'$DB_NAME' Eliminada"

echo "'$DB_NAME' Creada"

mysql -u root -p ${DB_NAME} < db/modelos.sql

echo "Esquema ingresado"


