import * as React from "react";
import { NumberFormat } from "./util";

export type NumberInputProps = {
  numberFormat?: NumberFormat;
  inputRef?: any;
  getInputRef?: any;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  onChange?: (event: { target: { name: string; value: string } }) => void;
  value?: string;
} & React.ComponentProps<"input">;

declare const NumberInput: React.FC<NumberInputProps>;
export default NumberInput;
