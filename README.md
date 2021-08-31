<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![thennull][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/thennull/Oficina">
    <img src="images/oficina.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Oficina</h3>

  <p align="center">
    Uma API REST para criação de ordens de serviço, onde a base de dados está em mongoDB bem como o restante da API está em express. Neste ambiente é possível cadastrar clientes, funcinários e administradores. A authenticação dos usuários é realizada via token JWT (client side token authentication).
  OBS: Dentro do código eu utilizo referências em Inglês e alguns comentários em Inglês. Primeiro por que eu quero... kidding! Tenho este hábito em projetos onde eu sou o único responsável, escrevo e leio em Inglês sem problema algum, acho mais simples e direto e muitas vezes less typing!
    <br />
    <br />
    <a href="https://documenter.getpostman.com/view/16421781/TzzBpvki"><strong>Veja os docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/thennull/Oficina/issues">Report Bug</a>
    ·
    <a href="https://github.com/thennull/Oficina/issues">Request Feature</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## Sobre o Projeto

A idéia do projeto surgiu a partir da necessidade de uma oficina da cidade de Itabira, em organizar suas ordens de serviço, clientes, serviços e produtos de uma maneira consolidada e com uma base de dados local através de um sistema que pudesse otimizar o processo, gerar histórico, relatórios, envio de emails e etc. Uma completa modernização do processo que anteriormente era manual. No projeto original a base de dados está em PostgreSQL além de outras pequenas diferenças que por motivos óbvios não estão aqui. Neste repositório está um sistema backend completo conforme descrito acima, porém simplificado em relação ao original utilizado no cliente, como por exemplo a base de dados, que esta em MongoDB aqui.

<!-- GETTING STARTED -->

## Primeiros Passos

Para ter uma cópia local deste repositório, faça conforme abaixo:

### Prerequisitos

- npm
  ```sh
  npm install npm@latest -g
  ```

### Instalação

1. Clone the repo
   ```sh
   git clone https://github.com/thennull/Oficina.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<!-- USAGE EXAMPLES -->

## Como utilizar

Você vai precisar que seu ambiente tenha instalado: Node.JS >= 12, MongoDB = 3.6.8, npm = 7.19.1 e o git.
Depois que realizar o clone do repositório conforme descrito em "Instalação", basta realizar o start do server:

```sh
npm start
```

Isso vai rodar a versão de produção do ambiente.

<!-- ROADMAP -->

## Descrição

Por se tratar de uma api REST você terá os seguintes pontos de entrada via HTTP:

```sh
/api/v1/servicos
/api/v1/produtos
/api/v1/users
/api/v1/carros
/api/v1/manutencoes
```

Você deve alterar a porta onde seu server vai ouvir por conexões e seu hostname no arquivo:
config/config.env

```sh
PORT=3000
SERVER=http://localhost
```

Para importar os dados utilizados no projeto, utilize o script abaixo:

```sh
cd utils/
node mongoImport.js --create
```

Obs: Este script foi criado para ser uma forma simples de importar e deletar toda a base durante o desenvolvimento.

<!-- CONTRIBUTING -->

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Marcio Lage - [@thennull](https://twitter.com/thennull) - marcin.lage@gmail.com

Project Link: [https://github.com/thennull/Oficina](https://github.com/github_username/repo_name)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/thennull/Oficina.svg?style=for-the-badge
[contributors-url]: https://github.com/thennull/Oficina/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/thennull/repo.svg?style=for-the-badge
[forks-url]: https://github.com/thennull/Oficina/network/members
[stars-shield]: https://img.shields.io/github/stars/thennull/Oficina.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/Oficina/stargazers
[issues-shield]: https://img.shields.io/github/issues/thennull/Oficina.svg?style=for-the-badge
[issues-url]: https://github.com/thennull/Oficina/issues
[license-shield]: https://img.shields.io/github/license/thennull/Oficina.svg?style=for-the-badge
[license-url]: https://github.com/github_username/Oficina/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/márcio-lage-pereira-júnior
