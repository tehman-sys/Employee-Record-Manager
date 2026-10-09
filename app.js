require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
});
const Employee = mongoose.model("Employee", employeeSchema);

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());


app.get("/employees", async (req, res) => {
  const list = await Employee.find();
  res.json(list);
});

app.post("/employees", async (req, res) => {
  const newEmployee = await Employee.create({
    name: req.body.name,
    role: req.body.role,
  });
  res.status(201).json(newEmployee);
});

app.put("/employees/:id", async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) {
    return res.status(404).send("Employee not found");
  }
  res.json(updated);
});

app.delete("/employees/:id", async (req, res) => {
  const deleted = await Employee.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).send("Employee not found");
  }
  res.send("Employee deleted successfully");
});

app.get("/", (req, res) => {
  res.send("Welcome to the Employee Record Manager. Employee API is running.");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 