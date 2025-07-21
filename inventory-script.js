let newItemName = '';
let newItemManufacturer, newItemPrice, newItemAvailable;
let activeTab = null;
let itemsPerPage = 5;
let currentPage = 1;
let purchases = [];
let sales = [];
let inventory = [];
// Initialize inventory items with soldQuantity and purchasedQuantity properties
inventory.push({
    name: newItemName,
    manufacturer: newItemManufacturer.trim(),
    price: parseFloat(newItemPrice.trim()),
    available: parseInt(newItemAvailable.trim()),
    soldQuantity: 0,
    purchasedQuantity: 0,
    date: null
});

function enterItem() {
    newItemName = document.getElementById("newItemName").value;
    newItemManufacturer = document.getElementById("newItemManufacturer").value;
    newItemPrice = document.getElementById("newItemPrice").value;
    newItemAvailable = document.getElementById("newItemAvailable").value;

    // Checking if newItemName is a non-empty string before using trim
    if (typeof newItemName === 'string' && newItemName.trim) {
        newItemName = newItemName.trim();
    } else {
        // Handling the case where newItemName is not a valid string
        console.error("Invalid item name:", newItemName);
    }

    inventory.push({
        name: newItemName,
        manufacturer: newItemManufacturer.trim(),
        price: parseFloat(newItemPrice.trim()),
        available: parseInt(newItemAvailable.trim())
    });

    displayItem();

    // Closing the tab after the operation
    toggleTab('newItemInputs');
    // Clearing input fields
    clearInputFields('newItemInputs');

    // Adjusting the size of the button
    document.querySelector('#newItemInputs button').classList.remove('large-button');
    document.querySelector('#newItemInputs button').classList.add('small-button');
}

function searchItem() {
    let manufacturer = document.getElementById("searchManufacturer").value;
    let foundItems = inventory.filter(item => item.manufacturer.toLowerCase() === manufacturer.toLowerCase());

    let table = document.getElementById("inventoryTable");
    let tbody = table.querySelector('tbody');

    // Clear existing rows
    tbody.innerHTML = "";

    if (foundItems.length > 0) {
        // Append header row if it doesn't exist
        if (table.tHead.rows.length === 0) {
            let headerRow = table.createTHead().insertRow(0);
            headerRow.innerHTML = "<th>S.No</th><th>Name</th><th>Manufacturer</th><th>Price</th><th>Available</th><th>Action</th>";
        }

        foundItems.forEach((item, index) => {
            let row = tbody.insertRow();
            row.insertCell(0).textContent = index + 1; // Serial number
            row.insertCell(1).textContent = item.name;
            row.insertCell(2).textContent = item.manufacturer;
            row.insertCell(3).textContent = item.price.toFixed(2);
            row.insertCell(4).textContent = item.available;

            // Add an "Edit" button
            let editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('small-button');
            editButton.onclick = function () {
                editItem(item);
            };
            let editActionCell = row.insertCell(5);
            editActionCell.appendChild(editButton);

            // Add a "Delete" button
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('small-button');
            deleteButton.onclick = function () {
                deleteItem(item);
            };
            let deleteActionCell = row.insertCell(6);
            deleteActionCell.appendChild(deleteButton);
        });
    } else {
        alert("No items found with the manufacturer: " + manufacturer);
    }

    // Toggle the visibility of the table
    table.style.display = foundItems.length > 0 ? "table" : "none";

    // Close the tab after the operation
    toggleTab('searchManufacturerInputs');
    // Clear input fields
    clearInputFields('searchManufacturerInputs');
}

function deleteItem(item) {
    // Display a confirmation dialog before deletion
    if (confirm("Are you sure you want to delete this item?")) {
        // Remove the item from the inventory
        inventory = inventory.filter(i => i !== item);

        // Display the updated inventory
        displayItem();
    }
}

