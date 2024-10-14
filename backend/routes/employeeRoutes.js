const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const authenticate = require("../middleware/authMiddleware");
const verifyRole = require("../middleware/roleMiddleware");

//for users and admins
router.get("/", authenticate, employeeController.getAllEmployees);
router.get("/:id", authenticate, employeeController.getEmployeeById);

//for admins only
router.post(
  "/",
  authenticate,
  verifyRole("admin"),
  employeeController.createNewEmployee
);
router.put(
  "/:id",
  authenticate,
  verifyRole("admin"),
  employeeController.updateEmployee
);
router.delete(
  "/:id",
  authenticate,
  verifyRole("admin"),
  employeeController.deleteEmployee
);

module.exports = router;
