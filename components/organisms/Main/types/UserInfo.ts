import { HTMLAttributes } from "react";

export type UserInfoProps = HTMLAttributes<HTMLDivElement> & {
  readonly _id: string,
  readonly iin: string,
  readonly phone: string,
  readonly name: string,
  readonly surname: string,
  readonly role: string,
  readonly company?: {
    readonly name?: string,
    readonly contacts?: string,
    readonly bin?: string,
    readonly account?: string,
    readonly director?: {
      readonly numberCar?: string,
      readonly phone?: string,
      readonly name?: string,
      readonly surname?: string,
    },
  };
  readonly transport?: {
    readonly type: string,
    readonly weight: number,
  },
  readonly id_card: string,
};
