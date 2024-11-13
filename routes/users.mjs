import express from "express"
import UserController from "../controllers/userController.mjs"
import UserValidator from "../models/userValidator.mjs"
import { checkSchema } from "express-validator"
import multer from "multer"

const router = express.Router()
// Налаштовуємо місце збереження файлів та їх імена
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  },
})
const upload = multer({ storage })

router.get("/", UserController.usersList)

router.get("/register/:id?", UserController.registerForm)

router.post(
  "/register/:id?",
  upload.single("prodImg"),
  checkSchema(UserValidator.userSchema),
  UserController.registerUser
)

router.delete("/", UserController.deleteUser)

export default router
