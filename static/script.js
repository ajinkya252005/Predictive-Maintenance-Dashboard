document.getElementById('predictionForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const resultBox = document.getElementById('result-display');
    const loading = document.getElementById('loading');
    const btn = document.getElementById('predictBtn');
    
    // UI Loading State
    loading.classList.remove('hidden');
    btn.disabled = true;
    btn.style.opacity = "0.5";

    const formData = {
        type: document.getElementById('type').value,
        air_temp: document.getElementById('air_temp').value,
        process_temp: document.getElementById('process_temp').value,
        rot_speed: document.getElementById('rot_speed').value,
        torque: document.getElementById('torque').value,
        tool_wear: document.getElementById('tool_wear').value
    };

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        // Remove Loading
        loading.classList.add('hidden');
        btn.disabled = false;
        btn.style.opacity = "1";
        resultBox.classList.remove('hidden');

        // Update Elements
        const statusText = document.getElementById('statusText');
        const probText = document.getElementById('probText');
        const recText = document.getElementById('recommendation');

        // Check Error
        if (result.error) {
            alert("Error: " + result.error);
            return;
        }

        // Update Text
        probText.innerText = (result.probability * 100).toFixed(2);
        
        // Dynamic Styling based on result
        resultBox.classList.remove('safe', 'danger'); // Reset classes

        if (result.probability > 0.4) {
            statusText.innerText = "CRITICAL ALERT";
            statusText.style.color = "var(--danger)";
            recText.innerText = "High risk of component failure. Immediate maintenance required.";
            resultBox.classList.add('danger');
        } else {
            statusText.innerText = "SYSTEM OPTIMAL";
            statusText.style.color = "var(--safe)";
            recText.innerText = "No anomalies detected. Continue normal operation.";
            resultBox.classList.add('safe');
        }

    } catch (error) {
        console.error('Error:', error);
        alert("Connection Failed");
        loading.classList.add('hidden');
        btn.disabled = false;
    }
});