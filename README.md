# PoupApp

## Tecnologias utilizadas

| Camada         | Tecnologias                       |
| -------------- | --------------------------------- |
| Front-end      | React, Vite                       |
| Back-end       | Java 17, Spring Boot, JPA, Lombok |
| Banco de Dados | Oracle XE (Docker)                |
| DevOps         | Docker, Maven                     |

### Front-end

Aplicação desenvolvida em [React](https://reactjs.org/) + [Vite](https://vitejs.dev/), com a finalidade de ser um gerenciador de despesas pessoais.

### Back-end

Aplicação desenvolvida em [Java 17](https://docs.oracle.com/en/java/javase/17/), utilizando o [Spring Framework](https://spring.io/), com os seguintes módulos:

- [Spring JPA](https://spring.io/projects/spring-data-jpa)
- [Spring Web](https://spring.io/projects/spring-boot)
- [Lombok](https://projectlombok.org/)
- [Maven](https://maven.apache.org/) (gerenciador de pacotes)
- [Oracle Database (Spring Oracle JDBC)](https://docs.oracle.com/en/database/oracle/oracle-database/21/jajdb/)
- [Docker](https://www.docker.com/)


---

## Executar localmente pela primeira vez

Siga a ordem abaixo para rodar o PoupApp localmente:

1. **Executar a imagem do Oracle Database via Docker**

   Certifique-se de que o [Docker](https://www.docker.com/) está instalado e rodando. No terminal, execute:

   ```bash
   docker run -d -p 1521:1521 -e ORACLE_PASSWORD=SYSADMIN gvenzl/oracle-xe
   ```   
 

2. **Executar o back-end**

    Abra o backend em uma IDE Java, preferencialmente uma que exija pouca configuração, como IntelliJ IDEA ou Eclipse..

    Aguarde o Maven baixar as dependências.

    Rode a aplicação pela IDE executando a classe principal anotada com @SpringBootApplication (abra o arquivo chamado PoupApplication e execute).

3. **Executar o front-end**

        Certifique-se de ter o Node.js instalado.

        No terminal, dentro da pasta do front-end, instale as dependências:

    ```bash
    npm install
    ```

    Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

    Abra o navegador no endereço indicado pelo terminal (geralmente http://localhost:5173).



