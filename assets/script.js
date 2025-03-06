document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("expense-form");
    const transactionsList = document.getElementById("transactions");
    const totalIncomeEl = document.getElementById("total-income");
    const totalExpensesEl = document.getElementById("total-expenses");
    const netBalanceEl = document.getElementById("net-balance");

    let transactions = [];

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get input values
        const date = document.getElementById("date").value;
        const description = document.getElementById("description").value;
        const category = document.getElementById("category").value;
        const amount = parseFloat(document.getElementById("amount").value);

        // Validate inputs
        if (!date || !description || !amount || isNaN(amount)) {
            alert("Please fill out all fields correctly.");
            return;
        }

        // Create transaction object
        const transaction = {
            id: Date.now(),
            date,
            description,
            category,
            amount,
        };

        transactions.push(transaction);
        updateUI();
        form.reset();
    });

    function updateUI() {
        transactionsList.innerHTML = "";
        let totalIncome = 0;
        let totalExpenses = 0;

        transactions.forEach((transaction) => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            listItem.innerHTML = `
                <span>${transaction.date} - ${transaction.description} (${transaction.category})</span>
                <span class="${transaction.amount >= 0 ? 'transaction-income' : 'transaction-expense'}">$${transaction.amount.toFixed(2)}</span>
                <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${transaction.id})">Delete</button>
            `;
            transactionsList.appendChild(listItem);

            if (transaction.amount >= 0) {
                totalIncome += transaction.amount;
            } else {
                totalExpenses += Math.abs(transaction.amount);
            }
        });

        totalIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
        totalExpensesEl.textContent = `$${totalExpenses.toFixed(2)}`;
        netBalanceEl.textContent = `$${(totalIncome - totalExpenses).toFixed(2)}`;
    }

    window.deleteTransaction = function (id) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        updateUI();
    };
});
