import dotenv from "dotenv";
dotenv.config();
import server from "./index";

const PORT: any = process.env.PORT;
server.listen(5000, () => {
  console.log(`It's alive on port ${PORT}`);
});
