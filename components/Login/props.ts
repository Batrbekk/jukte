import { HTMLAttributes } from 'react';
import { PaletteMode } from "@mui/material";

export type Props = HTMLAttributes<HTMLDivElement> & {
  readonly theme: PaletteMode;
};
