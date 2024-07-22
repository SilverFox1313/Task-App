"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateTask = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ title: "", body: "", priority: "low" });

  const createTask = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/task/new", {
        method: "POST",
        body: JSON.stringify({
          title: post.title,
          userId: session?.user.id,
          body: post.body,
          priority: post.priority
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create a new'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createTask}
    />
  );
};

export default CreateTask;
