import * as React from "react";
import { ChangeEvent } from "react";
import { NumberFormat } from "./util";

interface NumberEventType extends ChangeEvent<HTMLInputElement> {
  target: EventTarget & HTMLInputElement & { value: number };
}
interface StringEventType extends ChangeEvent<HTMLInputElement> {
  target: EventTarget & HTMLInputElement & { value: string };
}

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
      onChange?: (event: StringEventType) => void;
      value?: string;
      asString?: true;
    }
  | {
      onChange?: (event: NumberEventType) => void;
      value?: number;
      asString?: false;
    }
) &
  React.ComponentProps<"input">;

declare const DecimalInput: React.FC<DecimalInputProps>;
export default DecimalInput;
