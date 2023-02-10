import { HTMLAttributes } from "react";
import {ItemTypeProps} from "./itemType";

export type NavListProps = HTMLAttributes<HTMLDivElement> & {
  readonly role: string;
  readonly onSetStep: (step: ItemTypeProps) => void;
  readonly currentStep: ItemTypeProps;
};
