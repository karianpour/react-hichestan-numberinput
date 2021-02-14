import * as React from "react";
import { NumberFormat } from "./util";

export type NumberInputProps = {
  numberFormat?: NumberFormat;
  inputRef?: any;
  getInputRef?: any;
  disabled?: boolean;
  readOnly?: boolean;
  thousandSeparator?: string;
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

declare const NumberInput: React.FC<HTMLInputElementProps & NumberInputProps>;
export default NumberInput;
