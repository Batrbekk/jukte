import { ItemTypeProps } from "../../../molecules/NavList/type/itemType";

export type AddTruckProps = {
  readonly currentStep: ItemTypeProps,
  readonly onSetStep: (step: ItemTypeProps) => void;
}
