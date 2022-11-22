import dotenv from "dotenv";
dotenv.config();
import server from "./index";

const PORT: any = 5000;
server.listen(PORT, () => {
  console.log(`It's alive on port ${PORT}`);
});
