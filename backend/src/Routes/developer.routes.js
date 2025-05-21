import { Router } from "express";

import { acceptserver,rejectserver,refreshapprovel,getdev,logindev,logoutdev } from "../controllers/developer.controller.js";
import { isDevAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/login").post(logindev)
router.route("/logout").post(logoutdev)
router.route("/getdev").get(isDevAuthenticated,getdev)
router.route("/accept/:serverid").post(isDevAuthenticated,acceptserver)
router.route("/reject/:serverid").post(isDevAuthenticated,rejectserver)
router.route("/refresh/:serverid").post(isDevAuthenticated,refreshapprovel)

export default router;