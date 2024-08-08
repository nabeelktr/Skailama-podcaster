import App from "./src/app.js";
import 'dotenv/config';

const port = Number(process.env.PORT)
new App().startServer(port);

 