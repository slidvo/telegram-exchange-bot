#!/bin/bash
# Инициализация npm
npm init -y
# Установка зависимостей
npm install -D typescript ts-node @types/node
npm install -D nodemon
npm install -D tsx
# Инициализация TypeScript
npx tsc --init
# Создание структуры проекта
mkdir -p src
echo "console.log('Hello World')" > src/index.ts
echo "# Project Initialization" > README.md
echo "" >> README.md
echo "Этот проект содержит два вспомогательных скрипта:" >> README.md
echo "- \`setup.ps1\` и \`setup.sh\` — скрипты для инициализации структуры проекта." >> README.md


# Создание nodemon.json
cat > nodemon.json <<EOF
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node dist/index.ts"
}
EOF
# Обновление package.json
sed -i 's/"type": "commonjs"/"type": "module"/' package.json
sed -i 's/"scripts": {/"scripts": {\n    "dev": "npx tsc \&\& node dist\/index.js",\n    "build": "tsc",\n    "start": "node dist\/index.js",/' package.json
# Создание .gitignore
echo -e "node_modules\ndist\n" > .gitignore
# Обновление tsconfig.json
sed -i 's/"types": \[\],/"types": ["node"],/' tsconfig.json
sed -i 's#// "rootDir": "./src",#"rootDir": "./src",#' tsconfig.json
sed -i 's#// "outDir": "./dist",#"outDir": "./dist",#' tsconfig.json
# Git
rm -rf .git
git init
git add .
git commit -m "initial commit"
# Запуск dev
npm run dev
echo "======================================"
echo "   Инициализация проекта завершена!   "
echo "======================================"





Для автоматического запуска после сохранения
npm install -D nodemon

{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/index.ts"
}

но надо выполнить потом npm run dev
после обновления package.json
{...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
     "dev": "nodemon"
  },
