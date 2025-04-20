import { Separator } from "./ui/separator";

export default function LinkDetails() {
  return (
    <div className="mt-2 ml-4 space-y-4">
      <div className="space-y-4 text-sm">
        <h1 className="text-zinc-700 ">Creation Date</h1>
        <p>March 7, 2025 at 11:03 PM</p>
      </div>
      <Separator />
      <div className="space-y-4 text-sm">
        <h1 className="text-zinc-700 ">Last Updated</h1>
        <p>March 18, 2025 at 3:48 AM</p>
      </div>
      <Separator />
      <div className="space-y-4 text-sm">
        <h1 className="text-zinc-700 ">Tracking id</h1>
        <p>cmdkss</p>
      </div>
    </div>
  );
}
