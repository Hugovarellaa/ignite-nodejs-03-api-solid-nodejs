# ignite-nodejs-03-api-solid-nodejs

# GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o numero de check-ins realizados pelo usuário logado
- [ ] Deve ser possível se o usuário obter seu histórico de check-ins
- [ ] Deve ser possível se o usuário obter academias próximas
- [ ] Deve ser possível se o usuário buscar academias pelo nome
- [x] Deve ser possível se o usuário realizar check-ins em uma academia
- [ ] Deve ser possível validar o check-ins de um usuário
- [ ] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio)

- [x] O usuário não deve pode ser cadastrar com um e-mail duplicado
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia
- [ ] O usuário não pode fazer check-ins se nao estiver perto (100m) da academia
- [ ] O check-ins so pode ser validado até 20 minutos após criado
- [ ] O check-ins so pode ser validado por administradores
- [ ] A academia so pode ser cadastrada por administradores

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa esta criptografada
- [x] Os dados da aplicação precisa esta persistidos em um banco PostgreSQL
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por pagina
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)
