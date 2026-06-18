# Service Desk Frontend

Interface web para gerenciamento de chamados técnicos, desenvolvida com React e TypeScript. Permite que usuários, técnicos e administradores realizem todas as operações do sistema através de uma interface moderna e responsiva.

---

## 💻 Sobre o projeto

O **Service Desk Frontend** é a camada visual da plataforma de gerenciamento de chamados.

A aplicação consome a API REST do backend para fornecer autenticação, abertura de chamados, acompanhamento de solicitações e gerenciamento operacional do Service Desk.

Foi desenvolvida com foco em desempenho, experiência do usuário e integração com ambientes Docker.

---

## 🚀 Tecnologias

As principais tecnologias utilizadas no projeto são:

* React
* TypeScript
* Vite
* React Router DOM
* Axios
* CSS Modules
* JWT Authentication
* Docker
* Nginx
* GitHub Actions

---

## 📦 Como baixar e executar o projeto

### Clonar o repositório

```bash
git clone https://github.com/IsraelDavid1/servicedesk-frontend.git
```

```bash
cd servicedesk-frontend
```

### Instalar dependências

```bash
npm install
```

### Configurar ambiente

Crie um arquivo:

```bash
.env
```

Exemplo:

```env
VITE_API_URL=http://localhost:8080
```

### Executar em modo desenvolvimento

```bash
npm run dev
```

Aplicação disponível em:

```text
http://localhost:5173
```

### Build de produção

```bash
npm run build
```

### Executar com Docker

```bash
docker-compose up -d
```

---

## 🛠️ Funcionalidades

* Login seguro com JWT
* Dashboard de chamados
* Criação de chamados
* Consulta de chamados
* Atualização de status
* Visualização de detalhes
* Controle de perfis
* Interface responsiva
* Integração com API REST
* Navegação protegida por autentação

---

## 🤝 Como contribuir

1. Faça um Fork do projeto

2. Crie uma branch

```bash
git checkout -b feature/minha-feature
```

3. Faça suas alterações

4. Realize commit

```bash
git commit -m "feat: nova funcionalidade"
```

5. Envie para o GitHub

```bash
git push origin feature/minha-feature
```

6. Abra um Pull Request

---

## 📝 Licença

Este projeto está licenciado sob a licença MIT.

---

## 👤 Autor

**Israel David**

GitHub:
https://github.com/IsraelDavid1
