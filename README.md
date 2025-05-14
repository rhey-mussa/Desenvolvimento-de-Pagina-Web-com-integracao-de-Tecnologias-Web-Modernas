Gestão de Jogadores de Futebol
Bem-vindo ao projeto Gestão de Jogadores de Futebol! Eu, Rhey Mussa, desenvolvi esta aplicação web para gerenciar informações de jogadores de futebol, permitindo o cadastro e visualização de jogadores, consultoria via chat com um bot, e comunicação em tempo real entre usuários e administradores. O sistema é ideal para gestores de clubes, jogadores, e treinadores, com uma interface simples e responsiva.

Funcionalidades
Login: Autenticação para usuários e administradores.
Cadastro de Usuários: Registro de novos usuários via cadastrese.html.
Cadastro de Jogadores: Administradores podem adicionar jogadores com nome, posição, clube, idade, e nacionalidade.
Visualização de Jogadores: Lista todos os jogadores cadastrados.
Chat com Bot: Usuários fazem até 6 perguntas sobre prevenção, recuperação, ou lesões, com respostas automáticas.
Chat com Administradores: Comunicação em tempo real entre usuários e administradores.
Estatísticas, Dicas, e Mais: Páginas com estatísticas, dicas, jogadores europeus, e informações sobre o projeto.
Responsividade: Interface adaptada para dispositivos móveis e desktops.
Pré-requisitos
Para rodar o projeto localmente, você precisa:

Node.js (versão 14 ou superior, baixe em https://nodejs.org)
npm (incluso com Node.js)
Navegador web (Chrome, Firefox, ou Edge)
Git (opcional, para clonar o repositório)
Instalação
Clone o repositório ou baixe os arquivos:
bash

Copy
git clone https://github.com/rheymussa/gestao-jogadores.git
cd gestao-jogadores
Instale as dependências:
bash

Copy
npm install
Como Executar
Navegue até a pasta do projeto:
bash

Copy
cd C:\Users\Mussaldyne Rhey Muss\Desktop\projeto-pagina-web
Inicie o servidor:
bash

Copy
npm start
Abra http://localhost:3001 no navegador.
Nota: Certifique-se de que os arquivos public/admins.json, public/users.json, e public/jogadores.json existem e têm permissões de leitura/escrita. Exemplo de conteúdo:

admins.json: [{"email":"rhey@example.com","nome":"Rhey Mussa","senha":"admin123"}]
users.json: [{"email":"antonio@example.com","nome":"Antonio","senha":"user123"}]
jogadores.json: [{"id":"uuid-a1b2","nome":"João","posicao":"Atacante","clube":"Flamengo","idade":25,"nacionalidade":"Brasil"}]
Hospedagem
O projeto está hospedado no Render. Acesse em: https://gestao-jogadores.onrender.com (substitua pelo URL real após o deploy).

Para hospedar no Render:

Envie o projeto para um repositório GitHub:
bash

Copy
cd C:\Users\Mussaldyne Rhey Muss\Desktop\projeto-pagina-web
git add .
git commit -m "Deploy inicial"
git push origin main
No Render:
Crie um Web Service vinculado ao repositório.
Configure:
Environment: Node.js
Build Command: npm install
Start Command: npm start
Faça o deploy.
Estrutura do Projeto
text

Copy
/projeto-pagina-web
├── /public
│   │── estilo.css
│   ├── admins.json
│   ├── users.json
│   ├── jogadores.json
│   ├── index.html
│   ├── login.html
│   ├── cadastrese.html
│   ├── cadastro.html
│   ├── visualizar.html
│   ├── chat.html
│   ├── conversar-admin.html
│   ├── estatisticas.html
│   ├── dicas.html
│   ├── jogadores.html
│   └── sobre.html
├── /server
│   ├── app.js
│   └── routes.js
├── package.json
└── README.md
/public: Arquivos HTML, CSS, e JSON.
/server: Servidor Express e rotas.
package.json: Dependências e scripts.
Tecnologias Utilizadas
Front-end: HTML5, CSS3, Bootstrap 5.3.3, JavaScript (ES6)
Back-end: Node.js, Express, WebSocket (ws)
Outros: UUID, JSON para armazenamento
Testes
Para testar, siga estes passos:

Login:
Acesse login.html.
Use rhey@example.com (Administrador, senha: admin123) ou antonio@example.com (Usuário, senha: user123).
Chat com Bot:
Em chat.html, envie perguntas como "Como prevenir lesões?".
Após 6 perguntas, o sistema redireciona para conversar-admin.html.
Chat com Administradores:
Em conversar-admin.html, teste mensagens entre dois navegadores.
Cadastro/Visualização:
Cadastre um jogador em cadastro.html (administrador).
Veja a lista em visualizar.html.
Responsividade:
Teste em dispositivos móveis ou no modo responsivo do Chrome.
Para limpar o limite de perguntas:

javascript

Copy
sessionStorage.setItem('perguntaCount', '0');
Contribuição
Se quiser contribuir:

Faça um fork do repositório.
Crie uma branch (git checkout -b feature/nova-funcionalidade).
Envie um pull request com as mudanças.
Entre em contato comigo para discutir ideias ou melhorias.

Autor
Rhey Mussa

Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para detalhes (crie um se necessário).