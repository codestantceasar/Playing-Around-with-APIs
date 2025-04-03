const apiKey = '528ec39b43375a5dc5c69fc7'; // Your API key
const convertBtn = document.getElementById('convertBtn');

convertBtn.addEventListener('click', async function() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (!amount || isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    // Build the API URL
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === "error") {
            alert('Error fetching data');
            return;
        }

        // Calculate conversion
        const rate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        // Display result
        const result = document.getElementById('result');
        result.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        alert('An error occurred. Please try again later.');
    }
});