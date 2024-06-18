import express from "express"
import { avatar, login, logout, register } from "../controller/authController.js"
import { isAthenticated } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/me/upload_avatar").put(isAthenticated, avatar)
export default router