import React from "react";
import { HiOutlineArchive, HiOutlineTrash  } from "react-icons/hi";
import { useAppSelector, useAppDispatch, deleteNote, archiveNote } from "../store";

const NoteActions = () => {

  const dispatch = useAppDispatch()
  const selectedNote = useAppSelector(
    (state) => state.salesDashboard.data.selectedNote
  )

  const handleDeleteNote = () => dispatch(deleteNote({ id: selectedNote.id }))

  const handleArchiveNote = () => dispatch(archiveNote({ id: selectedNote.id }))

  return (
    <div className="flex flex-col gap-4">
      <button className="border rounded-xl hover:bg-blue-200 text-gray-800 font-bold py-3 px-4 inline-flex items-center" onClick={handleArchiveNote} disabled={!selectedNote}>
        <HiOutlineArchive />
        <span className="ms-2">Archive Note</span>
      </button>
      <button className="border rrounded-xl hover:bg-red-600 text-gray-800 hover:text-gray-50 font-bold py-3 px-4 rounded-xl inline-flex items-center" onClick={handleDeleteNote} disabled={!selectedNote}>
        <HiOutlineTrash  />
        <span className="ms-2">Delete Note</span>
      </button>
    </div>
  );
};

export default NoteActions;
