import React from "react";
import Navigation from "./app/navigations/Navigation";
import { firebaseApp } from "./app/utils/firebase";
import { decode, encode } from "base-64";

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  return <Navigation />;
}
