import { HTMLAttributes } from "react";
import {ItemTypeProps} from "../../../molecules/NavList/type/itemType";

export type UserMainCard = HTMLAttributes<HTMLDivElement> & {
  readonly name: string,
  readonly surname: string,
  readonly role: string,
  readonly onSetStep: (step: ItemTypeProps) => void;
}
