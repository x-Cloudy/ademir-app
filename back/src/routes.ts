import { Router, Request, Response } from "express";
import { CreateUserController } from "./Controllers/User/CreateUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
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
import { MeController } from "./Controllers/User/MeController";
import { IndicateNomineeController } from "./Controllers/Matriz/IndicateNomieeController";
import { Search50MatrizController } from "./Controllers/Matriz/Search50MatrizController";
import { MatrizController } from "./Controllers/User/MatrizController";
import { TableTextController } from "./Controllers/TableText/TableTextController";
import { BinaryTreeController } from "./Controllers/BinaryThree/BinaryThreeController";
import { ChangePositionController } from "./Controllers/User/ChangePositionController";
import { IndicationsController } from "./Controllers/User/IndicationsController";

const router = Router();
const resetUseCase = new PasswordResetUseCase();
const updateUser = new UpdateUserController();
const mailService = new MailService();
const passwordResetController = new PasswordResetController();
const login = new AuthenticateUserController();
const generateCode = new GenerateCodeController();
const verifyUserInMatriz = new VerifyUserMatrizController();
const matrizGold = new AddUserInGoldController();
const matrizSilver = new AddUserInSilverController();
const matrizCooper = new AddUserInCooperController();
const topAll = new TopAllIndicatesController();
const meController = new MeController();
const indicateNomineeController = new IndicateNomineeController();
const matriz50 = new Search50MatrizController();
const matrizController = new MatrizController();
const text = new TableTextController();
const tree = new BinaryTreeController();
const sideController = new ChangePositionController();
const indicationsController = new IndicationsController();
const allUserController = new AllUserController();

// User Routes
router.post('/user', new CreateUserController().handle);
router.put('/user/:id', isAuthenticated, updateUser.handle);
router.get("/me", isAuthenticated, meController.handle);
router.delete('/user/:id', isAuthenticated, new RemoveUserController().handle);
router.post("/login", login.handle);
router.get("/all-users", isAuthenticated, new AllUserController().handle);
router.get("/indicators/:code", isAuthenticated, new AllUserController().indicators);
router.get("/verify-user-matriz/:id",isAuthenticated, (req, res) => verifyUserInMatriz.execute(req, res));
router.post('change-side/:id',isAuthenticated, (req, res) => sideController.handle(req, res));
router.post('/change-password',(req, res) => allUserController.passwordChange(req, res));

//reset password
router.post("/password-reset", passwordResetController.sendPasswordReset.bind(passwordResetController));
router.post("/verify-code", passwordResetController.verifyCode.bind(passwordResetController));

//Code Routes
router.get("/generateCode/:userId",isAuthenticated, (req, res) => generateCode.generateInviteCode(req, res));
router.get("/decodeCode/:inviteCode",isAuthenticated, (req, res) => generateCode.decodeInviteCode(req, res));

//alocation in matriz
router.post("/add-user-in-cooper/:indicator/:indicate",isAuthenticated, (req, res) => matrizCooper.handle(req, res));
router.post("/add-user-in-silver/:indicator/:indicate",isAuthenticated, (req, res) => matrizSilver.handle(req, res));
router.post("/add-user-in-gold/:indicator/:indicate",isAuthenticated, (req, res) => matrizGold.handle(req, res));
router.get("/indicate-nominees", isAuthenticated, (req, res) => indicateNomineeController.getByDateRange(req, res));

//rating routes
router.get("/top10",isAuthenticated, (req, res) => topAll.top10());
router.get("/top3",isAuthenticated, (req, res) => topAll.top3());
router.get("/top1",isAuthenticated, (req, res) => topAll.top1());
router.get("/matriz-cooper/:userId", isAuthenticated, (req, res) => matriz50.getNextOrders(req, res));
router.get("/matriz/indicados/:userId", matrizController.getIndicatedUsers);

//table text
router.post("/table-text",isAuthenticated, (req, res) => text.create(req, res));
router.get("/table-text",isAuthenticated, (req, res) => text.get(res ));
router.delete("/table-text/:id",isAuthenticated, (req, res) => text.delete(req, res));

//binaryTree routes

router.post("/binary-tree/add",isAuthenticated, (req, res) => tree.addUser(req, res));
router.get("/binary-tree/:userId",isAuthenticated, (req, res) => tree.getUserTree(req, res));
router.get("/binary-tree/position/:userId",isAuthenticated, (req, res) => tree.getUserPosition(req, res));
router.get("/tree/:userId", (req, res) => tree.getTree(req, res));
router.get("/binary-tree", tree.getEntireTree);

router.get("/indications/:userId", (req, res) =>indicationsController.getIndications(req, res));

export { router };
