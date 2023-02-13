export type OrderDescProps = {
  readonly distance: string,
  readonly duration: string,
  readonly freeCar: boolean,
  readonly onNextStepStatus: (nextStepStats: boolean) => void;
  readonly getOrderDesc: (orderDesc: string) => void;
  readonly getStartDate: (startDate: string) => void;
  readonly getEndDate: (endDate: string) => void;
  readonly getCargoLoad: (cargoLoad: string) => void;
  readonly getWeight: (weight: string) => void;
  readonly getCub: (cub: string) => void;
  readonly getPrice: (price: string) => void;
}
