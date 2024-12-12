import React from "react";
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { HiOutlineTag, HiOutlineClock  } from "react-icons/hi";
import { useAppDispatch, setSelectedNote, unArchiveNote } from "../store";

type SingleNote = {
  id: number;
  title: string;
  description: string;
  tags: [];
  createdAt: string;
  status: string
};

const SingleNote = ({ id, title, description, tags, createdAt, status }: SingleNote) => {

  const dispatch = useAppDispatch()

    const handleSelectNote = () => {
        let selectedNote = {
            id, 
            title, 
            description, 
            tags,
            createdAt
        }
        dispatch(setSelectedNote(selectedNote))
    }

    const handleUnArchiveNote = () => {
      dispatch(unArchiveNote({ id }))
      toast.push(
      <Notification
          type={'success'}
      >
          Changed Note Status Successfully
      </Notification>
      )
    }

  return (
    <div className="w-full flex flex-col gap-2 mb-4 border-b rounded pb-3 p-2 hover:bg-gray-100 transition-all duration-300 ease-in-out" onClick={handleSelectNote}>
      <h5 className="text-black font-bold capitalize">{title}</h5>
      <div className="mb-3">
      {tags.map((tag: string, index: number) => (
        <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
          {tag}
        </span>
      ))}
      </div>
      <small className="text-black">{createdAt}</small>
      {status === 'archived' && <div className="flex justify-center">
  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleUnArchiveNote}>Unarchive</button>
</div>}
    </div>
  );
};

export default SingleNote;
