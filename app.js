const express = require("express");
const app = express();
app.use(express.json());

const employees = [
  { id: 1, name: "John Doe", role: "Software Engineer" },
  { id: 2, name: "Jane Smith", role: "Product Manager" },
  { id: 3, name: "Bob Johnson", role: "Designer" },
];


app.get("/employees", (req, res) => {
  res.json(employees);
});

app.post("/employees", (req, res) => {
    const newEmployee = {
        id: employees.length + 1,
        name: req.body.name,
        role: req.body.role
    }
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Employee Record Manager. Employee API is running.");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 