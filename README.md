<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="Task Manager" />

  &#xa0;

  <!-- <a href="https://taskmanager.netlify.app">Demo</a> -->
</div>

<h1 align="center">Task Manager</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/nkosi-tauro/task-manager?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/nkosi-tauro/task-manager?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/nkosi-tauro/task-manager?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/nkosi-tauro/task-manager?color=56BEB8">

  <!-- <img alt="Github issues" src="https://img.shields.io/github/issues/nkosi-tauro/task-manager?color=56BEB8" /> -->

  <!-- <img alt="Github forks" src="https://img.shields.io/github/forks/nkosi-tauro/task-manager?color=56BEB8" /> -->

  <!-- <img alt="Github stars" src="https://img.shields.io/github/stars/nkosi-tauro/task-manager?color=56BEB8" /> -->
</p>

<!-- Status -->

<!-- <h4 align="center"> 
	🚧  Task Manager 🚀 Under construction...  🚧
</h4> 

<hr> -->

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/nkosi-tauro" target="_blank">Author</a>
</p>

<br>

## :dart: About ##

A Task Management backend application that allows authenticated users to Create, Update & Delete Tasks.

## :sparkles: Features ##

:heavy_check_mark: User Authentication with [fastify/jwt](https://github.com/fastify/fastify-jwt);\
:heavy_check_mark: CRUD Tasks;\


## :rocket: Technologies ##

The following tools were used in this project:

- [Fastify](https://fastify.dev/)
- [Node.js](https://nodejs.org/en/)
- [Docker Compose](https://docs.docker.com/compose/)
- [MySQL](https://www.mysql.com/)
- [TypeScript](https://www.typescriptlang.org/)

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com), [Node](https://nodejs.org/en/) and [Docker](https://docs.docker.com) installed.

## :checkered_flag: Starting ##

### .env
```bash

#root directory .env values
DB_USER=jellyman
DB_PASSWORD=jellyman
DB_NAME=task_manager

#backend directory .env values
DB_HOST=localhost
DB_PORT=3306
DB_USER=jellyman
DB_PASSWORD=jellyman
DB_NAME=task_manager
JWT_SECRET=verysecretsecret
```


```bash
# Clone this project
$ git clone https://github.com/nkosi-tauro/task-manager

# Access
$ cd task-manager

# Create a .env file for both the root and backend directories
$ See .env section above

# Install dependencies & Run project
$ docker compose up

# Test the project Endpoints
$ See Postman Section below

# The server will initialize on the <http://localhost:3000>
```

### Postman

A Postman Collection will be added soon.

## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.


Made with :heart: by <a href="https://github.com/nkosi-tauro" target="_blank">Nkosilathi Tauro</a>

&#xa0;

<a href="#top">Back to top</a>
