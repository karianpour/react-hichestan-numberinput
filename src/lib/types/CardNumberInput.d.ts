import * as React from "react";
import { NumberFormat } from "./util";

export type CardNumberProps = {
  numberFormat?: NumberFormat;
  inputRef: any;
  getInputRef: any;
  name: string;
  style: object;
  className: string;
  disabled: bool;
  readOnly: bool;
  onClick: func;
  onFocus: func;
  value: string;
} & (
  | {
      onChange?: (event: { target: { name: string; value: string } }) => void;
      value?: string;
      asString?: true;
    }
  | {
      onChange?: (event: { target: { name: string; value: number } }) => void;
      value?: number;
      asString?: false;
    }
) &
  React.ComponentProps<"input">;

declare const CardNumberInput: React.FC<
  HTMLInputElementProps & CardNumberProps
>;
export default CardNumberInput;
