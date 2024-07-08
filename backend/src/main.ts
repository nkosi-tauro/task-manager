import { createServer } from "./utils/server";
async function main() {
  const app = await createServer();

  app.listen({
    host: "0.0.0.0",
    port: 3000,
  }, () => {
    console.log("Server is running on http://localhost:3000");
  });
}

main()