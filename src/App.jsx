import { useState } from "react";
import ProjectsList from "./components/projects-list";
import CreateProjectForm from "./components/create-project-form";
import NoProjectSelected from "./components/no-project-selected";
import ProjectInfo from "./components/project-info";

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const handleSelectProject = (project) => {
    setSelectedProject(project.title);
    setIsCreatingProject(false);
  };

  const handleCreateProject = () => {
    setIsCreatingProject(true);
    setSelectedProject(null);
  };

  const handleSaveProject = (newProject) => {
    setProjects([...projects, newProject]);
    setIsCreatingProject(false);
  };

  const handleDeleteProject = (projectToDelete) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.title !== projectToDelete.title)
    );
    setSelectedProject(null);
  };

  const handleAddTask = (task) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.title === selectedProject
          ? { ...project, tasks: [...project.tasks, task] }
          : project
      )
    );
  };

  const handleDeleteTask = (taskToDelete) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.title === selectedProject
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task !== taskToDelete),
            }
          : project
      )
    );
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsList
        projects={projects}
        selectedProject={selectedProject}
        onSelectProject={handleSelectProject}
        onCreateProject={handleCreateProject}
      />
      {!isCreatingProject && !selectedProject && (
        <NoProjectSelected onCreateProject={handleCreateProject} />
      )}
      {isCreatingProject && (
        <CreateProjectForm
          onCancel={() => setIsCreatingProject(false)}
          onSave={handleSaveProject}
        />
      )}
      {selectedProject && !isCreatingProject && (
        <ProjectInfo
          project={projects.find(
            (project) => project.title === selectedProject
          )}
          onDeleteProject={handleDeleteProject}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </main>
  );
}

export default App;
