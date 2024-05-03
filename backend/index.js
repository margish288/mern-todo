import express from "express";

const app = express();

app.get("/api/test", (req, res) => {
  res.send("Setup api!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
