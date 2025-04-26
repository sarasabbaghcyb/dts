
## Prerequisites

1. A node version manager, like [nvm](https://formulae.brew.sh/formula/nvm)
2. Docker >= 3.9 - [Install docker engine](https://docs.docker.com/engine/install/)

### Setup

1. Set your node version to what is configured in `.nvmrc` with your preferred node version manager.

    - For `nvm`:
      ```shell
      nvm install
      ```

2. Install the dependencies `npm i`
3. Prettier should now be installed. Configure your IDE to use prettier and format on save.

### Starting the database

`docker compose up db` or `docker compose up db -d` (detached mode)

### Starting the project

1. Copy the `env.dev` to `.env`
2. Run `npm run dev` to start the project in development mode. This will watch for changes and restart the server
3. Alternatively, run `npm run build` and `npm run start`

# DTS Task Management Backend

This is the backend API for the DTS Task Management Application.

Built with **Node.js** and **Express.js**, this backend handles CRUD operations for tasks, includes validation, error handling, and stores task data in a **PostgreSQL** database using **Prisma ORM**.

## 📚 Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL (with Prisma ORM)
- **Testing**: Jest (or your testing framework)
- **Validation**: Express Middleware + Manual validation
- **Error Handling**: Centralized Express error handler

## 🚀 Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/sarasabbaghcyb/dts.git
    cd dts
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables (if needed):
   - Create a `.env` file:
     ```
     PORT=3000
     DATABASE_URL=your_database_url_here
     ```

4. Run database migrations using Prisma:
    ```bash
    npx prisma migrate dev
    ```

5. Run the server:
    ```bash
    npm run dev
    ```

Server will be running on `http://localhost:3000`.

---

## 🛠 Available Scripts

- `npm run dev` — Start the server in development mode (e.g., with nodemon).
- `npm run test` — Run unit tests.

---

## 🧪 Testing

This project uses **Jest** (or your framework) to write unit tests.

Run all tests:

```bash```
```npm test```

Tests cover:

- API endpoints

- Validation logic

- Error handling

---

## 📚 API Endpoints

| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| `GET`  | `/task`            | Get all tasks          |
| `GET`  | `/task/:id`        | Get a task by ID       |
| `POST` | `/task`            | Create a new task      |
| `POST` | `/task/:id`        | Update an existing task|
| `POST` | `/task/:id/delete` | Delete a task          |

## 🛡️ Validation and Error Handling

- All required fields (e.g., title, dueDate) are validated on creation and update.
- Invalid data returns a `400 Bad Request` with clear error messages.
- Errors are centrally managed to avoid exposing internal details.

## ✨ Future Improvements

- Authentication/ User login
- Pagination for tasks
- More advanced validation (e.g., JOI, Zod)
- automatic due date reminders

