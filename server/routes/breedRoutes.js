const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  addBreed,
  getBreeds,
  deleteBreed
} = require("../controllers/breedController");

router.post("/", upload.single("image"), addBreed);
router.get("/", getBreeds);
router.delete("/:id", deleteBreed);

module.exports = router;
