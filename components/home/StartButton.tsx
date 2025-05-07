"use client";

import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";
const StartButton = () => {
  const router = useRouter();
  const handleClick = () => {
    addToast({ title: "test", color: "danger" });

    router.push("/step1");
  };
  return (
    <Button
      size="lg"
      color="primary"
      className="w-[70%]"
      radius="sm"
      href=""
      onPress={handleClick}
    >
      开始在线申请
    </Button>
  );
};

export default StartButton;
