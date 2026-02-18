---
name: planning
description: Writes comprehensive implementation plans with bite-sized tasks. Use when you have a spec or requirements for a multi-step task, before touching code and after a design is approved.
---

# Writing Plans

## When to use this skill
- When you have a spec or requirements for a multi-step task
- Before touching code
- After a design is approved (often from the brainstorming skill)

## Overview

Write comprehensive implementation plans assuming the engineer has zero context for our codebase and questionable taste. Document everything they need to know: which files to touch for each task, code, testing, docs they might need to check, how to test it. Give them the whole plan as bite-sized tasks. DRY. YAGNI. TDD. Frequent commits.

## Workflow

1.  **Analyze Request**: Understand the goal, architecture, and tech stack.
2.  **Break Down Tasks**: Create tasks of 2-5 minutes granularity.
3.  **Draft Plan**: Write the plan in markdown format.
4.  **Review Plan**: Ensure it covers all requirements and follows principles (DRY, YAGNI, TDD).
5.  **Save Plan**: Save to `docs/plans/YYYY-MM-DD-<feature-name>.md`.

## Output Template

**Every plan MUST start with this header:**

```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

---
```

## Task Structure

Each task should follow this structure:

```markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py:123-145`
- Test: `tests/exact/path/to/test.py`

**Step 1: Write the failing test**

```python
def test_specific_behavior():
    result = function(input)
    assert result == expected
```

**Step 2: Run test to verify it fails**

Run: `pytest tests/path/test.py::test_name -v`
Expected: FAIL with "function not defined"

**Step 3: Write minimal implementation**

```python
def function(input):
    return expected
```

**Step 4: Run test to verify it passes**

Run: `pytest tests/path/test.py::test_name -v`
Expected: PASS

**Step 5: Commit**

```bash
git add tests/path/test.py src/path/file.py
git commit -m "feat: add specific feature"
```
```

## Instructions

-   **Bite-Sized Task Granularity**: Each step is one action (2-5 minutes).
    -   "Write the failing test" - step
    -   "Run it to make sure it fails" - step
    -   "Implement the minimal code to make the test pass" - step
    -   "Run the tests and make sure they pass" - step
    -   "Commit" - step
-   **Exact file paths**: Always use exact file paths.
-   **Complete code**: Provide complete code in the plan, not just "add validation".
-   **Exact commands**: Provide exact commands with expected output.
-   **Reference relevant skills**: Use @ syntax if needed.
-   **Principles**: DRY, YAGNI, TDD, frequent commits.

## Execution Handoff

After saving the plan, offer execution choices (e.g., subagent-driven or parallel session).
