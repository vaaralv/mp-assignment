interface ChevronProps {
  direction: "up" | "down" | "left" | "right";
}

export default function Chevron({ direction }: ChevronProps) {
  function getRotation() {
    switch (direction) {
      case "up":
        return "rotate-180";
      case "down":
        return "";
      case "left":
        return "rotate-90";
      case "right":
        return "-rotate-90";
    }
  }
  return (
    <svg
      className={getRotation()}
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L7 7L13 1"
        stroke="#64748B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
