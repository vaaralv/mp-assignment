import { Switch as AriaSwitch } from "react-aria-components";

interface SwitchProps {
  isSelected: boolean;
  onChange: (isSelected: boolean) => void;
}

export default function Switch({ isSelected, onChange }: SwitchProps) {
  return (
    <AriaSwitch
      isSelected={isSelected}
      onChange={onChange}
      className="group flex gap-2 items-center text-black font-semibold text-lg"
    >
      <div
        className={` flex h-[22px] w-[40px] shrink-0 cursor-default rounded-full  p-[2px] box-border transition duration-200 ease-in-out outline-none  ${
          isSelected ? "bg-btn-bg" : "bg-outline-light  "
        }`}
      >
        <span
          className={`h-[18px] w-[18px] transform rounded-full bg-white transition duration-100 ease-in-out ${
            isSelected ? "translate-x-full" : "translate-x-0"
          }`}
        />
      </div>
    </AriaSwitch>
  );
}
