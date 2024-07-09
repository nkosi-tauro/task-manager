import 'dotenv/config'
import { createServer } from "./utils/server";
import sequelizeConnection from "./database/connection";
import { logger } from './utils/logger';

async function main() {
  try {
    await sequelizeConnection.authenticate();
    logger.info('Connection to the database has been established successfully.');
    await sequelizeConnection.sync({ force: true });
    logger.info('Database synchronized successfully.');
  } catch (error) {
    logger.error(`Unable to connect to the database: ${error}`);
    process.exit(1);
  }

  const app = await createServer();
  try{
    app.listen({
      port: 3000,
    });
  }
  catch(error) {
    logger.error(error);
    process.exit(1);
  }

}

main();
