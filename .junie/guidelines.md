# Junie — Guidelines for Goal-Oriented RAG with Task Master (MCP)

## 0) Scope (read me first)
- Goal: use **Task Master** as the “objective brain” (RAG and planning) and Junie as the “hands” (code, tests, commits).
- If the MCP server isn’t configured: ask to configure it, then retry.
- Default PRD path: **`.taskmaster/docs/prd.md`** (change as needed). If missing, create a minimal skeleton and confirm.

## 1) Work mantra
- **Plan → Validate → Act → Verify → Record.**
- Make **atomic changes**. Ask for confirmation only when an action is destructive or ambiguous.
- Missing info? State **up to three assumptions** and take the safest path.

## 2) Orchestration with Task Master (MCP)
Always drive work through the Task Master tools in this order:

1. **Generate/Update tasks**  
   - Tool: `generate`  
   - Create/update task files under `.taskmaster/tasks/` and any internal state. Keep the task list visible.

2. **Pick the next objective**  
   - Tool: `next`  
   - Choose the task that moves the goal forward. If blocked, propose alternatives.

3. **Inspect / Expand**  
   - Tools: `show <ids>`, `expand <id>`  
   - Turn fuzzy tasks into actionable subtasks with clear “done” criteria.

4. **Research (when context is missing)**  
   - Tool: `research "<query>"`  
   - Pull best practices / references and note the key takeaways.

5. **Move between states**  
   - Tool: `move`  
   - Reflect real progress (backlog → in-progress → done).

> If tool names differ, list available tools and pick the closest equivalents (generate tasks, get next, show/expand, research, move).

## 3) Subtask execution loop
For **each** subtask selected via `next`:

1) **Brief plan** (max six bullets): affected files, risks, tests.  
2) **Implementation**: minimal viable change; add/update **tests**; don’t mix big refactors with features.  
3) **Verification**: run the test suite; if it fails, stop, summarize, fix.  
4) **Record state**: use the MCP tool to update the subtask state.  
5) **Commit** (only if tests pass): `git commit -m “feat:” -m “- key changes” -m “- tests added” -m “relates to”`
6) **Next**: call `next` again.

## 4) Chat output format
- **Plan**: short-numbered list.  
- **Code changes**: one code block per file, with the **path at the top**.  
- **Multiple files**: list files first, then code blocks in order.  
- **Test results**: include only the useful excerpt.  
- **Final summary**: what got done, what’s left, open risks.

## 5) Engineering rules
- Style: functions ≤ **50** lines; descriptive names; avoid side effects in helpers.  
- Errors: `try/catch` with context; use a logger wrapper (no raw `console`).  
- Types > comments (strict TS if applicable).  
- Performance: avoid N+1; batch/page; measure before optimizing.  
- Security: no hardcoded secrets; sanitize inputs; no PII in logs.

## 6) Tasks & files
- Keep `.taskmaster/tasks/` as the operational source of truth.  
- Don’t manually edit internal task state files; use the MCP tools/CLI (`generate`, `move`, etc.).  
- When creating new files, add a brief description under **Relevant Files**.

## 7) When the PRD is not enough
- Recommend PRD improvements (sections, examples, acceptance criteria).  
- Always ask user to run `parse-prd`.

## 8) Priority if rules conflict
**Security > Correctness > Green tests > Performance > Speed.**
