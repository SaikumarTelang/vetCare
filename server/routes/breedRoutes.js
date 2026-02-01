const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");


const { createBreed, getBreeds } = require("../controllers/breedController");

router.post("/", createBreed);
router.post("/", upload.single("image"), breedController.addBreed);

router.get("/", getBreeds);

module.exports = router;
