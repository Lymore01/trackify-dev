import CodeDisplay from "./code-display";
import Tag from "./tag";

export default function RequestEndpointSummary({ request }: { request: any }) {
  const { headers, body, status } = request;

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-4">
        <h1>POST /webhook/docx</h1>
        <CodeDisplay codeString={JSON.stringify(body, null, 2)} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <h1>{status} OK</h1>
          <Tag>Success</Tag>
        </div>
        <CodeDisplay
          codeString={JSON.stringify(
            {
              success: true,
              message: "Request successful",
              details: body,
            },
            null,
            2
          )}
        />
      </div>

      {/* Headers Section */}
      <div className="space-y-4">
        <h1>Headers</h1>
        <CodeDisplay codeString={JSON.stringify(headers, null, 2)} />
      </div>
    </div>
  );
}
