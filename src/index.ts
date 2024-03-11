import { app } from "./App";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`);
});
