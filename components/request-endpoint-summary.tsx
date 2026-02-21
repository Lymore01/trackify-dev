import CodeDisplay from "./code-display";
import Tag from "./tag";

export default function RequestEndpointSummary({ request }: { request: any }) {
  if (!request) return null;

  const {
    payload,
    response,
    statusCode = 200,
    durationMs,
    eventType,
    createdAt,
  } = request;

  const isSuccess = statusCode >= 200 && statusCode < 300;

  return (
    <div className="flex flex-col gap-6 text-sm text-gray-800 dark:text-foreground">
      {/* General Info */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Webhook Summary</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Event
            </span>
            <span className="font-mono font-medium">{eventType}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Status
            </span>
            <Tag variant={isSuccess ? "default" : "error"} className="w-fit">
              {statusCode}
              {isSuccess ? " OK" : " Fail"}
            </Tag>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Duration
            </span>
            <span
              className={durationMs > 1000 ? "text-red-500 font-semibold" : ""}
            >
              {durationMs ?? 0}ms
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Timestamp
            </span>
            <span>
              {createdAt ? new Date(createdAt).toLocaleString() : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Request Payload */}
      <div className="space-y-2">
        <h2 className="text-md font-semibold">Request Payload</h2>
        <CodeDisplay
          language="json"
          codeString={
            payload != null
              ? typeof payload === "string"
                ? payload
                : JSON.stringify(payload, null, 2)
              : "// No payload"
          }
        />
      </div>

      {/* Endpoint Response */}
      <div className="space-y-2">
        <h2 className="text-md font-semibold">Endpoint Response</h2>
        <CodeDisplay
          language={typeof response === "string" ? "text" : "json"}
          codeString={
            response != null
              ? typeof response === "string"
                ? response
                : JSON.stringify(response, null, 2)
              : "// No response body"
          }
        />
      </div>

      {/* Fixed headers */}
      <div className="space-y-2">
        <h2 className="text-md font-semibold">Request Headers</h2>
        <CodeDisplay
          language="json"
          codeString={JSON.stringify(
            {
              "Content-Type": "application/json",
              "trackify-webhook-signature": "<hmac-signature>",
            },
            null,
            2,
          )}
        />
      </div>
    </div>
  );
}
