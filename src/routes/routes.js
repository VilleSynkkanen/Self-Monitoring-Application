import { Router } from "../deps.js";
import { rootLandingPage, reportLandingPage, reportEvening, reportMorning } from "./controllers/reportController.js"
import { summaryPage } from "./controllers/summaryController.js"
import { registrationPage, registrationConfirmation, loginPage, loginConfirmation } from "./controllers/authenticationController.js"
import * as reportApi from "./apis/reportApi.js";

const router = new Router();

router.get('/', rootLandingPage);
router.get('/behavior/reporting', reportLandingPage);
router.get('/behavior/reporting/morning', reportMorning);
router.get('/behavior/reporting/evening', reportEvening);
router.post('/behavior/reporting/morning', reportApi.insertMorningReport);
router.post('/behavior/reporting/evening', reportApi.insertEveningReport);
router.get('/behavior/summary', summaryPage);
router.post('/behavior/summary', summaryPage);
router.get('/auth/registration', registrationPage);
router.post('/auth/registration', registrationConfirmation);
router.get('/auth/login', loginPage);
router.post('/auth/login', loginConfirmation);

export { router };