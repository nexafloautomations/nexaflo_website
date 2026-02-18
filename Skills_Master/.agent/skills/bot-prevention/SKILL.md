---
name: bot-prevention
description: Strategies and implementation patterns for preventing automated bot submissions on web forms. Use when the user asks to block bots, prevent spam, or secure forms without using CAPTCHAs.
---

# Bot Prevention

## When to use this skill
- User asks to "block bots" or "prevent spam" on forms.
- User wants to secure a contact form or survey without using CAPTCHAs.
- User requests "honeypot" or "time-based" validation.

## Strategies

### 1. Honeypot Field (Invisible Trap)
**Mechanism**: Add a hidden input field that bots will fill out but humans won't see.
- **Implementation**:
  - Add an input field (e.g., `<input type="text" name="website_url" ...>`)
  - Hide it with CSS (`opacity: 0; position: absolute; z-index: -1; pointer-events: none;`) or keep it visually hidden but technically "visible" to bots.
  - **Server/Client Logic**: If the field has a value, reject the submission.

### 2. Time-Based Analysis
**Mechanism**: Measure the time between page load and form submission.
- **Implementation**:
  - Store a timestamp `loadTime` when the form renders.
  - On submit, calculate `diff = Date.now() - loadTime`.
  - **Logic**: If `diff < 3000ms` (3 seconds), it's likely a bot. Block it.

### 3. Rate Limiting (Client-Side)
**Mechanism**: Prevent rapid-fire submissions from the same browser.
- **Implementation**:
  - Store submission timestamp in `localStorage`.
  - **Logic**: If `Date.now() - lastSubmissionTime < 60000ms` (1 minute), block.

## Instructions
1.  **Analyze the form**: Identify where to inject the honeypot field and where to hook into the submission logic.
2.  **Implement Honeypot**: Add the HTML and the validation logic.
3.  **Implement Time-Check**: Add the load timestamp and the submission check.
4.  **Test**: Verify that normal submissions work and that "bot" submissions (filling the honeypot or submitting too fast) are blocked.

## Example Implementation (JavaScript)

```javascript
/* honeypot-validation.js */

export function isBotSubmission(formElement, honeypotFieldName = 'website_url') {
    // 1. Check Honeypot
    const honeypot = formElement.querySelector(`[name="${honeypotFieldName}"]`);
    if (honeypot && honeypot.value) return true;

    // 2. Check Time (assuming 3s minimum)
    const loadTime = window.formLoadTime || Date.now();
    if (Date.now() - loadTime < 3000) return true;

    return false;
}
```

