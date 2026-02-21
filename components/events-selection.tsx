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

interface Props {
  field: ControllerRenderProps<any, any>;
  excludedEvents?: string[];
}

export default function EventSelection({ field, excludedEvents = [] }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const selectedEvents = Array.isArray(field.value) ? field.value : [];

  const availableLinks = LINK_EVENTS.filter((e) => !excludedEvents.includes(e));

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

  const filteredLinks = availableLinks.filter((link) =>
    link.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className="mt-2">
      <Input
        placeholder="Search for events..."
        value={searchValue}
        onChange={handleInputChange}
      />

      {availableLinks.length === 0 ? (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            All available events are already subscribed.
          </p>
        </div>
      ) : filteredLinks.length === 0 ? (
        <div className="mt-4">
          <p className="text-sm text-center text-gray-600">Event not found!</p>
        </div>
      ) : (
        <div className="my-4">
          <div className="flex gap-2 items-center mb-2">
            <Checkbox
              id="links-parent"
              className="border border-black"
              checked={areAllChecked(filteredLinks)}
              onCheckedChange={(checked) =>
                handleParentChange(checked as boolean, filteredLinks)
              }
            />
            <h1 className="text-sm text-zinc-700 dark:text-foreground">
              Links
            </h1>
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
    </div>
  );
}
