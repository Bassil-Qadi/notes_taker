import React, { useState, useEffect } from "react";
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { useAppSelector, useAppDispatch, setNoteChanges } from "../store";
import { HiOutlineTag, HiOutlineClock  } from "react-icons/hi";

const EditNote = () => {
  const dispatch = useAppDispatch()
  const allNotes = useAppSelector(
    (state) => state.salesDashboard.data.notes
  )
  const selectedNote = useAppSelector(
    (state) => state.salesDashboard.data.selectedNote
  );

  const [currentNote, setCurrentNote] = useState(selectedNote?.description)

  const handleEditCurrentNote = (e: any) => {
    setCurrentNote(e.target.value)
  }

  const handleSaveNoteChanes = () => {
    dispatch(setNoteChanges({ id: selectedNote.id, description: currentNote}))
    toast.push(
      <Notification
          type={'success'}
      >
          Changes Saved Successfully
      </Notification>
  )
  }

  useEffect(() => {
    setCurrentNote(selectedNote?.description)
  }, [selectedNote])

  return (
    <>
    {
      allNotes?.length === 0 ? <div className="flex flex-col justify-center items-center h-full">
        <img width="78" height="78" src="https://img.icons8.com/color-glass/48/empty-box--v1.png" alt="empty-box--v1"/>
        <h2 className="text-black font-bold">There is no notes yet</h2>
      </div> : <div className="flex flex-col justify-start gap-4">
      <div className="edit-note__header flex flex-col pb-4 border-b">
        <h2 className="font-bold capitalize">{selectedNote?.title}</h2>
        <div className="flex flex-col mt-5 w-48">
          <div className="flex justify-between text-black mb-2">
            <span className="flex items-center gap-1">
              <HiOutlineTag />
              Tags
            </span>
            <div>
              {selectedNote?.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-black">
            <span className="flex items-center gap-1">
              <HiOutlineClock />
              CreatedAt
            </span>
            <span>{selectedNote?.createdAt}</span>
          </div>
        </div>
      </div>
      <div className="edit-note__body text-black pb-4 border-b">
        <textarea
          id="message"
          rows={20}
          defaultValue={selectedNote?.description}
          value={currentNote}
          onChange={handleEditCurrentNote}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>
      <div className="edit-note__actions flex gap-2">
        <button className="bg-blue-500 hover:bg-gray-400 text-white-800 py-2 px-4 rounded inline-flex items-center" onClick={handleSaveNoteChanes}>
          <span>Save Note</span>
        </button>
        <button className="bg-gray-100 text-black hover:bg-gray-400 text-black-800 py-2 px-4 rounded inline-flex items-center">
          <span>Cancel</span>
        </button>
      </div>
    </div>
    } 
    </>
  );
};

export default EditNote;
