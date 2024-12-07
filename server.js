const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });


// Connect to MongoDB
mongoose
  .connect("mongodb+srv://nishtasr04:Nishta@soundcheck.trp6u.mongodb.net/?retryWrites=true&w=majority&appName=soundcheck")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB", error));

// Song Schema and Model
const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  review: { type: String, required: true },
  image: { type: String },
});
const Song = mongoose.model("Song", songSchema);

// Joi Schema for Validation
const songReviewSchema = Joi.object({
  title: Joi.string().min(1).required(),
  artist: Joi.string().min(1).required(),
  review: Joi.string().min(10).required(),
});

// Routes

// GET All Artists (Static)
app.get("/api/artists", (req, res) => {
  res.json(artistData);
});

// GET All Songs
app.get("/api/songs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching songs.", error });
  }
});

// POST a New Song Review
app.post("/api/songs", upload.single("image"), async (req, res) => {
  const { error } = songReviewSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Invalid data format.", details: error.details });
  }

  const newSong = new Song({
    title: req.body.title,
    artist: req.body.artist,
    review: req.body.review,
    image: req.file ? "/images/" + req.file.filename : undefined,
  });

  try {
    const savedSong = await newSong.save();
    res.status(201).json({ message: "Song review added successfully!", savedSong });
  } catch (error) {
    res.status(500).json({ message: "Error saving song.", error });
  }
});

// PUT (Edit) a Song Review
app.put("/api/songs/:id", upload.single("image"), async (req, res) => {
  const { error } = songReviewSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Invalid data format.", details: error.details });
  }

  const updates = {
    title: req.body.title,
    artist: req.body.artist,
    review: req.body.review,
  };
  if (req.file) {
    updates.image = "/images/" + req.file.filename;
  }

  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found." });
    }
    res.status(200).json({ message: "Song review updated successfully!", updatedSong });
  } catch (error) {
    res.status(500).json({ message: "Error updating song.", error });
  }
});

// DELETE a Song Review
app.delete("/api/songs/:id", async (req, res) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found." });
    }
    res.status(200).json({ message: "Song review deleted successfully!", deletedSong });
  } catch (error) {
    res.status(500).json({ message: "Error deleting song.", error });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




