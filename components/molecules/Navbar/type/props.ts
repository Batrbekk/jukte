import { HTMLAttributes } from "react";
import { ItemTypeProps } from "../../NavList/type/itemType";

export type NavbarProps = HTMLAttributes<HTMLDivElement> & {
  readonly role: string;
  readonly onSetStep: (step: ItemTypeProps) => void;
  readonly currentStep: ItemTypeProps;
};
