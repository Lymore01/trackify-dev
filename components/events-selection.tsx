import { ControllerRenderProps } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { useState } from "react";
import { formSchema } from "./forms/add-endpoint";
import { z } from "zod";

const LINK_EVENTS: string[] = [
  "link_created",
  "link_updated",
  "link_deleted",
  "link_clicked",
];
const USER_EVENTS: string[] = ["user_created", "user_updated", "user_deleted"];

type FormData = {
  url?: string;
  description: string;
  events: string[];
  app: string;
};

interface Props {
  field: ControllerRenderProps<z.infer<typeof formSchema>, "events">;
}

export default function EventSelection(
  { field }: Props
) {
  const [searchValue, setSearchValue] = useState("");
  // Ensure field.value is always an array
  const selectedEvents = Array.isArray(field.value) ? field.value : [];

  const areAllChecked = (events: string[]) =>
    events.every((event) => selectedEvents.includes(event));

  const handleParentChange = (checked: boolean, events: string[]) => {
    if (checked) {
      field.onChange([...new Set([...selectedEvents, ...events])]);
    } else {
      field.onChange(selectedEvents.filter((event) => !events.includes(event)));
    }
  };

  const handleChildChange = (checked: boolean, event: string) => {
    if (checked) {
      field.onChange([...selectedEvents, event]);
    } else {
      field.onChange(selectedEvents.filter((item) => item !== event));
    }
  };

  interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleInputChange = (e: InputChangeEvent): void => {
    setSearchValue(e.target.value);
  };

  const filteredLinks = LINK_EVENTS.filter((link) => {
    return link.toLowerCase().includes(searchValue.toLowerCase());
  });

  const filteredUsers = USER_EVENTS.filter((user) => {
    return user.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div className="mt-2">
      <Input
        placeholder="Search for events..."
        value={searchValue}
        onChange={handleInputChange}
      />

      {filteredLinks.concat(filteredUsers).length === 0 && (
        <div className="mt-4">
          <p className="text-sm text-center text-gray-600">Event not found!</p>
        </div>
      )}

      {/* Links Section */}
      {filteredLinks.length > 0 && (
        <div className="my-4">
          <div className="flex gap-2 items-center mb-2">
            <Checkbox
              id="links-parent"
              className="border border-black"
              checked={areAllChecked(LINK_EVENTS)}
              onCheckedChange={(checked) =>
                handleParentChange(checked as boolean, LINK_EVENTS)
              }
            />
            <h1 className="text-sm text-zinc-700">Links</h1>
          </div>
          <div className="ml-6">
            {filteredLinks.map((event) => (
              <div key={event} className="flex gap-2 items-center mb-2">
                <Checkbox
                  id={event}
                  className="border border-black"
                  checked={selectedEvents.includes(event)}
                  onCheckedChange={(checked) =>
                    handleChildChange(checked as boolean, event)
                  }
                />
                <p className="text-sm">{event}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users Section */}
      {/* {filteredUsers.length > 0 && (
        <div className="my-4">
          <div className="flex gap-2 items-center mb-2">
            <Checkbox
              id="users-parent"
              className="border border-black"
              checked={areAllChecked(USER_EVENTS)}
              onCheckedChange={(checked) =>
                handleParentChange(checked as boolean, USER_EVENTS)
              }
            />
            <h1 className="text-sm text-zinc-700">Users</h1>
          </div>
          <div className="ml-6">
            {filteredUsers.map((event) => (
              <div key={event} className="flex gap-2 items-center mb-2">
                <Checkbox
                  id={event}
                  className="border border-black"
                  checked={selectedEvents.includes(event)}
                  onCheckedChange={(checked) =>
                    handleChildChange(checked as boolean, event)
                  }
                />
                <p className="text-sm">{event}</p>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
