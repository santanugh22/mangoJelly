import Comic from "../models/comic.js";
import { z } from "zod";

// Define the Comic schema using Zod
const comicSchema = z.object({
  name: z.string().min(1, "Name is required"),
  author: z.string().min(1, "Author is required"),
  yearOfPublication: z
    .number()
    .int()
    .positive("Year of Publication must be a positive integer"),
  price: z.number().positive("Price must be a positive number"),
  discount: z
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100"),
  numberOfPages: z
    .number()
    .int()
    .positive("Number of Pages must be a positive integer"),
  condition: z.enum(["new", "used"], "Condition must be 'new' or 'used'"),
  description: z.string().optional(),
});

// Create a new comic book
export const createComic = async (req, res) => {
  try {
    const validatedData = comicSchema.parse(req.body);
    const newComic = await Comic.create(validatedData);
    res.status(201).json(newComic);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Get all comics with pagination, filtering, and sorting
export const getAllComics = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = "name", filterBy } = req.query;
    const query = filterBy ? { [filterBy.key]: filterBy.value } : {};
    const offset = (page - 1) * limit;
    const comics = await Comic.findAll({
      where: query,
      order: [[sortBy, "ASC"]],
      offset,
      limit: parseInt(limit),
    });
    res.status(200).json(comics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a comic by ID
export const getComicById = async (req, res) => {
  try {
    const comic = await Comic.findByPk(req.params.id);
    if (!comic) {
      return res.status(404).json({ message: "Comic not found" });
    }
    res.status(200).json(comic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a comic
export const updateComic = async (req, res) => {
  try {
    const validatedData = comicSchema.partial().parse(req.body);
    const [updated] = await Comic.update(validatedData, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: "Comic not found" });
    }
    const updatedComic = await Comic.findByPk(req.params.id);
    res.status(200).json(updatedComic);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Delete a comic
export const deleteComic = async (req, res) => {
  try {
    const deleted = await Comic.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: "Comic not found" });
    }
    res.status(200).json({ message: "Comic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
