import * as React from "react";
import { NumberFormat } from "./util";

export type CardNumberProps = {
  numberFormat?: NumberFormat;
  inputRef: any;
  getInputRef: any;
  disabled: boolean;
  readOnly: boolean;
} & React.ComponentProps<"input">;

declare const CardNumberInput: React.FC<CardNumberProps>;
export default CardNumberInput;
