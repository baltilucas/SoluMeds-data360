#!/bin/bash
set -e

# Variables
NODE_VERSION="20"
DB_NAME="fichasmedicas"
DB_USER="root"
DB_PASS="123456"
BACKEND_DIR="backend"
SQL_FILE="db/modelo.sql"
IONIC_DIR="Front-Ionic"

echo "=== Actualizando repositorios e instalando dependencias básicas ==="
sudo apt update
sudo apt install -y curl wget build-essential mysql-server mysql-client

echo "=== Instalando NVM ==="
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "=== Instalando Node.js $NODE_VERSION ==="
nvm install $NODE_VERSION
nvm use $NODE_VERSION
nvm alias default $NODE_VERSION

echo "=== Instalando dependencias del backend ==="
if [ -d "$BACKEND_DIR" ]; then
  cd "$BACKEND_DIR"
  npm install
  cd ..
else
  echo "Directorio $BACKEND_DIR no encontrado, saltando npm install"
fi

echo "=== Configurando MySQL ==="
sudo systemctl start mysql

# Configurar root con contraseña y permisos completos
sudo mysql <<EOF
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '${DB_PASS}';
FLUSH PRIVILEGES;
EOF

echo "=== Creando base de datos $DB_NAME ==="
mysql -u $DB_USER -p$DB_PASS -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME};"

if [ -f "$SQL_FILE" ]; then
  echo "=== Importando SQL desde $SQL_FILE ==="
  mysql -u $DB_USER -p$DB_PASS $DB_NAME < "$SQL_FILE"
else
  echo "Archivo $SQL_FILE no encontrado, saltando importación SQL"
fi

echo "=== Instalando dependencias de Ionic ==="
if [ -d "$IONIC_DIR" ]; then
  cd "$IONIC_DIR"
  npm install
  cd ..
else
  echo "Directorio $BACKEND_DIR no encontrado, saltando npm install"
fi

echo "=== ¡Setup completado! ==="
