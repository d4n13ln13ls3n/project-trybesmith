# Project Trybesmith
Projeto desenvolvido no módulo de Back-end da [Trybe](https://www.betrybe.com/). 

## ✏ Informações sobre o projeto
O objetivo deste projeto foi criar uma loja de itens medievais, no formato de uma API.
</br>
A aplicação foi desenvolvida com <strong>Node.js e TypeScript</strong>, utilizando a <strong>arquitetura MSC</strong> (Model, Service, Controller) e <strong>MySQL</strong> para realizar o CRUD (Create, Read, Update and Delete) dos itens.
Para fazer validações de entrada, foi utilizada a biblioteca <strong>Joi</strong> e para a gerar e autenticar token foi utilizado o JSON Web Token - <strong>JWT</strong>.

 <details>
 <summary> 🇬🇧 English here</summary>
 ## ✏ Information about the project
 The goal of this back-end project was to create a medieval items store, in an API format.
 </br>
 The application was developed with <strong>Node.js and Typescript</strong>, using <strong>MSC architecture</strong> (Model, Service and Controller) and <strong>MySQL</strong> to perform CRUD (Create, Read, Update and Delete) operations.
 To validate data input, the <strong>Joi</strong> library was used and to generate and authenticate tokens JSON Web Token - <strong>JWT</strong>.
 </details>
 
## 🛸 Principais tecnologias utilizadas / Main technologies used: 
- [Docker](https://www.docker.com/);
- [Express.js](https://expressjs.com/);
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript);
- [Joi](https://joi.dev/api/?v=17.6.0);
- [JWT(Autenticação)](https://jwt.io/);
- [MYSQL](https://www.mysql.com/);
- [mysql2](https://www.npmjs.com/package/mysql2);
- [Node.js](https://nodejs.org/en/);
- [TypeScript](https://www.typescriptlang.org/)

## ⚙ Instruções para rodar o projeto em sua máquina

<strong>1. Fazer o git clone na sua máquina e entrar no diretório:</strong>
 - Lembre-se de clonar o repositório no diretório desejado na sua máquina!
 ```
 git clone git@github.com:d4n13ln13ls3n/project-trybesmith.git
 cd project-trybesmith
 ```
 
 <strong>2. Escolher como rodar a aplicação: Docker vs Local</strong>

<details>
  <summary><strong>🐳 Rodando no Docker</strong></summary> 
  </br>

  **:warning: Seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**


  👉 <strong> 2.1 Executar os serviços `node` e `db` com o comando: </strong>
  ```
  docker-compose up -d --build
  ```

  :warning: Lembre-se de parar qualquer aplicação que estiver usando localmente na porta padrão (`3306`), seja docker ou mySQL, ou adapte, caso queira fazer uso da aplicação em containers;

  - Esses serviços irão inicializar um container chamado `trybesmith` e outro chamado `trybesmith_db`;

  - A partir daqui você pode rodar o container `trybesmith` via CLI ou abri-lo no VS Code;

  👉 <strong>2.2 Use o comando:</strong>
  ```
  docker exec -it trybesmith bash
  ```
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  👉 <strong>2.3 Instalar as dependências dentro do container com:</strong>
  ```
  npm install
  npm run debug
  ```
  
  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  - ✨ **Dica:** A extensão `Remote - Containers` (que estará na seção de extensões recomendadas do VS Code) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.

</details>

<details>
  <summary><strong> 💻 Localmente</strong></summary> 
</br>

👉 <strong>2.1 Instalar as dependências: </strong>
```
npm install
```

- **:warning: Atenção:** Não esqueça de renomear/configurar o arquivo `.env.example` para os testes locais funcionarem.
- **:warning: Atenção:** Para rodar o projeto desta forma, **obrigatoriamente** você deve ter o `Node.js` instalado em seu computador.
- **:warning: Atenção:** A versão do `Node.js` e `NPM` a ser utilizada é `"node": ">=16.0.0"` e `"npm": ">=7.0.0"`, como descrito na chave `engines` no arquivo `package.json`. Idealmente deve-se utilizar o Node.js na `versão 16.14`, versão na qual esse projeto foi testado.

  <br/>
 </details>
 
 ---
 
 ## ⚙ How to run the project on your computer

<strong>1. Run git clone and access the folder:</strong>
- Don't forget to clone the repository in the intended folder on your computer!
 ```
 git clone git@github.com:d4n13ln13ls3n/project-trybesmith.git
 cd project-trybesmith
 ```

<strong>2. Choose how to run the application: Docker vs Locally</strong>

<details>
    <summary><strong>🐳 Running with Docker</strong></summary>
    </br>

  **:warning: Your docker-compose must be in the version 1.29 or higher. [Read more at](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) or [in the documentation](https://docs.docker.com/compose/install/) on how to install it. In the first article, you can replace `1.26.0` with `1.29.2`.**

 👉 <strong> 2.1 Run the services `node` and `db` with the command : </strong>
  ```
  docker-compose up -d --build
  ```

  :warning: Don't forget to stop any application running locally in the default port (`3306`), be it Docker or mySQL, or adapt it, in case you want to run the application in containers;

- These services will start a container called `trybesmith` and another called `trybesmith_db`;

- From now on, you ca run the `trybesmith` container via CLI or open it on VS Code;

👉 <strong>2.2 Use the command:</strong>
  ```
  docker exec -it trybesmith bash
  ```

- It will give you access to the container interactive terminal created by docker compose, which is running in the background.

 👉 <strong>2.3 Install the dependencies in the container with:</strong>
  ```
  npm install
  npm run debug
  ```

  - **:warning: ** If you choose to use Docker, **ALL** commands available in `package.json` (npm start, npm test, npm run dev, ...) should be run **INSIDE** the container, that is, in the  terminal that appears after the above mentioned command `docker exec` is run. 

  - ✨ **Hint:** The extension `Remote - Containers` (available at VS Code's recommended extensions section) is indicated so you can develop your application in a Docker container directly on VS Code, like you do with your local files.

</details>

<details>
  <summary><strong> 💻 Locally</strong></summary> 
</br>

👉 <strong>2.1 Install the dependencies: </strong>
```
npm install
```

- **:warning: ** Don't forget to rename/configure the file `.env.example` so the local tests work properly.
- **:warning: ** To run the project like this, you **must** have `Node.js` installed on your computer.
- **:warning: ** `Node.js` and `NPM` versions to be used are: `"node": ">=16.0.0"` and `"npm": ">=7.0.0"`, as per the key `engines` in the file `package.json`. Ideally, Node.js should be used in the version `16.14`, in which this project was tested.

  <br/>
 </details>
 
 ---
© Desenvolvido por/ Developed by [Daniel Yabu](https://www.linkedin.com/in/daniel-yabu/) 
