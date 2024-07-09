import 'dotenv/config'
import { createServer } from "./utils/server";
import sequelizeConnection from "./database/connection";

async function main() {
  try {
    await sequelizeConnection.authenticate();
    console.log('Connection to the database has been established successfully.');
    await sequelizeConnection.sync({ force: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }

  const app = await createServer();

  app.listen({
    host: "0.0.0.0",
    port: 3000,
  }, () => {
    console.log("Server is running on http://localhost:3000");
  });
}

main();
