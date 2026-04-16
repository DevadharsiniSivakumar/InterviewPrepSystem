const express = require("express")
const router = express.Router()

const test = require("../controllers/testController")

router.get("/questions",test.getQuestions)
router.get("/generate", test.generateAIQuestions)
router.post("/submit",test.submitTest)
router.get("/stats/:user_id", test.getUserStats)

module.exports = router