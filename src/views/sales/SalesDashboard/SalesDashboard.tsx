import reducer from "./store";
import { injectReducer } from "@/store";
import AllNotes from "./components/AllNotes";
import EditNote from "./components/EditNote";
import NoteActions from "./components/NoteActions";
import ArchiveNotes from "./components/ArchiveNotes";

injectReducer("salesDashboard", reducer);

const SalesDashboard = () => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="grid grid-cols-[1fr,2fr,1fr] gap-4 h-full">
        <div className="text-white p-4">
            <AllNotes />
        </div>
        <div className="border-x text-white p-4">
          <EditNote />
        </div>
        <div className="text-white p-4">
          <NoteActions />
          <hr className="my-4" />
          <ArchiveNotes />
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
