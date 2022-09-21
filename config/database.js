// module.exports = ({ env }) => ({
//   defaultConnection: "default",
//   connection: {
//     client: 'postgres',
//     connection: {
//       host: env('DATABASE_HOST', '127.0.0.1'),
//       port: env.int('DATABASE_PORT', 5432),
//       database: env('DATABASE_NAME', 'imggy'),
//       user: env('DATABASE_USERNAME', 'postgres'),
//       password: env('DATABASE_PASSWORD', 'abhinav'),
//       ssl: env.bool('DATABASE_SSL', false),
//     },
//   },
// });
module.exports = ({ env }) => ({
  defaultConnection: "default",
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "shopp"),
      user: env("DATABASE_USERNAME", "postgres"),
      password: env("DATABASE_PASSWORD", "abhinav"),
      schema: env("DATABASE_SCHEMA", "public"),
      ssl: { rejectUnauthorized: false },
    },
  }
});