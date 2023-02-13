import { HTMLAttributes } from "react";

export type TransportOrdersSectionProps = HTMLAttributes<HTMLDivElement> & {
  readonly onSetStep: () => void;
}
