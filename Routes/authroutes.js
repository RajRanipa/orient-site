// this is authroutes.js
const { Router } = require('express');
const { upload } = require('../Controllers/myMiddleware')

const CNG= require('../Controllers/getcontrollers');

const router = Router();

// ### GET Requests ### //
router.get('/', CNG.home_page); 
router.get('/ceramic-fiber-blanket', CNG.Blanket_page);
router.get('/ceramic-fiber-board', CNG.Board_page);
router.get('/ceramic-fiber-bulk', CNG.Bulk_page);
router.get('/ceramic-fiber-module', CNG.Module_page);
router.get('/ceramic-fiber-paper', CNG.Paper_page);
router.get('/Career', CNG.Career);
router.get('/Contact', CNG.Contact_us);
router.get("/Ganalytics", CNG.Ga_id);
router.post("/send-career-email", upload.single("resume"), CNG.send_career_email);
router.post("/send-contact-email", CNG.send_contact_email);

module.exports = router;