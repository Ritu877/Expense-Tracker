// document.getElementById("expForm").innerHTML=localStorage.getItem("category");
document.getElementById('expForm').addEventListener('submit', addExpense);
$(document).ready(function () {
    $("form").submit(function () {
        addExpense();
    });
});

$("#updatebutton").hide();
// initial array of expenses, reading from localStorage
var expenses = JSON.parse(localStorage.getItem('expenses')) || [];


$('#updatebutton').click(function () {
    // debugger;
    var expensesData = JSON.parse(localStorage.expenses);
    var Editid = localStorage.getItem("Editid");
    for (let i = 0; i < expensesData.length; i++) {

        if (expensesData[i].id == parseInt(Editid)) {
            expensesData[i].type = document.getElementById('type').value;
            expensesData[i].name = document.getElementById('name').value;
            expensesData[i].date = document.getElementById('date').value;
            expensesData[i].amount = document.getElementById('amount').value;
            localStorage.removeItem("Editid");
            localStorage.setItem("expenses", JSON.stringify(expensesData));  //put the object back


        }
    }
    expenses = expensesData;
    showExpenses();
});

function addExpense(e) {

    e.preventDefault();

    // get type, name, date, and amount
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;
    let date = document.getElementById('date').value;
    let amount = document.getElementById('amount').value;

    if (type != 'chooseOne'
        && name.length > 0
        && date != 0
        && amount > 0) {
        const expense = {
            type,
            name,
            date,
            amount,
            id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
        }

        expenses.push(expense);
        // localStorage 
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    document.getElementById('expForm').reset();
    showExpenses();
}

const showExpenses = () => {

    const expenseTable = document.getElementById('expenseTable');

    expenseTable.innerHTML = '';
    //var expenses = localStorage.getItem('expenses');
    for (let i = 0; i < expenses.length; i++) {
        expenseTable.innerHTML += `
            <tr>
                <td>${expenses[i].type}</td>
                <td>${expenses[i].name}</td>
                <td>${expenses[i].date}</td>
                <td>$${expenses[i].amount}</td>
                <td><a class="editbutton" onclick="editbutton(${expenses[i].id})">
                    edit</td>
                <td><a class="deleteButton" onclick="deleteExpense(${expenses[i].id})">
                    Delete</td>
            </tr>
        `;
    }
}
const deleteExpense = (id) => {
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].id == id) {
            expenses.splice(i, 1);
        }
    }
    // localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    showExpenses();
}
const editbutton = (id) => {
    //debugger;
    $("#updatebutton").show();
    $("#addbutton").hide();
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].id == id) {
            document.getElementById('type').value = expenses[i].type;
            document.getElementById('name').value = expenses[i].name;
            document.getElementById('date').value = expenses[i].date;
            document.getElementById('amount').value = expenses[i].amount;
            localStorage.setItem("Editid", id);
        }
    } tItem('expenses', JSON.stringify(expenses));
    showExpenses();
}
showExpenses();
// category.html
$(document).ready(function () {


    const categoryToLocal = JSON.parse(localStorage.getItem("category"))
    for (let i = 0; i <= categoryToLocal.length; i++) {

        console.log(categoryToLocal[i].cat, 'data12')
        $('#type').append(`<option>${categoryToLocal[i].cat}</option>`)
    }
})

