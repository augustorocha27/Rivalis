# Rivalis

## Integrantes do Grupo

| Nome | RM / Matrícula | Função no Projeto |
|---|---|---|
| Augusto Rocha Silva | RM556316 | Desenvolvimento Front-end |
| Guilherme Vieira Augusto | RM557264 | Desenvolvimento Back-end |
| Erik Yuuta Goto | RM558076 | UX/UI e Prototipação |
| Wendell dos Santos Silva | RM558859 | Testes e Validação |

---

## Sobre o Projeto

O **Rivalis** é uma aplicação desenvolvida para apoiar colaboradores da Ford em análises comparativas entre veículos Ford e concorrentes diretos do mercado.

A proposta do projeto é transformar dados técnicos, como marca, modelo, ano, categoria, potência, torque e desempenho, em uma experiência visual, rápida e objetiva para uso no dia a dia de trabalho.

O sistema foi pensado para auxiliar equipes internas em atividades como benchmarking, argumentação comercial, treinamentos, análise competitiva e tomada de decisão baseada em dados.

---

## Objetivo do Projeto

O objetivo do Rivalis é fornecer uma plataforma interna para comparação de veículos, permitindo que colaboradores consultem rapidamente como modelos Ford se posicionam frente a concorrentes de mercado.

A aplicação foi pensada para uso corporativo, com foco em:

- Comparação técnica entre veículos;
- Apoio à preparação comercial;
- Benchmarking de concorrentes;
- Visualização clara de dados automotivos;
- Apoio à tomada de decisão baseada em dados;
- Consulta rápida durante atividades internas;
- Padronização da análise competitiva entre equipes.

---

## Público-Alvo

O Rivalis foi desenvolvido para uso interno por colaboradores da Ford, especialmente em contextos como:

- Áreas comerciais;
- Equipes de treinamento;
- Times de produto;
- Análise de concorrência;
- Preparação de apresentações;
- Apoio a decisões internas;
- Consulta técnica rápida.

---

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

---

## Funcionalidades

### Landing Page

A página inicial apresenta o Rivalis como uma solução interna de comparação veicular, com visual inspirado em tecnologia automotiva e estética azul escura.

A landing page possui:

- Header com navegação;
- Botão de login;
- CTA para iniciar comparação;
- Apresentação do projeto;
- Acesso às áreas internas;
- Footer institucional;
- Layout responsivo para desktop, tablet e celular.

---

### Login Simulado

O projeto possui um processo de autenticação simulada.

O usuário precisa efetuar login antes de acessar a pesquisa de comparação. Caso tente pesquisar sem estar autenticado, o sistema exibe o pop-up de login.

Após o login, o botão **Login** é substituído pelo nome do usuário autenticado no header.

O login exige:

- Nome;
- Email válido;
- Senha com no mínimo 4 caracteres.

---

### Comparador de Concorrentes

O usuário pode iniciar uma comparação informando:

- Marca;
- Modelo;
- Ano.

Após o preenchimento dos dados e validação do login, o sistema direciona o usuário para a página de resultados da comparação.

---

### Página de Resultados

A página de resultados exibe os veículos concorrentes encontrados com base nas informações pesquisadas.

Os resultados são apresentados de forma visual e organizada, permitindo analisar os concorrentes com base em critérios técnicos e comparativos.

---

### Páginas Internas

O projeto possui páginas internas específicas para organizar melhor as informações da aplicação:

- Uso Interno;
- Fluxo;
- Análises;
- FAQ;
- Resultados;
- Obrigado;
- Esgotado.

---

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
- Uso de variáveis de ambiente para informações sensíveis;
- Validação de entrada para reduzir riscos de dados inválidos.

