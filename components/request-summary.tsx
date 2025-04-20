import RequestEndpointSummary from "./request-endpoint-summary";
import RequestsTable from "./tables/requests-table";

export default function RequestSummary() {
  return (
    <div className="mt-4">
      <h1>All Requests</h1>
      <div className="mt-4 gap-4">
        <div className="">
          <RequestsTable />
        </div>
      </div>
    </div>
  );
}
