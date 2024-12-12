import React from "react";
import { useAppSelector } from "../store";
import SingleNote from "./SingleNote";



const ArchiveNotes = () => {
  const allNotes = useAppSelector((state) => state.salesDashboard.data.notes);

  return (
    <div>
      <h6 className="text-black">Archived Notes</h6>
      {allNotes?.filter((note: any) => note.status === 'archived').length > 0 ? <div className="overflow-y-auto h-96 w-full mt-5">
        {allNotes
          ?.filter((note: any) => note.status === "archived")
          ?.map((note: any) => (
            <SingleNote key={note?.id} {...note} />
          ))}
      </div> : <div className="flex flex-col justify-center items-center h-96">
      <img width="78" height="78" src="https://img.icons8.com/skeuomorphism/32/archive-folder.png" alt="archive-folder"/>
        <h5 className="text-black font-bold">There is no archived notes</h5>
      </div>}
    </div>
  );
};

export default ArchiveNotes;
