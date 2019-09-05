import React from "react";
import ReactDom from "react-dom";

function Hi() {
  return <div>Hi.</div>;
}

ReactDom.render(<Hi></Hi>, document.getElementById("app"));
