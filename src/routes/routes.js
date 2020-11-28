import { Router } from "../deps.js";
import { reportMorning } from "./controllers/reportController.js"
import * as reportApi from "./apis/reportApi.js";

const router = new Router();

router.get('/behavior/reporting/morning', reportMorning);
router.post('/behavior/reporting/morning', reportApi.insertMorningReport);

export { router };