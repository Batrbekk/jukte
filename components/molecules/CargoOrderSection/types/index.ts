import { HTMLAttributes } from "react";

export type CargoOrdersSectionProps = HTMLAttributes<HTMLDivElement> & {
  readonly onSetStep: () => void;
}
