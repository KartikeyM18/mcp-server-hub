import { Router } from "express";
import { changecurrpassword, getcurrentuser, loginUser, logoutuser, refreshingtheaccesstokens, registerUser, SubmittedServers, userProfile } from "../controllers/user.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshingtheaccesstokens);
router.route("/change-password").post(verifyjwt,changecurrpassword)
router.route("/submittedservers").get(verifyjwt,SubmittedServers)
router.route("/logout").post(verifyjwt,logoutuser)
router.route("/currentuser").get(verifyjwt,getcurrentuser)
router.route("/:username").get(userProfile)


export default router;