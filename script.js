let transactions = JSON.parse(localStorage.getItem("monthlyTransactions")) || [];

function addTransaction() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;

    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;
    const amount = parseFloat(document.getElementById("amount").value);

    transactions.push({ date, description, category, type, amount });
    saveTransactions(); // Save to local storage
    updateTable();
    updateSummary();
    document.getElementById("transactionForm").reset();
}

function updateTable() {
    const tableBody = document.getElementById("transactionTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    transactions.forEach((transaction, index) => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = transaction.date;
        row.insertCell().textContent = transaction.description;
        row.insertCell().textContent = transaction.category;
        row.insertCell().textContent = transaction.type;
        row.insertCell().textContent = transaction.amount;
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTransaction(index);
        deleteCell.appendChild(deleteButton);
    });
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    saveTransactions(); // Save to local storage
    updateTable();
    updateSummary();
}

function updateSummary() {
    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {
        if (transaction.type === "Income") {
            income += transaction.amount;
        } else {
            expenses += transaction.amount;
        }
    });

    const netBalance = income - expenses;

    document.getElementById("totalIncome").textContent = income;
    document.getElementById("totalExpenses").textContent = expenses;
    document.getElementById("netBalance").textContent = netBalance;
}

function saveTransactions() {
    localStorage.setItem("monthlyTransactions", JSON.stringify(transactions));
}

function clearLocalStorage() {
  localStorage.removeItem("monthlyTransactions");
  transactions = [];
  updateTable();
  updateSummary();
}

updateTable(); // Load and display transactions on page load
updateSummary();
