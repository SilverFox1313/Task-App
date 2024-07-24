"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// components
import Form from "@components/Form";

const UpdateTaskContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id");

  const [post, setPost] = useState({ title: "", body: "", priority: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getTaskDetails = async () => {
      const response = await fetch(`/api/task/${taskId}`);
      const data = await response.json();

      setPost({
        title: data.title,
        body: data.body,
        priority: data.priority,
      });
    };

    if (taskId) getTaskDetails();
  }, [taskId]);

  const updateTask = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!taskId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/task/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          body: post.body,
          priority: post.priority,
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
      type="Edit this"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateTask}
    />
  );
};

const UpdateTask = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <UpdateTaskContent />
  </Suspense>
);

export default UpdateTask;
