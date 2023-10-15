# Gym Api

A api tem como objetivo emular um sistema de checkins em academia, estilo gympass.
Focando bastante na métodologia TDD, SOLID e CLEAN CODE. Bem como implementa CI ao repositório.

## Tecnologias

- Node.js - Versão 18.18.0 (ou superior)
- Fastify
- TypeScript
- Prisma
- PostgreSQL
- Vitest
- Docker

***

## Instalação

1. Rode `npm i`
2. Rode `docker compose up --build` para rodar a imagem do docker
    - É necessário possuir o docker instalado em sua maquina.
3. Rode `npm run dev` para rodar o servidor em desenvolvimento

***

## Scripts

- `npm run dev`: Iniciar o servidor de desenvolvimento.
- `npm run build`: Gerar a build para produção (out-dir = build).
- `npm run start`: Rodar o servidor em produção.
- `npm run test`: Rodar os testes em tempo real pelo terminal.
- `npm run test:no-repeat`: Rodar os testes uma única vez pelo terminal.
- `npm run test:coverage`: Gerar coverage (média de cobertura) dos teste.
- `npm run test:unit`: Roda apenas testes unitários (dentro da pasta use-cases).
- `npm run test:e2e`: Roda apenas testes end to end (dentro da pasta http/controllers).
- `npm run test:unit:no-repeat`: Roda apenas testes unitários uma única vez (dentro da pasta use-cases).
- `npm run test:e2e:no-repeat`: Roda apenas testes end to end uma única vez (dentro da pasta http/controllers).
- `npm run test:ui`: Rodar testes com interface do vitest.
- `npm run test:ui:unit`:Rodar testes unitários com interface do vitest.
- `npm run test:ui:e2e`: Rodar testes e2e com interface do vitest.
- `npm run db`: Rodar prisma studio.

***

## Rotas


  app.get('/checkins/metrics', metrics)

  app.post('/gyms/:gymId/checkins', create)
  app.patch('/checkins/:checkinId/validate', validate)
#### GET

- `/me` (Retorna dados básicos do usuário)

    ```ts
       // Retorna o usuário através de seu id enviado pelo jwt
       // reply body
        {

            data: {
                user: {
                    id: string,
                    name: string,
                    email: string,
                    created_at: string
                }
            }
    
        }

    ```

- `/gyms/search?query=searchTerm&page=1`

    ```ts
       // Retorna o usuário através de seu id enviado pelo jwt
       // reply body
        {

            data: {
                gyms: Gyms[]
            }
    
        }

    ```

- `/gyms/nearby?latitude=userLatitude&longitude=userLongitude`

    ```ts
       // Retorna o usuário através de seu id enviado pelo jwt
       // reply body
        {

            data: {
                gyms: Gyms[]
            }
    
        }

    ```

- `/checkins/history` (Retorna checkins do usuário)

    ```ts
       // Retorna o usuário através de seu id enviado pelo jwt
       // reply body
        {

            data: {
                gyms: Checkins[]
            }
    
        }

    ```

#### Post

- `/users` (Criar usuários)

    ```ts
       // request body
        {
            name: string, 
            email: string, (email válido)
            password: string (mínimo 06 caractéres)
        }
    ```

- `/sessions` (Autenticar usuários)

    ```ts
        // request body
        {
            email: string, (email válido)
            password: string (mínimo 06 caractéres)
        }

        // Reply body
        {
            jwt:  string (token)
        }
    ```

- `/gyms` (Criar academia)

    ```ts
       // Enviar token junto na autenticação
       // request body
        {
            title: string,
            description: string | null,
            phone: string | null,
            latitude: number, // Latitude válida
            longitude: number // Longitude válida
        }
    ```

***

## Contato

[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lf-souza98/)

Luiz Felipe de Souza Barbosa

<luizfelipesouza1998@outlook.com>
