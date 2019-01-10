import React from "react";

import classes from "./modal.css";

const modal = props => {
  return (
    <div className={classes.Module}>
      {props.children}
    </div>
  );
};

export default modal;
