import { ChevronsUpDown } from "lucide-react";

const RequestBar = ({
  view,
  setView,
}: {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <section className="max-w-6xl mx-auto mb-4">
      <div className="bar w-full glass px-4 py-2 rounded-full">
        <div className="flex items-center justify-between">
          <h3>Requests </h3>
          <div className="flex gap-4 items-center">
            <div className="view flex items-center  p-1 rounded-full glass">
              <span
                onClick={() => setView("List")}
                className={`cursor-pointer py-1 px-4 rounded-full ${
                  view === "List" ? "bg-black" : ""
                }`}
              >
                List
              </span>
              <span
                onClick={() => setView("Table")}
                className={`cursor-pointer py-1 px-4 rounded-full ${
                  view === "Table" ? "bg-black" : ""
                }`}
              >
                Table
              </span>
            </div>
            <div className="tag flex items-center gap-1 py-2 px-4 bg-fourth .tag rounded-full">
              Last 24h <ChevronsUpDown size={20} />
            </div>
            <div className="tag flex items-center gap-1 py-2 px-4 bg-fourth .tag rounded-full">
              Method: All <ChevronsUpDown size={20} />
            </div>
            <div className="tag flex items-center gap-1 py-2 px-4 bg-fourth .tag rounded-full">
              Response: All <ChevronsUpDown size={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestBar;
