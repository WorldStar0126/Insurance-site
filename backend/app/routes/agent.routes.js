const { verifySignUp } = require("../middleware");
const controller = require("../controller/agent.controller");

const router = require('express').Router();

router.post(
    "/create/agent",
    controller.agent
);

router.put(
    "/update/agent",
    controller.updateagent
);

router.get(
    "/get/agentbyid",
    controller.agentbyid);

router.get(
    "/get/agentlist",
    controller.agentlist);

router.delete(
    "/delete/agent",
    controller.agentdelete
);

module.exports = router;
