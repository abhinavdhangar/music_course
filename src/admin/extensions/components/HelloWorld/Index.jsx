
import React from "react";
import { Button } from "@strapi/design-system/Button";
import Up from "@strapi/icons/Up";

const HelloWorldButton = () => {
  return (
    <Button
      variant="secondary"
      startIcon={<Up />}
      onClick={() => alert("Hello World")}
    >
      Hello World
    </Button>
  );
};

export default HelloWorldButton;