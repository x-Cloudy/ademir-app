#!/bin/bash
# Script de deploy para mover os arquivos build da SPA para o diretório do Nginx

# Diretórios
SOURCE_DIR="/root/projeto/ademir-app/quasar-project/dist/spa"
DEST_DIR="/var/www/html/quasar-app"

# Opção: se desejar, você pode executar o build antes de mover os arquivos
cd /root/projeto/ademir-app/quasar-project
echo "Iniciando o build..."
quasar build
echo "Build concluído."

echo "Removendo arquivos antigos no destino..."
sudo rm -rf ${DEST_DIR}/*

echo "Movendo arquivos do build para o diretório de publicação..."
sudo mv ${SOURCE_DIR}/* ${DEST_DIR}/

echo "Deploy concluído com sucesso!"
