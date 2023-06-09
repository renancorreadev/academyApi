# App

Gympass style app 

## Workflows

- [x] Alinhar Requisitos e planejamento;
- [x] Inicializar projeto;
- [x] Inicializar Node e servidor;
- [x] Configurar Eslint
- [x] Configurar docker com prisma and postgresql
- [x] Criar Rota de criacao de usuarios
- [x] Aplicar DDD e separar Servicos e Controllers
- [x] Aplicar Inversão de dependencia (SOLID)
- [x] Criar Errors Handlers para os casos de usos (servicos)
- [x] Criar testes unitarios


## RFS (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se authenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o numero de check-ins realizado pelo usuário logado;
- [] Deve ser possível obter o usuário obter seu histórico de check-ins;
- [] Deve ser possível o usuário buscar academias próximas;
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possível o usuário realizar check-in em uma academia;
- [] Deve ser possível validar o check-in de um usuário;
- [] Deve ser possível cadastrar uma academia;

## RNS (Regras de Negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail cadastrado;
- [x] o usuário não pode fazer 2 check-ins no mesmo dia;
- [] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [] O check-in só pode ser validado  até 20 minutos após criado;
- [] O check-in só pode ser validado por administradores;
- [] A Academia só pode ser cadastrada por administradores;
  

## RNFs (Requisitos não Funcionais)

- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostGreeSQL;
- [] Todas listas de dados precisam estar paginadas com 20 items por página;
- [] O usuário deve ser idêntificado por um JWT (Json Web Token);