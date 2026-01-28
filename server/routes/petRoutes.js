const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const petController = require("../controllers/petController");

router.post("/", upload.single("image"), petController.addPet);
router.get("/", petController.getPets);
router.delete("/:id", petController.deletePet);

module.exports = router;
