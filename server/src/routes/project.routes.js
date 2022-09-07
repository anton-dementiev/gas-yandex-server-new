const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project.controller');



//Get all Projects
router.get("/projects", projectController.getAllProjects);

//Create New Project
router.post("/projects", projectController.createProject);

//Update Project By Id
router.put("/projects/:id", projectController.updateProject);

//Get Project By Id 
router.get("/projects/:id", projectController.getProjectById);

//Delete Project By Id
router.delete("/projects/:id", projectController.deleteProjectById);


module.exports = router;