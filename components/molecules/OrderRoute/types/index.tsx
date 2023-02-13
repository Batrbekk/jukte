export type OrderRouteProps = {
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
  readonly onNextStepStatus: (nextStepStats: boolean) => void;
}
