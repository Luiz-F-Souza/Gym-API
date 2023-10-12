# Visão geral

## Iniciando o projeto

1. `npm init -y`
2. `npm i typescript -D`
    - `npx tsc --init` (trocar o target para es2020)
3. `npm i @types/node -D`
4. `npm i tsx -D` (compilador de typescript para javascript)
5. `npm i tsup -D` (Gera a versão de build da aplicação)
6. `npm i fastify` (O que prove meios de comunicação cliente/servidor)
7. `npm i dotenv` ( faz o parse do .env para usarmos como variaveis )
8. `npm i zod`
9. `npm i prisma -D` (é a interface de linha de comandos)
    - `npx prisma init`
    - Lembrar de instalar a extensão do vsCode para prisma
    - Lembrar de atualizar o json do vscode para liberar o prisma de identar
10. `npm i @prisma/client`
11. `npm i bcryptjs`
    - `npm i @types/bcryptjs -D`
12. `npm i vitest -D`
13. `npm i vitest-tsconfig-paths -D`
    - Criar `vite.config.ts`
14. `npm i @vitest/ui -D`
15. Lembrar de criar o `.gitignore` com o node_modules, build e .env
16. Iniciar a instancia do app com `const app = fastify()`
17. Lembrar de criar os scripts dentro do package.json
    - `"dev": "tsx watch src/server.ts"` (inicia servidor de desenvolvimento)
    - `"build": "tsup src --out-dir build"` (faz a build na pasta build)
    - `"start": "node build/server.js"` (inicia para produção)

## Dica

1. Criar o useCase
2. Criar o teste do useCase (sempre em mvp e dps ir refatorando o teste e os códigos)
