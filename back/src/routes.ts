import { Router, Request, Response } from "express";
import { CreateUserController } from "./Controllers/User/CreateUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./Controllers/User/DetailUserController";
import { RemoveUserController } from "./Controllers/User/RemoveUserController";
import { PasswordResetUseCase } from "./Config/mail/token";
import { MailService } from "./Config/mail/MailService";
import { PasswordResetController } from "./Controllers/mail/PasswordResetController";
import { UpdateUserController } from "./Controllers/User/UpdateUserController";
import { AuthenticateUserController } from "./Controllers/Auth/AuthenticateUserController";
import { AllUserController } from "./Controllers/User/AllUserController";
import { GenerateCodeController } from "./Controllers/code/GenerateCodeController";
import { VerifyUserMatrizController } from "./Controllers/User/VerifyUserMatrizController";
import { AddUserInCooperController } from "./Controllers/Matriz/AddUserInCooperController";
import { AddUserInSilverController } from "./Controllers/Matriz/AddUserInSilverController";
import { AddUserInGoldController } from "./Controllers/Matriz/AddUserInGoldController";
import { TopAllIndicatesController } from "./Controllers/Matriz/TopAllIndicatesController";

const router = Router();
const resetUseCase = new PasswordResetUseCase();
const updateUser = new UpdateUserController();
const mailService = new MailService();
const passwordResetController = new PasswordResetController(resetUseCase, mailService);
const login = new AuthenticateUserController();
const generateCode = new GenerateCodeController();
const verifyUserInMatriz = new VerifyUserMatrizController();
const matrizGold = new AddUserInGoldController();
const matrizSilver = new AddUserInSilverController();
const matrizCooper = new AddUserInCooperController();
const topAll = new TopAllIndicatesController();

// User Routes
router.post('/user', new CreateUserController().handle);
router.get('/user', isAuthenticated, new DetailUserController().handle);
router.put('/user/:id', isAuthenticated, updateUser.handle);
router.delete('/user/:id', isAuthenticated, new RemoveUserController().handle);
router.post("/password-reset", (req, res) => passwordResetController.requestReset(req, res));
router.post("/login", login.handle);
router.get("/all-users", isAuthenticated, new AllUserController().handle);
router.get("/verify-user-matriz/:id", (req, res) => verifyUserInMatriz.execute(req, res));

// Code Routes
router.get("/generateCode/:userId", (req, res) => generateCode.generateInviteCode(req, res));

//alocation in matriz
router.post("/add-user-in-cooper/:indicator/:indicate", (req, res) => matrizCooper.handle(req, res));
router.post("/add-user-in-silver/:indicator/:indicate", (req, res) => matrizSilver.handle(req, res));
router.post("/add-user-in-gold/:indicator/:indicate", (req, res) => matrizGold.handle(req, res));

//rating routes
router.get("/top10", (req, res) => topAll.top10());
router.get("/top3", (req, res) => topAll.top3());
router.get("/top1", (req, res) => topAll.top1());

export { router };
