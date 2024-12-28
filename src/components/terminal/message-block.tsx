import clsx from "clsx";
import "./message-block.css";

function TxIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon icon-tabler icons-tabler-filled icon-tabler-arrow-badge-right"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 6l-.112 .006a1 1 0 0 0 -.669 1.619l3.501 4.375l-3.5 4.375a1 1 0 0 0 .78 1.625h6a1 1 0 0 0 .78 -.375l4 -5a1 1 0 0 0 0 -1.25l-4 -5a1 1 0 0 0 -.78 -.375h-6z" />
    </svg>
  );
}

function RxIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon icon-tabler icons-tabler-filled icon-tabler-arrow-badge-left"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 6h-6a1 1 0 0 0 -.78 .375l-4 5a1 1 0 0 0 0 1.25l4 5a1 1 0 0 0 .78 .375h6l.112 -.006a1 1 0 0 0 .669 -1.619l-3.501 -4.375l3.5 -4.375a1 1 0 0 0 -.78 -1.625z" />
    </svg>
  );
}

interface Props {
  type: "tx" | "rx";
  message: string;
}

export default function MessageBlock({ type, message }: Props) {
  return (
    <>
      <div className={clsx("message-block", `message-${type}`)}>
        {type === "tx" ? <TxIcon /> : <RxIcon />}
        <span className="message-content">{message}</span>
      </div>
    </>
  );
}
