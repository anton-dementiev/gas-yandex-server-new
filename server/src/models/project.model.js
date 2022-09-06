const cn = require('../../config/db.config');


const newProject  = (project) => {

   return {

    title: project.title,
    description: project.description,
    date_started: project.date_started,
    date_completed: project.date_completed,
    client_id: project.client_id,
    folder_id: project.folder_id,
    url: project.url,
    created_at: new Date(),
    deleted_at: null,

    
   }; 

    
};


const createProject = (newProject, result) => {

    cn.query("INSERT INTO projects set ?", newProject, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(false, newProject);
        }


    });
}


const updateProject =(projectId, project, result) => {
    cn.query("UPDATE projects SET ? WHERE project_id=?", [project, projectId], (err, rows, fields) =>{
        if (err) {
            console.log("error", err);
            result(err, null);
        } else {
            result(false, rows);
        }
    });
}

const getProjectById = (projectId, result) => {
  console.log(projectId);
   cn.query("SELECT * FROM projects WHERE project_id=?", [projectId], (err, rows, fields)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(rows);
            result(false, rows);
        }
   });
}

const getAllProjects =  (result) => {
    cn.query("SELECT * FROM projects WHERE deleted_at IS NULL", (err, rows, fields)=> {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else  {
            result(false, rows);
        }
    });
}


const deleteProjectById = (projectId, result) => {

    console.log(projectId);

    cn.query("UPDATE projects SET deleted_at=? WHERE project_id=?", [new Date(), projectId], (err, rows, fields)=> {
       if (err) {
        console.log("error: ", err);
        result(err, null);
      
       } else {
         result(false, rows);
       }

    });
}


module.exports = {
    newProject, 
    createProject, 
    updateProject,
    getProjectById,
    getAllProjects,
    deleteProjectById,
};