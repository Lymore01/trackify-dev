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

export default function ViewRequestDetails() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow className="hover:bg-gray-50 cursor-pointer">
          <TableCell className="flex items-center gap-2 my-2">
            <p className="truncate max-w-md">POST /webhook/docx</p>
          </TableCell>
          <TableCell>
            <Tag>200 OK</Tag>
          </TableCell>
          <TableCell>
            <p>234.45ms</p>
          </TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>POST /webhook/docx</DialogTitle>
          <DialogDescription>
             webhook request summary.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="p-2 mt-6 max-w-full max-h-[70vh] overflow-auto">
          <RequestEndpointSummary request={mockRequest} />
        </div>
        <DialogFooter>
          <Button>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
