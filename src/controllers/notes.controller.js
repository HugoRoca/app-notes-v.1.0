const Note = require("../models/Note");

module.exports = class {
  async save(req, res) {
    const { title, description } = req.body;
    const errors = [];

    if (!title) errors.push({ text: "Please write a title" });
    if (!description) errors.push({ text: "Please write a description" });

    if (errors.length > 0) {
      res.render("notes/new-note.hbs", {
        errors,
        title,
        description,
      });
    } else {
      const newNote = new Note({ title, description });
      newNote.user = req.user.id;
      await newNote.save();
      req.flash("success_msg", "Note added successfully");
      res.redirect("/notes");
    }
  }

  async delete(req, res) {
    await Note.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Note deleted successfully");
    res.redirect("/notes");
  }

  async edit(req, res) {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {
      title,
      description,
    });
    req.flash("success_msg", "Note updated successfully");
    res.redirect("/notes");
  }

  async renderEdit(req, res) {
    const note = await Note.findById(req.params.id);
    res.render("notes/edit-note", {
      note,
    });
  }

  async allNotes(req, res) {
    const notes = await Note.find({ user: req.user.id }).sort({ date: "desc" });
    res.render("notes/all-notes", {
      notes,
    });
  }

  async renderNewNote(req, res) {
    res.render("notes/new-note");
  }
};
