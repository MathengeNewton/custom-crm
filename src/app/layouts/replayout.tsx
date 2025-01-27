// layouts/DefaultLayout.tsx
import React from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}