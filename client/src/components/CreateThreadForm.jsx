import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread } from "../services/threads.service";

function CreateThreadForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Step 1: Get the QueryClient so we can invalidate queries
  const queryClient = useQueryClient();

  // Step 2: Set up the mutation
  const mutation = useMutation({
    mutationFn: createThread,          // reference, not createThread()
    onSuccess: () => {
      // Step 4: Mark ['threads'] stale → TanStack Query auto-refetches
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      // Reset form to clean state
      setTitle("");
      setBody("");
    },
    onError: (error) => {
      // onError fires on any non-2xx response
      console.error("Post failed:", error.message);
    },
  });

  // Step 3: Fire mutation on submit
  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({ title, body });  // { title, body } → mutationFn param
  }

  return (
    <form onSubmit={handleSubmit} className="create-thread-form">
      <h2>Post a Thread</h2>

      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind?"
          disabled={mutation.isPending}
        />
      </div>

      <div className="field">
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share the details…"
          rows={4}
          disabled={mutation.isPending}
        />
      </div>

      {/* Step 5: Inline error — shows when server returns non-2xx */}
      {mutation.isError && (
        <p className="err" role="alert">
          {mutation.error?.response?.data?.message || mutation.error.message}
        </p>
      )}

      {/* Step 3 (guard): disable button while POST is in flight */}
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Posting…" : "Post thread"}
      </button>
    </form>
  );
}

export default CreateThreadForm;
