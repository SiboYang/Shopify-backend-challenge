import app from "./app.js";
import path from "path";
import { fileURLToPath } from "url";
const PORT = process.env.PORT || 8080;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../../frontend/build"));
}


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));