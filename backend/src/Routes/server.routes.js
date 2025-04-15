import { Router } from "express";
import { submitaserver,deleteServer,editServer ,getallservers, getserverbyid} from "../controllers/server.controller.js";

import { verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/submit").post(verifyjwt,submitaserver)
router.route("/edit/:serverid").put(verifyjwt,editServer)
router.route("/delete/:serverid").delete(verifyjwt,deleteServer)
router.route("/allserver").get(getallservers)
router.route("/:serverid").get(getserverbyid)
export default router;