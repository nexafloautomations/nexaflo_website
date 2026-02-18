/**
 * BotGuard - Silent Bot Prevention Logic
 * 
 * Strategies:
 * 1. Honeypot: Checks a hidden field. If filled, it's a bot.
 * 2. Time-Based: Checks if submission is too fast (< 3s).
 * 3. Rate-Limit: Checks if user submitted recently (< 1 min).
 */

export class BotGuard {
    constructor(honeypotFieldName = 'business_email_2') {
        this.honeypotFieldName = honeypotFieldName;
        this.loadTime = Date.now();
        this.minTime = 3000; // 3 seconds
        this.rateLimitTime = 60000; // 1 minute
        this.storageKey = 'nexaflo_last_submission';
    }

    /**
     * Checks if the submission is likely a bot.
     * @param {HTMLFormElement} formElement - The form element being submitted
     * @returns {Object} result - { isBot: boolean, reason: string }
     */
    check(formElement) {
        // 1. Honeypot Check
        const honeypot = formElement.querySelector(`[name="${this.honeypotFieldName}"]`);
        if (honeypot && honeypot.value) {
            return { isBot: true, reason: 'honeypot' };
        }

        // 2. Time-Based Check
        const timeDiff = Date.now() - this.loadTime;
        if (timeDiff < this.minTime) {
            return { isBot: true, reason: 'too_fast' };
        }

        // 3. Rate Limit Check
        const lastSubmission = localStorage.getItem(this.storageKey);
        if (lastSubmission && (Date.now() - parseInt(lastSubmission)) < this.rateLimitTime) {
            return { isBot: true, reason: 'rate_limit' };
        }

        return { isBot: false };
    }

    /**
     * Records a successful submission to enforce rate limiting.
     */
    recordSubmission() {
        localStorage.setItem(this.storageKey, Date.now().toString());
    }
}
