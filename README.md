Here's a comprehensive `README.md` file that documents your NestJS project, including:

* Project overview
* JWT authentication
* User and Event features
* Swagger documentation
* Task scheduler for event execution
* Unit testing setup
* ESLint integration
* Future improvements (protected routes, etc.)

---

````markdown
# 🛡️ Event Scheduler API (NestJS + TypeORM + PostgreSQL)

This is a secure, modular REST API built with **NestJS**, **PostgreSQL**, and **TypeORM**. It enables user registration/login using **JWT authentication**, scheduling events, and automatically marking events as "executed" once their scheduled time is reached.

---

## 🚀 Features

### ✅ User Module
- Register new users with hashed passwords (`/users/register`)
- Login using email/password and receive JWT token (`/users/login`)
- Uses `bcrypt` for password hashing
- Validated using `class-validator` and DTOs
- Unit-tested with Jest

### ✅ Events Module
- Authenticated users can schedule events in the future (`/events`)
- Retrieve all events for the current user (`/events`)
- Each event is linked to the user who created it
- `execute_at` is validated to be a future ISO8601 date

### ✅ Background Scheduler
- Automatically checks all events every minute
- If `execute_at` time is reached, the event status is updated to `"EXECUTED"`
- Uses `@nestjs/schedule` and `CronExpression.EVERY_MINUTE`

### ✅ Swagger Documentation
- Access API docs at: `http://localhost:3000/api`
- JWT bearer authentication support
- All DTOs and endpoints are documented

### ✅ Unit Testing
- Service-layer tests for `UsersService` and `EventsService` using Jest
- Repository methods are mocked with `jest.fn()`
- Easy test execution: `npm run test`

---

## 🧪 Tech Stack

- **NestJS** (modular server-side Node.js framework)
- **TypeORM** (ORM for PostgreSQL)
- **PostgreSQL** (relational DB)
- **JWT** (authentication)
- **Jest** (unit testing)
- **@nestjs/schedule** (task scheduling)
- **Swagger** (API documentation)
- **class-validator** (DTO validation)
- **bcrypt** (password hashing)

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/event-scheduler-api.git
cd event-scheduler-api
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
JWT_SECRET=your_secret_key
```

Or hardcode it in `JwtModule.register()` for testing.

### 4. Initialize the database

Ensure PostgreSQL is running. Adjust `TypeOrmModule.forRoot()` config in `app.module.ts`:

```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_user',
  password: 'your_password',
  database: 'event_scheduler',
  synchronize: true,
  autoLoadEntities: true,
})
```

### 5. Run the app

```bash
npm run start:dev
```

---

## ✅ Swagger API Docs

Visit:

```
http://localhost:3000/api
```

Test all routes interactively and authorize with JWT.

---

## 🧹 ESLint Setup

ESLint was initialized for code quality and style enforcement.

### Initialize ESLint:

```bash
npx eslint --init
```

### To lint and fix:

```bash
npm run lint
npm run lint:fix
```

You can adjust rules in `.eslintrc.js`.

---

## 🔐 Future Enhancements

* **Role-based route protection** with `@UseGuards(JwtAuthGuard)`
* **Custom `@User()` decorator** to inject user from JWT
* **Refresh tokens** for long sessions
* **Rate limiting** and **request throttling**
* **Pagination & filtering** on events
* **Admin-only routes** for user management
* **Containerization via docker**
* **Api exposure** via ngrok

---

## 🧪 Running Tests

```bash
npm run test
```

Test files:

* `users.service.spec.ts`
* `events.service.spec.ts`
* `app.controller.spec.ts`

---

## 📁 Directory Structure

```
src/
├── auth/
│   ├── auth.module.ts
│   ├── jwt-auth.guard.ts
│   └── jwt.strategy.ts
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── dto/
│   └── user.entity.ts
├── events/
│   ├── events.module.ts
│   ├── events.controller.ts
│   ├── events.service.ts
│   ├── tasks.service.ts
│   └── entities/
└── main.ts
```

---

## 📦 License

MIT – feel free to fork and extend the functionality.

---

## 👨‍💻 Author

Built with ❤️ by \Abdulrahman-Sweilam

```
