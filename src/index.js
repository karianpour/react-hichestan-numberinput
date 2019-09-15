import React from 'react';
import { render } from "react-dom";
import Example from './Example';

const App = () => (
  <div dir={"rtl"} style={{ width: 640, margin: "15px auto" }}>
    <h1>کمپننت عدد</h1>
    <br/>ورژن ۱،۰ ساخت ۳
    <ul>
      <li>نمایش عدد فارسی یا لاتین</li>
      <li>ذخیره عدد لاتین، باعث میشود که داده صحیح به سرور داده شود</li>
      <li>نمایش غیر عدد در صورتی که داده از بیرون به آن وارد شود.</li>
      <li>نمایش کیبورد عددی در مبایل (غیر از مرورگر سامسونگ) </li>
    </ul>

    <Example/>

  </div>
);

render(<App />, document.getElementById("root"));
