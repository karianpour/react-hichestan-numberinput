import * as React from "react";
import { NumberFormat } from "./util";

export type CardNumberInputProps = {
  numberFormat?: NumberFormat;
  inputRef?: any;
  getInputRef?: any;
  disabled?: boolean;
  readOnly?: boolean;
} & React.ComponentProps<"input">;

declare const CardNumberInput: React.FC<CardNumberInputProps>;
export default CardNumberInput;
