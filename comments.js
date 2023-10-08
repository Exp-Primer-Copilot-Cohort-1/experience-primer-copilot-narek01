// Create web server application with express
const express = require("express");
const app = express();

// Set up body-parser to parse request body
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/comments", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create a mongoose model
const Comment = mongoose.model("Comment", {
    username: String,
    comment: String
});

// Set up CORS for cross-origin requests
const cors = require("cors");
app.use(cors());

// Get all comments
app.get("/comments", async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

// Create a new comment
app.post("/comments", async (req, res) => {
    const comment = new Comment(req.body);
    await comment.save();
    res.send(comment);
});

// Delete a comment
app.delete("/comments/:id", async (req, res) => {
    const id = req.params.id;
    await Comment.findByIdAndDelete(id);
    res.send({message: "Comment deleted successfully."});
});

// Start the web server at port 3000
app.listen(3000, () => {
    console.log("Web server started at port 3000.");
});