import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as AriaSelect,
  SelectValue,
  Key,
} from "react-aria-components";
import Chevron from "./Chevron";
import CheckIcon from "@spectrum-icons/workflow/Checkmark";
import { useState } from "react";

interface SelectOption {
  id: Key;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  selectedOptionId?: Key;
  onSelectionChange: (selectedOptionId: Key) => void;
}

export default function Select({
  options,
  selectedOptionId,
  onSelectionChange,
}: SelectProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <AriaSelect
      className="flex flex-col gap-0.5 max-w-[275px]"
      selectedKey={selectedOptionId}
      onSelectionChange={onSelectionChange}
      onOpenChange={setMenuOpen}
    >
      <Label className="cursor-default text-sm">Hotel</Label>
      <Button className="flex items-center cursor-default rounded-lg border border-outline-light py-2 px-3 text-base text-left leading-normal focus:outline-none focus-visible:ring-2 ring-white ring-offset-2 ring-offset-btn-bg">
        <SelectValue className="flex-1 truncate placeholder-shown font-light" />
        <div
          className={`${menuOpen ? "rotate-180" : ""} transition duration-300`}
        >
          <Chevron direction="down" />
        </div>
      </Button>
      <Popover className="max-h-60 w-[--trigger-width] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out">
        <ListBox className="outline-none p-1 font-nunito font-light">
          {options.map(({ id, label }) => (
            <ListBoxItem
              key={`select-item-${id}`}
              textValue={label}
              id={id}
              className="group flex items-center gap-2 cursor-default select-none py-2 px-4 outline-none rounded focus:bg-btn-bg focus:text-white"
            >
              {({ isSelected }) => (
                <>
                  <span className="flex-1 flex items-center gap-2 truncate font-normal group-selected:font-medium">
                    {label}
                  </span>
                  <span className="w-5 flex items-center text-btn-bg group-focus:text-white">
                    {isSelected && <CheckIcon size="S" />}
                  </span>
                </>
              )}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
