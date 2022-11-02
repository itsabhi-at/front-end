import { handleAuth } from "@auth0/nextjs-auth0";
import auth0 from "src/util/auth0";

export default handleAuth({
  // other stuff here...
  async callback(req, res) {
    try {
      await auth0.handleCallback(req, res);
    } catch (error) {
      res.redirect("/");
    }
  },
});
