import * as React from "react";

export type DecimalInputProps = {
  numberFormat?: NumberFormat;
  inputRef?: any;
  getInputRef?: any;
  disabled?: boolean;
  readOnly?: boolean;
  thousandSeparator?: string;
  decimalSeparator?: string;
  maxDigits?: number;
  maxDecimal?: number;
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

declare const DecimalInput: React.FC<HTMLInputElementProps & DecimalInputProps>;
export default DecimalInput;
