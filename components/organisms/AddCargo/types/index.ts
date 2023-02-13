import { ItemTypeProps } from "../../../molecules/NavList/type/itemType";

export type AddCargoProps = {
  readonly currentStep: ItemTypeProps,
  readonly onSetStep: (step: ItemTypeProps) => void;
}
