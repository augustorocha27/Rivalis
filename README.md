| Nome | RM / Matrícula | Função no Projeto |
|---|---|---|
| Augusto Rocha Silva | RM556316| Desenvolvimento Front-end |
| Guilherme Vieira Augusto | RM557264 | Desenvolvimento Back-end |
| Erik Yuuta Goto | RM558076 | UX/UI e Prototipação |
| Wendell dos Santos Silva | RM558859 | Testes e Validação |

# Rivalis

O **Rivalis** é uma aplicação desenvolvida para apoiar colaboradores da Ford em análises comparativas entre veículos Ford e concorrentes diretos do mercado.

A proposta do projeto é transformar dados técnicos, como modelo, ano, categoria, potência, torque e desempenho, em uma experiência visual, rápida e objetiva para uso no dia a dia de trabalho, auxiliando em benchmarking, argumentação comercial, treinamentos internos e análise competitiva.

## Objetivo do Projeto

O objetivo do Rivalis é fornecer uma plataforma interna para comparação de veículos, permitindo que funcionários consultem rapidamente como modelos Ford se posicionam frente a concorrentes de mercado.

A aplicação foi pensada para uso corporativo, com foco em:

- Comparação técnica entre veículos;
- Apoio à preparação comercial;
- Benchmarking de concorrentes;
- Visualização clara de dados automotivos;
- Apoio à tomada de decisão baseada em dados;
- Consulta rápida durante atividades internas.

## Tecnologias Utilizadas

### Front-end

- React Native
- Expo
- TypeScript
- React Navigation
- Expo Linear Gradient
- Lucide React Native
- Expo Haptics
- Moti
- Gorhom Bottom Sheet

### Back-end

- Node.js
- Express
- TypeScript
- JWT para autenticação simulada
- Helmet para headers de segurança
- CORS configurado
- Express Rate Limit
- Zod para validação de dados
- Dotenv para variáveis de ambiente

## Funcionalidades

### Landing Page

A página inicial apresenta o Rivalis como uma solução interna de comparação veicular, com visual inspirado em tecnologia automotiva e estética azul escura.

Ela possui:

- Header com navegação;
- Botão de login;
- CTA para iniciar comparação;
- Apresentação do projeto;
- Acesso às áreas internas;
- Footer institucional.

### Login Simulado

O projeto possui um processo de autenticação simulado.

Após o login, o botão de login é substituído pelo nome do usuário autenticado no header.

O login exige:

- Nome;
- Email válido;
- Senha com no mínimo 4 caracteres.

### Comparador de Concorrentes

O usuário pode iniciar uma comparação informando:

- Modelo;
- Ano;
- Tipo do veículo, como Sedan, Hatch, SUV, Picape, Esportivo ou Utilitário.

Após a pesquisa, o sistema exibe uma página de resultados com os concorrentes analisados.

### Página de Resultados

A página de resultados apresenta os veículos concorrentes encontrados com base nos dados informados, exibindo informações de forma visual e organizada.

### Páginas Internas

O projeto também possui páginas específicas para:

- Uso Interno;
- Fluxo;
- Análises;
- FAQ;
- Obrigado;
- Esgotado.

## Segurança Implementada

O projeto contempla práticas de segurança voltadas para proteção de APIs e serviços.

Foram considerados os seguintes pontos:

- Uso obrigatório de HTTPS/TLS em ambiente de produção;
- Rate limiting e throttling para evitar abuso de requisições;
- CORS configurado corretamente para permitir apenas origens autorizadas;
- Autenticação baseada em token JWT;
- Validação dos dados recebidos no backend;
- Proteção contra manipulação de payloads;
- Separação entre front-end e back-end;
- Uso de variáveis de ambiente para informações sensíveis.

## Estrutura do Projeto

```txt
rivalis-mvp
├── rivalis
│   ├── App.tsx
│   ├── index.ts
│   ├── package.json
│   ├── src
│   │   ├── @types
│   │   ├── components
│   │   ├── data
│   │   ├── screens
│   │   ├── services
│   │   ├── theme
│   │   └── utils
│   └── tsconfig.json
│
└── rivalis-security-api
    ├── package.json
    ├── src
    │   └── server.ts
    └── .env