function sortItem() {
    inventory.sort((a, b) => a.name.localeCompare(b.name));
    displayItem();

    // Close the tab after the operation
    toggleTab('sortItem');
}

function displayItem() {
    let table = document.getElementById("inventoryTable");
    let tbody = table.querySelector('tbody');

    // Clear existing rows
    tbody.innerHTML = "";

    // Update the flag based on whether the table is currently visible
    let tableVisible = inventory.length > 0;

    // Clear existing rows
    tbody.innerHTML = "";

    // If the table should be visible, populate it with data
    if (tableVisible) {
        // Append header row if it doesn't exist
        if (table.tHead.rows.length === 0) {
            let headerRow = table.createTHead().insertRow(0);
            headerRow.innerHTML = "<th>S.No</th><th>Name</th><th>Manufacturer</th><th>Price</th><th>Available</th><th>Action</th>";
        }

        // Calculate the start and end index based on the current page
        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;

        // Slice the inventory array to get items for the current page
        let itemsForPage = inventory.slice(startIndex, endIndex);

        itemsForPage.forEach((item, index) => {
            let row = tbody.insertRow();
            row.insertCell(0).textContent = startIndex + index + 1; // S.No
            row.insertCell(1).textContent = item.name;
            row.insertCell(2).textContent = item.manufacturer;
            row.insertCell(3).textContent = item.price.toFixed(2);
            row.insertCell(4).textContent = item.available;

            // Add an "Edit" button
            let editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('small-button');
            editButton.onclick = function () {
                editItem(item);
            };
            let editActionCell = row.insertCell(5);
            editActionCell.appendChild(editButton);

            // Add a "Delete" button
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('small-button');
            deleteButton.onclick = function () {
                deleteItem(item);
            };
            let deleteActionCell = row.insertCell(6);
            deleteActionCell.appendChild(deleteButton);
        });
    }

    // Toggle the visibility of the table
    table.style.display = tableVisible ? "table" : "none";

    // Update the current page display
    document.getElementById("currentPage").textContent = "Page " + currentPage;
}


function nextPage() {
    // Calculate the total number of pages
    let totalPages = Math.ceil(inventory.length / itemsPerPage);

    // Increment the current page if it's not the last page
    if (currentPage < totalPages) {
        currentPage++;
        displayItem();
    }
}

function prevPage() {
    // Decrement the current page if it's not the first page
    if (currentPage > 1) {
        currentPage--;
        displayItem();
    }
}

function editItem(item) {
    // Display the edit tab
    toggleTab('editItemInputs');

    // Fill the input fields with the existing item data
    document.getElementById("editItemName").value = item.name;
    document.getElementById("editItemManufacturer").value = item.manufacturer;
    document.getElementById("editItemPrice").value = item.price.toFixed(2);
    document.getElementById("editItemAvailable").value = item.available;

    // Create a function to handle the update when the user clicks the "Update" button
    document.getElementById("updateItemButton").onclick = function () {
        updateItem(item);
    };
}

function updateItem(item) {
    // Update the item with the new values
    item.name = document.getElementById("editItemName").value.trim();
    item.manufacturer = document.getElementById("editItemManufacturer").value.trim();
    item.price = parseFloat(document.getElementById("editItemPrice").value.trim());
    item.available = parseInt(document.getElementById("editItemAvailable").value.trim());

    // Display the updated inventory
    displayItem();

    // Close the tab after the operation
    toggleTab('editItemInputs');
    // Clear input fields
    clearInputFields('editItemInputs');
}

function saveItem() {
    // Convert inventory, purchases, and sales data to Excel format using SheetJS
    var inventorySheet = XLSX.utils.json_to_sheet(inventory);
    var purchasesSheet = XLSX.utils.json_to_sheet(purchases);
    var salesSheet = XLSX.utils.json_to_sheet(sales);

    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, inventorySheet, "Inventory");
    XLSX.utils.book_append_sheet(wb, purchasesSheet, "Purchases");
    XLSX.utils.book_append_sheet(wb, salesSheet, "Sales");

    // Save the Excel file
    XLSX.writeFile(wb, 'inventory.xlsx');
}

