const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

const notesValidations = [
  body("title").isLength({ min: 3 }).withMessage("Please enter a valid title"),
  body("description")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 charecter long"),
];

// Get all the notes using : get:"/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

// Create/add notes using : post:"/api/notes/addnote". Login required
router.post("/addnote", fetchuser, notesValidations, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // If there are validations errors then return bad request with error array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id,
    });

    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: "Internal server error" });
  }
});

// update an exsiting notes using : put:"/api/notes/updatenote". Login required
router.put("/updatenote/:id", notesValidations, fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    let newNote = {};

    //If there are validations errors then return bad request with error array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //create newNote object which is then used to update requested note
    if (title) {
      newNote["title"] = title;
    }
    if (description) {
      newNote["description"] = description;
    }
    if (tag) {
      newNote["tag"] = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ errors: "Note" });
    }

    // check requesting user is correct user who owns requested note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: "Not allowed to update" });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true } // new:true => if not existing then create new
    );
    res.json(note);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: "Internal server error" });
  }
});

// datele an exsiting notes using : delete:"/api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be updated and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ errors: "Note not found" });
    }

    // check requesting user is correct user and  owns requested note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: "Not allowed to delete" });
    }

    note = await Note.findByIdAndDelete({ _id: req.params.id });
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: "Internal server error" });
  }
});

module.exports = router;
