import { useState, useRef } from "react";
import ErrorModal from "./error-modal";

export default function CreateProjectForm({ onCancel, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState();
  const [error, setError] = useState("");

  const errorModal = useRef();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(new Date(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      setError("No project title provided");
      errorModal.current.open();
      return;
    }

    if (!dueDate) {
      setError("No due date provided");
      errorModal.current.open();
      return;
    }

    if (dueDate < new Date()) {
      setError("Invalid due date provided");
      errorModal.current.open();
      return;
    }

    const newProject = {
      title,
      description,
      dueDate,
      tasks: [],
    };

    onSave(newProject);
  };

  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <button
          className="text-stone-800 hover:text-stone-950"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          onClick={handleSubmit}
        >
          Save
        </button>
      </menu>

      <p className="flex flex-col gap-1 my-4">
        <label
          className="text-sm font-bold uppercase text-stone-500"
          htmlFor="title"
        >
          Title
        </label>
        <input
          id="title"
          onChange={handleTitleChange}
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
      </p>

      <p className="flex flex-col gap-1 my-4">
        <label
          className="text-sm font-bold uppercase text-stone-500"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          onChange={handleDescriptionChange}
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
      </p>

      <p className="flex flex-col gap-1 my-4">
        <label
          className="text-sm font-bold uppercase text-stone-500"
          htmlFor="due-date"
        >
          Due Date
        </label>
        <input
          id="due-date"
          type="date"
          onChange={handleDueDateChange}
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
      </p>

      <ErrorModal ref={errorModal} error={error} />
    </div>
  );
}
