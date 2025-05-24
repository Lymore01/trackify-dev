import CodeDisplay from "./code-display";
import Tag from "./tag";

export default function RequestEndpointSummary({ request }: { request: any }) {
  const {
    headers = {
      "Content-Type": "application/json",
    },
    payload,
    response,
    statusCode = 200,
    durationMs,
    eventType,
    createdAt,
  } = request || {};

  const isSuccess = statusCode >= 200 && statusCode < 300;

  return (
    <div className="flex flex-col gap-6 text-sm text-gray-800">
      {/* General Info */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Webhook Summary</h2>
        <div className="flex items-center gap-4">
          {createdAt && (
            <p className="font-mono">
              <strong>Timestamp:</strong> {new Date(createdAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-md font-semibold">Request Payload</h2>
        <CodeDisplay
          codeString={JSON.stringify(
            {
              data: "",
              type: eventType,
            },
            null,
            2
          )}
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-md font-semibold">Simulated Response</h2>
        <CodeDisplay
          codeString={JSON.stringify(
            {
              success: isSuccess,
              message: isSuccess ? "Request successful" : "Request failed",
            },
            null,
            2
          )}
        />
      </div>

      {/* Headers */}
      <div className="space-y-2">
        <h2 className="text-md font-semibold">Request Headers</h2>
        <CodeDisplay codeString={JSON.stringify(headers, null, 2)} />
      </div>
    </div>
  );
}
