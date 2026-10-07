const express = require("express");
const app = express();

const employees = [
  { id: 1, name: "John Doe", role: "Software Engineer" },
  { id: 2, name: "Jane Smith", role: "Product Manager" },
  { id: 3, name: "Bob Johnson", role: "Designer" }
];

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Employee Record Manager. Employee API is running.");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 