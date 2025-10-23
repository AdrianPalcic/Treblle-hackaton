import { Clock, MapPin, Zap } from "lucide-react";

const ListView = () => {
  return (
    <section className="max-w-6xl mx-auto ">
      <div className="glass p-3">
        <div id="requests" className="flex flex-col gap-2 w-full">
          <div
            id="request"
            className="py-4 px-2 w-full bg-tetriary rounded-2xl request-border flex justify-between items-center gap-4"
          >
            <div className="flex-1 ">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <div className="method py-1 px-3 bg-blue-500/20  rounded-full text-[16px] font-semibold text-blue-400">
                    GET
                  </div>
                  <div className="response py-1 px-3 bg-green-400/20  rounded-full text-[16px] font-semibold text-green-300">
                    200
                  </div>
                  <span>auth/register</span>
                </div>
                <div className="flex gap-3 items-center mt-2">
                  <span className="flex gap-1 items-center font-extralight text-[14px]">
                    <Zap size={18} className="text-white/60" />
                    25.26ms
                  </span>
                  <span className="flex gap-1 items-center font-extralight text-[14px]">
                    <MapPin size={18} className="text-white/60" />
                    Senj, Croatia
                  </span>
                  <span className="flex gap-1 items-center font-extralight text-[14px]">
                    <Clock size={18} className="text-white/60" />
                    25.26ms
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 border border-solid border-white"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListView;
