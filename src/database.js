const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://hugoroca:candy@cluster0-xu1hg.mongodb.net/db_notes?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected mongo"))
  .catch(console.error);
