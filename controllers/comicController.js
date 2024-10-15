import Comic from "../models/comic.js";

// Create a new comic book
export const createComic = async (req, res) => {
  try {
    const newComic = await Comic.create(req.body);
    res.status(201).json(newComic);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const [updated] = await Comic.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: "Comic not found" });
    }
    const updatedComic = await Comic.findByPk(req.params.id);
    res.status(200).json(updatedComic);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
