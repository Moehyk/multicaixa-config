import React from "react";

export default function PageDisplayer({ title }: { title: string }) {
  return (
    <div className="text-3xl font-semibold text-gray-700 mt-2">{title}</div>
  );
}
