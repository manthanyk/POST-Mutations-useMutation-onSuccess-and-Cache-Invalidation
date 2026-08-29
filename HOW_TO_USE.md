# Threadbase — useMutation Solution

## One-time setup (do this first)

```bash
# 1. Fork the starter repo on GitHub, then clone YOUR fork
git clone https://github.com/<your-username>/POST-Mutations-useMutation-onSuccess-and-Cache-Invalidation.git
cd POST-Mutations-useMutation-onSuccess-and-Cache-Invalidation

# 2. Create a feature branch
git checkout -b feat/create-thread-mutation

# 3. Install deps
npm run setup

# 4. Copy env file
cp client/.env.development.example client/.env.development

# 5. Run both servers
npm run dev     # Express :3001, Vite :5173
```

---

## Copy the solution files

Replace (or create) these files in your cloned repo:

| Solution file | → Destination in your repo |
|---|---|
| `client/src/components/CreateThreadForm.jsx` | `client/src/components/CreateThreadForm.jsx` |
| `client/src/services/threads.service.js` | `client/src/services/threads.service.js` |
| `client/src/lib/apiClient.js` | `client/src/lib/apiClient.js` |
| `client/src/components/ThreadList.jsx` | `client/src/components/ThreadList.jsx` *(only if missing)* |
| `client/src/App.jsx` | `client/src/App.jsx` *(only if missing)* |
| `client/src/App.css` | `client/src/App.css` |

> **Note:** The starter repo already has some of these files.
> Only overwrite `CreateThreadForm.jsx` if you're sure — that's the one file you **must** replace.
> Check if `threads.service.js` already exports `createThread`; if it does, skip that file.

---

## What the key file does (CreateThreadForm.jsx)

```
mutation.mutate({ title, body })
  → mutationFn: createThread          POST /api/threads
  → onSuccess: invalidateQueries      marks ['threads'] stale
  → useQuery refetches automatically  GET /api/threads
  → new thread appears on screen      no page reload ✓
```

### Checklist
- [ ] `useMutation({ mutationFn: createThread, ... })` — reference, not `createThread()`
- [ ] `mutation.mutate({ title, body })` called inside `handleSubmit`
- [ ] `disabled={mutation.isPending}` on the submit button
- [ ] Button label → `"Posting…"` while pending, `"Post thread"` otherwise
- [ ] `queryClient.invalidateQueries({ queryKey: ["threads"] })` inside `onSuccess`
- [ ] `{mutation.isError && <p className="err">…</p>}` rendered below button

---

## Commit & submit

```bash
git add client/src/components/CreateThreadForm.jsx
git commit -m "feat: post a thread with useMutation and invalidate the list"
git push origin feat/create-thread-mutation
```

Then open a PR on your fork: `feat/create-thread-mutation → main`.

In the PR description paste a Network-tab screenshot showing:
```
POST /api/threads   201
GET  /api/threads   200   ← this fires automatically after onSuccess
```
