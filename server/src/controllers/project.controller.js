const Project = require ('../models/project.model');

const createProject = (req, res) => {
    
    const newProject = Project.newProject(req.body);

    Project.createProject(newProject, (err, project)=>{
         if (err) {
             res.send(err);
         }

         res.json({error:false, message: "Success", data: project})
    });
}


const updateProject = (req, res) => {
    const projectId = req.params.id;
    const project = req.body;

    Project.updateProject(projectId, project, (err, result)=>{

        if (err) {
            res.send(err);
        } 

        res.json({error: false, message: "Success", data: result.affectedRows});
    });
}


const getProjectById = (req, res) => {
    
    const projectId = req.params.id;
    Project.getProjectById(projectId, (err, project)=>{

        if (err) {
            res.send(err);
        }

        console.log(project);
        res.json({error: false, message: "Success", data: project});
    });
}


const getAllProjects = (req, res) => {

    Project.getAllProjects( (err, projects)=> {
        if (err) {
            res.send(err);
        }

        res.json({error: false, message: "Success", data: projects})
    });
}

const deleteProjectById = (req, res) => {
     const projectId = req.params.id;
     console.log("Project to delete", projectId)
     Project.deleteProjectById(projectId, (err, result)=>{
        if (err) {
            res.send(err);
        }
        res.json({error: false, message: "Success", data: result.affectedRows})
     });
}



module.exports = {
    createProject,
    updateProject,
    getProjectById,
    getAllProjects,
    deleteProjectById,
}