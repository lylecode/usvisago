import { ButtonProps, Button as HeroButton } from "@heroui/button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

const Button = (props: ButtonProps) => {
  return (
    <HeroButton
      className={cn(
        props.color === "primary" &&
          "bg-blue-600 hover:bg-blue-500 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20",
        props.fullWidth && "w-full"
      )}
      radius="sm"
      disableAnimation
      {...props}
    >
      {props.children}
    </HeroButton>
  );
};

export default Button;
