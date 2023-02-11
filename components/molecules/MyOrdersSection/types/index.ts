import { HTMLAttributes } from "react";

export type MyOrdersSectionProps = HTMLAttributes<HTMLDivElement> & {
  readonly onSetStep: () => void;
}
