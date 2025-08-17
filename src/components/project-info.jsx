import { useRef } from "react";

export default function ProjectInfo({
  project,
  onDeleteProject,
  onAddTask,
  onDeleteTask,
}) {
  const taskInputRef = useRef();

  const handleAddTask = (e) => {
    onAddTask(taskInputRef.current.value);
    taskInputRef.current.value = "";
  };

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={() => onDeleteProject(project)}
          >
            Delete
          </button>
        </div>

        <p className="mb-4 text-stone-400">{project.dueDate.toDateString()}</p>

        <p className="text-stone-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>

      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>

      <div className="flex items-center gap-4">
        <input
          ref={taskInputRef}
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        />
        <button
          className="text-stone-700 hover:text-stone-950"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>

      {project.tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}

      {project.tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {project.tasks.map((task) => (
            <li className="flex justify-between my-4" key={task}>
              <span>{task}</span>
              <button
                className="text-stone-700 hover:text-red-500"
                onClick={() => onDeleteTask(task)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
