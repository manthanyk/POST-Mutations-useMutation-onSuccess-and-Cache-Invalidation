import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateThreadForm from "./components/CreateThreadForm";
import ThreadList from "./components/ThreadList";
import "./App.css";

// One QueryClient instance for the whole app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,          // always refetch after invalidation
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="app-header">
          <h1>Threadbase</h1>
          <p className="tagline">Post a thought. See it appear — no refresh needed.</p>
        </header>

        <main className="app-main">
          <section className="form-section">
            <CreateThreadForm />
          </section>

          <section className="list-section">
            <h2>All Threads</h2>
            <ThreadList />
          </section>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
