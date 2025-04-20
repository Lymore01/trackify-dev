import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import RequestEndpointSummary from "../request-endpoint-summary";
import { mockRequest } from "@/lib/constants";
import Tag from "../tag";
import { Separator } from "../ui/separator";

export default function ViewLinkAnalyticsDetails() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow className="hover:bg-gray-50 cursor-pointer">
          <TableCell>
            <p>March 7, 2025</p>
          </TableCell>
          <TableCell className="flex items-center gap-2 my-2">
            <p className="truncate max-w-md">23</p>
          </TableCell>
          <TableCell>41.65.4.5</TableCell>
          <TableCell>
            <p>KE</p>
          </TableCell>
          <TableCell>
            <p>Android</p>
          </TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>https://trackify/shortid/cmdkss</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="p-2 max-w-full max-h-[70vh] overflow-auto">graph</div>
        <DialogFooter>
          <Button>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
