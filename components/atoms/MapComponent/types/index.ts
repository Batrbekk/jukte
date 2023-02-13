export type MapComponentProps = {
  readonly from: string,
  readonly transfer: string,
  readonly transfer2: string,
  readonly transfer3: string,
  readonly transfer4: string,
  readonly to: string,
  readonly getInfoMap: (duration: string, distance: string) => void;
}