function loadItem() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx';
    input.onchange = function (event) {
        let file = event.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                // Read the Excel file and convert it to JSON
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, { type: 'array' });

                // Update the arrays with the loaded data
                inventory = XLSX.utils.sheet_to_json(workbook.Sheets["Inventory"]);
                purchases = XLSX.utils.sheet_to_json(workbook.Sheets["Purchases"]);
                sales = XLSX.utils.sheet_to_json(workbook.Sheets["Sales"]);

                // Display the updated data
                displayItem();
                displayPurchases(); // Display purchases data
                displaySales(); // Display sales data
            };
            reader.readAsArrayBuffer(file);
        }
    };
    input.click();
}


function addSales() {
    let itemName = document.getElementById("salesItemName").value;
    let item = findItemByName(itemName);

    if (item) {
        let salesQuantity = parseInt(document.getElementById("salesQuantity").value);
        let manufacturer = document.getElementById("salesManufacturer").value;

        if (manufacturer.trim() !== '') {
            // Check if the entered manufacturer matches the existing manufacturer in the inventory
            if (item.manufacturer.toLowerCase() === manufacturer.toLowerCase()) {
                // Update the item and add the sales data
                if (salesQuantity <= item.available) {
                    item.available -= salesQuantity;
                    item.soldQuantity += salesQuantity;

                    // Update sales array
                    addSalesData(itemName, salesQuantity, new Date(), manufacturer);

                    alert(`Sale recorded successfully. ${salesQuantity} units of ${item.name} sold.`);
                    displayItem();
                } else {
                    alert("Insufficient quantity available for sale.");
                }
            } else {
                alert("Manufacturer not found in the inventory for the specified item.");
            }
        } else {
            alert("Manufacturer name cannot be empty.");
        }
    } else {
        alert("Item not found in the inventory.");
    }
}

function addPurchase() {
    let itemName = document.getElementById("purchaseItemName").value;
    let item = findItemByName(itemName);

    if (item) {
        let purchaseQuantity = parseInt(document.getElementById("purchaseQuantity").value);
        let manufacturer = document.getElementById("purchaseManufacturer").value;

        if (manufacturer.trim() !== '') {
            // Check if the entered manufacturer matches the existing manufacturer in the inventory
            if (item.manufacturer.toLowerCase() === manufacturer.toLowerCase()) {
                // Update the item and add the purchase data
                item.available += purchaseQuantity;
                item.purchasedQuantity += purchaseQuantity;

                // Update purchases array
                addPurchaseData(itemName, purchaseQuantity, new Date(), manufacturer);

                alert(`Purchase recorded successfully. ${purchaseQuantity} units of ${item.name} purchased.`);
                displayItem();
            } else {
                alert("Manufacturer not found in the inventory for the specified item.");
            }
        } else {
            alert("Manufacturer name cannot be empty.");
        }
    } else {
        alert("Item not found in the inventory.");
    }
}

function addSalesData(itemName, quantity, date) {
    sales.push({
        itemName: itemName,
        quantity: quantity,
        date: date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
    });
}

function addPurchaseData(itemName, quantity, date, manufacturer) {
    purchases.push({
        itemName: itemName,
        quantity: quantity,
        date: date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        manufacturer: manufacturer
    });
}

