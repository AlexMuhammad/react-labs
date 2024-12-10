import * as React from "react";

const Button = ({ display }: { display: number }) => {
  console.log("button render");

  return (
    <button style={{ color: "red", backgroundColor: "blueviolet" }}>
      {display}
    </button>
  );
};

export default React.memo(Button);
