import { Separator } from "./ui/separator";

export default function LinkDetails({
  createdAt,
  updatedAt,
  trackingId,
}: {
  createdAt: Date;
  updatedAt: Date;
  trackingId: string;
}) {
  return (
    <div className="mt-2 ml-4 space-y-4">
      <div className="space-y-4 text-sm">
        <h1 className="text-zinc-700 ">Creation Date</h1>
        <p>{new Date(createdAt).toUTCString()}</p>
      </div>
      <Separator />
      <div className="space-y-4 text-sm">
        <h1 className="text-zinc-700 ">Last Updated</h1>
        <p>{new Date(updatedAt).toUTCString()}</p>
      </div>
      <Separator />
      <div className="space-y-4 text-sm">
        <h1 className="text-zinc-700 ">Tracking id</h1>
        <p>{trackingId}</p>
      </div>
    </div>
  );
}
