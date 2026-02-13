/**
 * Contact Form Logic
 * Handles validation, phone number formatting, and submission to n8n webhook.
 */

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('booking-form');
    const phoneInput = document.querySelector("#phone");
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');

    // Initialize intl-tel-input
    let iti;
    if (phoneInput) {
        iti = window.intlTelInput(phoneInput, {
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
            preferredCountries: ['in', 'us', 'gb'],
            initialCountry: 'in',
            separateDialCode: true,
        });
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Clear previous errors
            clearErrors();
            formMessage.classList.add('hidden');

            // Validate fields
            let isValid = true;
            const formData = {};

            // First Name
            const firstName = document.getElementById('first-name');
            if (!firstName.value.trim()) {
                showError(firstName, 'First Name is required');
                isValid = false;
            } else {
                formData.firstName = firstName.value.trim();
            }

            // Last Name
            const lastName = document.getElementById('last-name');
            if (!lastName.value.trim()) {
                showError(lastName, 'Last Name is required');
                isValid = false;
            } else {
                formData.lastName = lastName.value.trim();
            }

            // Combine for webhook if needed, or send separately. Sending both for flexibility.
            if (formData.firstName && formData.lastName) {
                formData.fullName = `${formData.firstName} ${formData.lastName}`;
            }

            // Phone
            if (!phoneInput.value.trim()) {
                showError(phoneInput, 'Phone number is required');
                isValid = false;
            } else if (iti && !iti.isValidNumber()) {
                showError(phoneInput, 'Invalid phone number');
                isValid = false;
            } else {
                formData.phone = iti.getNumber();
            }

            // Email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                showError(email, 'Invalid email format');
                isValid = false;
            } else {
                formData.email = email.value.trim();
            }

            // Company Name (Optional)
            const companyName = document.getElementById('company-name');
            if (companyName && companyName.value.trim()) {
                formData.companyName = companyName.value.trim();
            }

            // Message
            const message = document.getElementById('message');
            if (!message.value.trim()) {
                showError(message, 'Please explain your problem');
                isValid = false;
            } else {
                formData.message = message.value.trim();
            }

            // Legal Consent
            const legalConsent = document.getElementById('legal-consent');
            if (!legalConsent.checked) {
                showError(legalConsent, 'You must agree to the Privacy Policy and Terms of Service');
                isValid = false;
            } else {
                formData.legalConsent = true;
            }

            if (!isValid) {
                return;
            }

            // Show loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;

            // Prepare template parameters
            const templateParams = {
                first_name: document.getElementById('first-name').value.trim(),
                last_name: document.getElementById('last-name').value.trim(),
                phone: iti ? iti.getNumber() : document.getElementById('phone').value,
                email: document.getElementById('email').value.trim(),
                company_name: document.getElementById('company-name').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Send email using EmailJS
            emailjs.send('service_ti2aum9', 'template_1ihzoqq', templateParams)
                .then(function (response) {
                    form.reset();
                    // Show success message
                    if (formMessage) {
                        formMessage.innerText = 'Thank you! We will be in touch shortly.';
                        formMessage.classList.remove('hidden', 'text-red-600');
                        formMessage.classList.add('text-green-600');
                    }
                })
                .catch(function (error) {
                    console.error('FAILED...', error);
                    if (formMessage) {
                        formMessage.innerText = 'Something went wrong. Please try again.';
                        formMessage.classList.remove('hidden', 'text-green-600');
                        formMessage.classList.add('text-red-600');
                    }
                })
                .finally(function () {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    function showError(input, message) {
        const parent = input.closest('div'); // Assuming input is wrapped in a div
        let error = parent.querySelector('.error-message');
        if (!error) {
            error = document.createElement('p');
            error.className = 'error-message text-red-500 text-sm mt-1';
            parent.appendChild(error);
        }
        error.innerText = message;
        input.classList.add('border-red-500');
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.border-red-500').forEach(el => el.classList.remove('border-red-500'));
    }
});
