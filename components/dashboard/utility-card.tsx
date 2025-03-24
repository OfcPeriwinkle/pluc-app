"use client";

import { Card, CardHeader, CardBody, Image } from "@heroui/react";

export default function UtilityCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="py-4 max-w-72" isPressable={true}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{title}</h4>
        <small className="text-default-500 text-left">{description}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://heroui.com/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
    </Card>
  );
}
