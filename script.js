     // Menu item click handlers
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Original form functionality
        document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('inventory-form');
            const msg = document.getElementById('form-message');
            const dateInput = document.getElementById('transaction-date');

            // Set default date to today's date
            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                msg.textContent = '';
                msg.className = '';

                const quantity = Number(form.quantity.value);
                if (isNaN(quantity) || quantity < 1) {
                    msg.className = 'error';
                    msg.textContent = 'Quantity must be a positive number.';
                    return;
                }

                const formData = {
                    itemName: form.itemName.value.trim(),
                    quantity: quantity,
                    personName: form.personName.value.trim(),
                    transactionDate: form.transactionDate.value,
                    transactionType: form.transactionType.value
                };

                for (const key in formData) {
                    if (formData[key] === '') {
                        msg.className = 'error';
                        msg.textContent = 'Please fill out all fields.';
                        return;
                    }
                }

                const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzNpZm_Uk8slfyV11JnpTFWM2HrV3i3UBfUMkf_qC01SeVwuLk_kjfCBq4PgHG3PDOY/exec';

                try {
                    const response = await fetch(googleScriptUrl, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    msg.className = 'success';
                    msg.textContent = 'Transaction submitted (check your Google Sheet).';
                    form.reset();
                    dateInput.value = today;
                } catch (error) {
                    msg.className = 'error';
                    msg.textContent = 'Failed to record transaction. Please try again.';
                    console.error('Submission error:', error);
                }
            });
        });
   

