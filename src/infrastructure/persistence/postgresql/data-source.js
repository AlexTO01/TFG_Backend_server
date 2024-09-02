import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: "postgres",
    password: "sce",
    database: "tfg",
    entities: ["src/infrastructure/persistence/postgresql/schemas/*.js"],
    migrations: ["src/infrastructure/persistence/postgresql/migrations/*.js"]
});