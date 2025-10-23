import Hero from "./components/Hero";
import ListView from "./components/ListView";
import Navbar from "./components/Navbar";
import RequestBar from "./components/RequestBar";
import { useEffect, useState } from "react";
import TableView from "./components/TableView";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import type { APIResponse } from "./types";
import Spinner from "./components/Spinner";

function App() {
  // View states
  const [view, setView] = useState("List");

  // Sorting states
  const [selectedTime, setSelectedTime] = useState("Last 24h");
  const [selectedMethod, setSelectedMethod] = useState("All");
  const [selectedResponse, setSelectedResponse] = useState("All");

  const [activeSort, setActiveSort] = useState<"createdAt" | "responseTime">(
    "createdAt"
  );
  const [sortByCreatedAt, setSortByCreatedAt] = useState<"latest" | "oldest">(
    "latest"
  );
  const [sortByResponseTime, setSortByResponseTime] = useState<
    "fastest" | "slowest"
  >("fastest");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApiCall, setSelectedApiCall] = useState<APIResponse | null>(
    null
  );

  // API state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [responses, setResponses] = useState<APIResponse[]>([]);

  //Need theeeese
  const baseURL = "https://jsonplaceholder.typicode.com";
  const endpoints = ["todos", "users", "albums", "posts"];
  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  //God help me
  const callAPI = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const allResponses: APIResponse[] = [];
      let idCounter = 1;

      for (const endpoint of endpoints) {
        for (const method of methods) {
          try {
            const startTime = performance.now();

            const options: RequestInit = {
              method: method,
            };

            if (method === "POST" || method === "PUT" || method === "PATCH") {
              options.headers = {
                "Content-Type": "application/json",
              };
              options.body = JSON.stringify({
                title: "Test",
                body: "I want to fetch",
                userId: 1,
              });
            }

            const response = await fetch(`${baseURL}/${endpoint}`, options);
            const endTime = performance.now();
            const responseTime = (endTime - startTime).toFixed(2) + "ms";
            const responseHeaders: Record<string, string> = {};
            response.headers.forEach((value, key) => {
              responseHeaders[key] = value;
            });

            let data = null;
            try {
              const contentType = response.headers.get("content-type");
              if (contentType && contentType.includes("application/json")) {
                data = await response.json();
              }
            } catch (jsonError) {
              console.log("Error parsing JSON:", jsonError);
            }

            const timestamp = new Date().toISOString();

            allResponses.push({
              id: idCounter++,
              endpoint,
              method,
              status: response.status,
              responseTime,
              responseHeaders,
              location: "Zagreb, Croatia",
              data,
              timestamp: timestamp,
              createdAt: timestamp,
            });
          } catch (error) {
            console.error(`Error calling ${method} ${endpoint}:`, error);
            const timestamp = new Date().toISOString();

            allResponses.push({
              id: idCounter++,
              endpoint,
              method,
              status: 0,
              responseTime: "0ms",
              responseHeaders: {},
              location: "Zagreb, Croatia",
              data: null,
              timestamp: timestamp,
              createdAt: timestamp,
              error: String(error),
            });
          }
        }
      }

      setResponses(allResponses);

      console.log("All API responses:", allResponses);
    } catch (error) {
      console.error("Error in API call:", error);
      setErrorMessage(
        "There has been an error while fetching data, please try again"
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    callAPI();
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      {errorMessage && (
        <div className="flex justify-center">{errorMessage}</div>
      )}
      {!isLoading ? (
        <>
          <RequestBar
            view={view}
            setView={setView}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            selectedResponse={selectedResponse}
            setSelectedResponse={setSelectedResponse}
            activeSort={activeSort}
            setActiveSort={setActiveSort}
            sortByCreatedAt={sortByCreatedAt}
            setSortByCreatedAt={setSortByCreatedAt}
            sortByResponseTime={sortByResponseTime}
            setSortByResponseTime={setSortByResponseTime}
          />
          {view === "List" ? (
            <ListView
              responses={responses}
              selectedTime={selectedTime}
              selectedMethod={selectedMethod}
              selectedResponse={selectedResponse}
              activeSort={activeSort}
              sortByCreatedAt={sortByCreatedAt}
              sortByResponseTime={sortByResponseTime}
              onApiCallClick={(call) => {
                setSelectedApiCall(call);
                setIsModalOpen(true);
              }}
            />
          ) : (
            <TableView
              responses={responses}
              selectedTime={selectedTime}
              selectedMethod={selectedMethod}
              selectedResponse={selectedResponse}
              activeSort={activeSort}
              sortByCreatedAt={sortByCreatedAt}
              sortByResponseTime={sortByResponseTime}
              onApiCallClick={(call) => {
                setSelectedApiCall(call);
                setIsModalOpen(true);
              }}
            />
          )}
        </>
      ) : (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        apiCall={selectedApiCall}
      />
      <Footer />
    </main>
  );
}

export default App;