---

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
```

---

## Como Executar o Front-end

Acesse a pasta do front-end:

```bash
cd rivalis
```

Instale as dependências:

```bash
npm install
```

Execute o projeto no navegador:

```bash
npx expo start --web --clear --localhost
```

Depois, acesse no navegador:

```txt
http://localhost:8081
```

---

## Como Executar o Back-end

Acesse a pasta da API:

```bash
cd rivalis-security-api
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` com as variáveis necessárias:

```env
PORT=3333
NODE_ENV=development
JWT_SECRET=rivalis_dev_secret_123
ALLOWED_ORIGINS=http://localhost:8081,http://localhost:19006,http://localhost:3000
```

Execute a API:

```bash
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:3333
```

Para testar se está funcionando, acesse:

```txt
http://localhost:3333/health
```

---

## Principais Rotas da Aplicação

```txt
/              Página inicial
/uso-interno   Página de uso interno
/fluxo         Página de fluxo de trabalho
/analises      Página de análises
/faq           Página de perguntas frequentes
/resultados    Página de resultados da comparação
/obrigado      Página de confirmação
/esgotado      Página de acesso encerrado
```

---

## Principais Endpoints da API

### Verificação da API

```http
GET /health
```

Retorna o status da API.

---

### Login

```http
POST /api/auth/login
```

Exemplo de corpo da requisição:

```json
{
  "name": "Usuário Rivalis",
  "email": "usuario@ford.com",
  "password": "1234"
}
```

---

### Comparação

```http
POST /api/compare
```

Essa rota exige autenticação via Bearer Token.

Exemplo de corpo da requisição:

```json
{
  "brand": "Ford",
  "model": "Ranger",
  "year": "2025"
}
```

---

## Fluxo de Uso

O fluxo principal da aplicação funciona da seguinte forma:

```txt
Usuário acessa a landing page
↓
Clica em Login
↓
Realiza autenticação simulada
↓
Nome do usuário aparece no header
↓
Usuário clica em Comparar Concorrentes
↓
Preenche Marca, Modelo e Ano
↓
Sistema direciona para a página de resultados
↓
Usuário visualiza os concorrentes analisados
```

---

## Responsividade

O projeto foi adaptado para funcionar em diferentes tamanhos de tela, incluindo:

- Desktop;
- Notebook;
- Tablet;
- Celular.

Foram realizados ajustes em:

- Header;
- Menu de navegação;
- Cards;
- Footer;
- Modal de login;
- Aba de pesquisa;
- Página de resultados;
- Páginas internas.

O layout busca manter boa legibilidade, organização visual e usabilidade em dispositivos móveis.

---

## Diferencial do Projeto

O diferencial do Rivalis está em transformar dados técnicos automotivos em uma visualização simples, moderna e acessível.

Em vez de apresentar apenas tabelas ou fichas técnicas isoladas, o sistema organiza os dados em uma experiência voltada para comparação direta, facilitando a análise de concorrentes e destacando pontos relevantes para o uso corporativo.

---

## Status do Projeto

O Rivalis está em fase de MVP.

Nesta versão, o foco está em validar:

- Interface principal;
- Fluxo de autenticação;
- Comparação de veículos;
- Página de resultados;
- Estrutura de segurança da API;
- Experiência de uso interno;
- Responsividade em diferentes dispositivos.

---

## Melhorias Futuras

Algumas melhorias planejadas para versões futuras incluem:

- Integração com base real de veículos;
- Dashboard administrativo;
- Histórico de comparações;
- Filtros avançados por categoria;
- Exportação de relatórios;
- Controle de perfis de usuário;
- Integração com serviços internos;
- Melhorias na precisão dos dados técnicos;
- Monitoramento e logs de auditoria;
- Integração com banco de dados;
- Controle de permissões por perfil de colaborador.

---

## Observação

Este projeto foi desenvolvido como MVP acadêmico/profissional para demonstrar uma solução de comparação veicular com foco em uso interno e apoio à análise competitiva.

Os dados utilizados podem ser simulados e devem ser substituídos por fontes oficiais em ambiente de produção.

---

## Autor

Desenvolvido pelo grupo:

- Augusto Rocha Silva;
- Guilherme Vieira Augusto;
- Erik Yuuta Goto;
- Wendell dos Santos Silva.
