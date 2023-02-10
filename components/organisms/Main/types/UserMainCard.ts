import { HTMLAttributes } from "react";
import { ArchiveOrders } from "./Orders";

export type UserMainCard = HTMLAttributes<HTMLDivElement> & {
  readonly archive: ArchiveOrders;
  readonly name: string,
  readonly surname: string,
  readonly role: string,
}
