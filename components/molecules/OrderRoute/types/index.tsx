import { ItemTypeProps } from "../../NavList/type/itemType";

export type OrderRouteProps = {
  readonly currentStep: ItemTypeProps,
  readonly getInfoFromMap:
    (
      duration: string,
      distance: string,
      from: string,
      transfer: string,
      transfer2: string,
      transfer3: string,
      transfer4: string,
      to: string,
    ) => void;
  readonly getFrom: (from: string) => void;
  readonly onNextStepStatus: (nextStepStats: boolean) => void;
  readonly onFreeCarStatus: (freeCarStatus: boolean) => void;
}