function displaySales() {
    let salesTable = document.getElementById("salesTable");
    let salesTbody = salesTable.querySelector('tbody');

    // Clear existing rows
    salesTbody.innerHTML = "";

    if (sales.length > 0) {
        // Append header row if it doesn't exist
        if (salesTable.tHead.rows.length === 0) {
            let headerRow = salesTable.createTHead().insertRow(0);
            headerRow.innerHTML = "<th>Sno</th><th>Item Name</th><th>Manufacturer</th><th>Quantity Sold</th><th>Date</th>";
        }

        sales.forEach((sale, index) => {
            let row = salesTbody.insertRow();
            row.insertCell(0).textContent = index + 1; // Serial number
            row.insertCell(1).textContent = sale.itemName;
            row.insertCell(2).textContent = findItemByName(sale.itemName)?.manufacturer || 'N/A';
            row.insertCell(3).textContent = sale.quantity;
            row.insertCell(4).textContent = sale.date;
        });
    } else {
        alert("No sales data available.");
    }

    // Toggle the visibility of the sales table
    salesTable.style.display = sales.length > 0 ? "table" : "none";
}

function displayPurchases() {
    let purchasesTable = document.getElementById("purchasesTable");
    let purchasesTbody = purchasesTable.querySelector('tbody');

    // Clear existing rows
    purchasesTbody.innerHTML = "";

    if (purchases.length > 0) {
        // Append header row if it doesn't exist
        if (purchasesTable.tHead.rows.length === 0) {
            let headerRow = purchasesTable.createTHead().insertRow(0);
            headerRow.innerHTML = "<th>Sno</th><th>Item Name</th><th>Manufacturer</th><th>Quantity Purchased</th><th>Date</th>";
        }

        purchases.forEach((purchase, index) => {
            let row = purchasesTbody.insertRow();
            row.insertCell(0).textContent = index + 1; // Serial number
            row.insertCell(1).textContent = purchase.itemName;
            row.insertCell(2).textContent = findItemByName(purchase.itemName)?.manufacturer || 'N/A';
            row.insertCell(3).textContent = purchase.quantity;
            row.insertCell(4).textContent = purchase.date;
        });
    } else {
        alert("No purchases data available.");
    }

    // Toggle the visibility of the purchases table
    purchasesTable.style.display = purchases.length > 0 ? "table" : "none";
}


function viewSales() {
    // Call the new function to display sales history
    displaySales();
    // Toggle to the viewSales tab
    toggleTab('viewSales');
}

function viewPurchases() {
    // Call the new function to display purchase history
    displayPurchases();
    // Toggle to the viewPurchases tab
    toggleTab('viewPurchases');
}

function sortItemsByLowestAvailability() {
    inventory.sort((a, b) => a.available - b.available);
    displayItem();
}

function sortItemsByHighestAvailability() {
    inventory.sort((a, b) => b.available - a.available);
    displayItem();
}

// Helper function to find an item by name in the inventory
function findItemByName(name) {
    return inventory.find(item => item.name.toLowerCase() === name.toLowerCase());
}



// Toggling the tab
function toggleTab(tabId) {
    // Close the currently active tab, if any
    if (activeTab) {
        let activeTabElement = document.getElementById(activeTab);
        if (activeTabElement) {
            activeTabElement.style.display = "none";
        }
    }

    // Toggle the visibility of the clicked tab
    let tabElement = document.getElementById(tabId);
    if (tabElement) {
        tabElement.style.display = (tabElement.style.display === "none") ? "block" : "none";
        // Update the active tab
        activeTab = (tabElement.style.display === "none") ? null : tabId;
    } else {
        console.error("Tab element not found:", tabId);
    }
}
function toggleDropdown(dropdownId) {
    var dropdownContent = document.getElementById(dropdownId + 'Dropdown');
    dropdownContent.style.display = (dropdownContent.style.display === "none") ? "block" : "none";
}

function clearInputFields(elementId) {
    let inputs = document.getElementById(elementId).querySelectorAll('input');
    inputs.forEach(input => (input.value = ''));
}

function exitProgram() {
    // Confirming if the user wants to save data before logging out
    var confirmSave = confirm("Do you want to save your data before logging out?");
    
    if (confirmSave) {
        // Save the data
        saveItem();
        alert("Data saved successfully.");
    } else {
        alert("Data not saved.");
    }

    // Redirect to the login page
    window.location.href = 'login.html';
}

