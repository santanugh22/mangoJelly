import express from "express";
import {
  createComic,
  getAllComics,
  getComicById,
  updateComic,
  deleteComic,
} from "../controllers/comicController.js";

const router = express.Router();

router.post("/", createComic);
router.get("/", getAllComics);
router.get("/:id", getComicById);
router.put("/:id", updateComic);
router.delete("/:id", deleteComic);

export default router;
