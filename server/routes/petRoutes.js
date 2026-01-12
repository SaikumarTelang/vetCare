const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { addPet, getPets, deletePet } = require("../controllers/petController");

router.post("/", upload.single("image"), addPet);
router.get("/", getPets);
router.delete("/:id", deletePet);

module.exports = router;
