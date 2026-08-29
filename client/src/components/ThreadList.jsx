import { useQuery } from "@tanstack/react-query";
import { fetchThreads } from "../services/threads.service";

function ThreadList() {
  const {
    data: threads,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["threads"],           // same key CreateThreadForm invalidates
    queryFn: fetchThreads,
  });

  if (isLoading) return <p className="status">Loading threads…</p>;
  if (isError)   return <p className="status err">Error: {error.message}</p>;
  if (!threads?.length) return <p className="status">No threads yet — post one!</p>;

  return (
    <ul className="thread-list">
      {threads.map((thread) => (
        <li key={thread.id} className="thread-card">
          <h3 className="thread-title">{thread.title}</h3>
          <p  className="thread-body">{thread.body}</p>
          <span className="thread-meta">
            {new Date(thread.createdAt).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default ThreadList;
