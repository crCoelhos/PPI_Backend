# uniPro-Backend

## (21/05)

Rotas usuario

- [x] (POST) Criacao conta
- [x] (POST) Login
- [ ] Logout (implementacao Front)

Models

- [x] Criacao User(Nome, email, senha, contato, cpf, nascimento)
- [x] Cricao Role(Cargo, descricao)
- [x] Criacao User_roles (user ObjectID: ref:User; role ObjectID: ref:role)

## Rota Admin

- [x] (PUT) modificar usuarios [cargos, dados]
- [x] (GET) todos usuarios

16 anos pode participar mais sem alcool, abaixo de 16 precisa de termo assinado pelos pais (envio de foto do termo)? a pensar???

- Logica para enviar email por usuario.

enviar por front todos os ingresso? ou quando abrir o evento mostrar os ingresso, caso tenha passado da data dizer que esgotou e caso tenha passado.

npx sequelize-cli migration:generate --name (nome)

- upload da imagem do documento do usuário;
- upload da imagem do evento;
- upload da imagem da atlética;
- quando for fazer imagem do documento, faz imagem do evento também
