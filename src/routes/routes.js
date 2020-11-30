import { Router } from "../deps.js";
import { rootLandingPage, reportLandingPage, reportEvening, reportMorning } from "./controllers/reportController.js"
import * as reportApi from "./apis/reportApi.js";

const router = new Router();

router.get('/', rootLandingPage);
router.get('/behavior/reporting', reportLandingPage);
router.get('/behavior/reporting/morning', reportMorning);
router.get('/behavior/reporting/evening', reportEvening);
router.post('/behavior/reporting/morning', reportApi.insertMorningReport);
router.post('/behavior/reporting/evening', reportApi.insertEveningReport);

export { router };