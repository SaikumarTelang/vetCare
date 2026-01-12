const express = require("express");
const router = express.Router();

const { createBreed, getBreeds } = require("../controllers/breedController");

router.post("/", createBreed);
router.get("/", getBreeds);

module.exports = router;
