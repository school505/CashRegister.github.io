let total = 0;
const orderList = [];

// Function to update the order list and total
function updateOrder() {
    const orderListElement = document.getElementById('order-list');
    orderListElement.innerHTML = ''; // Clear the current list

    orderList.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeItem(${index})">X</button>
        `;
        orderListElement.appendChild(li);
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

// Add item to the order list
document.querySelectorAll('.item').forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-name');
        const itemPrice = parseFloat(button.getAttribute('data-price'));

        console.log(`Item clicked: ${itemName} - $${itemPrice}`);

        // Check if the item is already in the order list
        const existingItem = orderList.find(item => item.name === itemName);

        if (existingItem) {
            existingItem.quantity += 1; // Increase quantity if already in list
            total += itemPrice; // Update total
            console.log(`Increased quantity of ${itemName} to ${existingItem.quantity}`);
        } else {
            orderList.push({ name: itemName, price: itemPrice, quantity: 1 }); // Add new item
            total += itemPrice; // Update total
            console.log(`Added new item: ${itemName}`);
        }

        updateOrder(); // Refresh order display
    });
});

// Function to remove a specific item from the order
function removeItem(index) {
    const item = orderList[index];
    if (item) {
        total -= item.price * item.quantity; // Deduct the item's total price
        console.log(`Removing item: ${item.name} - $${item.price * item.quantity}`);
        orderList.splice(index, 1); // Remove the item from the list
        updateOrder(); // Refresh the order display
    } else {
        console.error(`No item found at index ${index}`);
    }
}

// Delete all items from the order list
document.getElementById('delete-all').addEventListener('click', () => {
    console.log('Deleting all items');
    total = 0;
    orderList.length = 0; // Clear the order list
    updateOrder(); // Refresh the display
});

// Calculate change when money is entered
document.getElementById('calculate-change').addEventListener('click', () => {
    const payment = parseFloat(document.getElementById('payment').value);
    if (isNaN(payment)) {
        alert('Please enter a valid amount received.');
        return;
    }
    const change = payment - total;
    document.getElementById('change').textContent = change.toFixed(2);
    console.log(`Payment: $${payment}, Change: $${change.toFixed(2)}`);
});

// Refresh the page when the refresh button is clicked
document.getElementById('refresh-page').addEventListener('click', () => {
    console.log('Refreshing page');
    location.reload(); // This reloads the page
});
