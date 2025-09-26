"use client";
import { useParams } from "next/navigation";
import type { FC } from "react";

const ReviewPage: FC = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return (
      <main>
        <h1>Review Not Found</h1>
        <p>ID parameter is missing.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Review Detail</h1>
      <p>Review ID: {id}</p>
    </main>
  );
};

export default ReviewPage;
