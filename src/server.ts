import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({status: "OK"});
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});