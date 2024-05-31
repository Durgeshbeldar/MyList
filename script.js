document.addEventListener("DOMContentLoaded", function() {
    const addProductTab = document.getElementById('addProductTab');
    const createListTab = document.getElementById('createListTab');
    const addProductSection = document.getElementById('addProductSection');
    const createListSection = document.getElementById('createListSection');

    addProductTab.addEventListener('click', function() {
        addProductSection.style.display = 'flex';
        createListSection.style.display = 'none';
    });

    createListTab.addEventListener('click', function() {
        addProductSection.style.display = 'none';
        createListSection.style.display = 'flex';
    });
});

// Global variables
let userName = '';
let mobileNo = '';
function loadDetails() {
    userName = localStorage.getItem('userName') || '';
    mobileNo = localStorage.getItem('mobileNo') || '';
    console.log(userName);
}


function updateDetails() {
    const nameInput = document.getElementById('electricianName').value;
    const mobileInput = document.getElementById('mobileNo').value;

    if (!nameInput || !mobileInput) {
        alert('Please fill in all fields.');
        return;
    }

    // Update global variables
    userName = nameInput;
    mobileNo = mobileInput;

    // Store in local storage
    localStorage.setItem('userName', userName);
    localStorage.setItem('mobileNo', mobileNo);

    alert('Your details have been updated successfully.');
}

function productListOnNewPage(){
    window.location.href = 'productList.html';

}

function toggleMyList() {
    const myListSection = document.getElementById('myList');
    const toggleButton = document.getElementById('toggleButton').querySelector('p');

    if (myListSection.style.display === 'none') {
        myListSection.style.display = 'flex';
        toggleButton.textContent = 'Close My Customer List';
    } else {
        myListSection.style.display = 'none';
        toggleButton.textContent = 'Show My Customer List';
    }
}

function toggleUpdate() {
    const myListSection = document.getElementById('update');
    const toggleButton = document.getElementById('toggleUpdateBtn').querySelector('p');

    if (myListSection.style.display === 'none') {
        myListSection.style.display = 'flex';
        toggleButton.textContent = 'Close';
    } else {
        myListSection.style.display = 'none';
        toggleButton.textContent = 'Click Here to Update Details';
    }
}
function addProduct() {
    const workField = document.getElementById('Work-field').value;
    const productName = document.getElementById('productName').value;

    // Validate input
    if (!workField || !productName) {
        alert('Please fill in all fields.');
      
        return;
    }

    // Create unique ID
    const timestamp = Date.now();
    const uniqueId = productName.substring(0, 3).toUpperCase() + timestamp.toString().slice(-7);

    // Create product object
    const product = {
        id: uniqueId,
        type: workField,
        name: productName
    };

    // Retrieve existing products from localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Add new product to the array
    products.push(product);

    // Save updated products array to localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Alert success message
    alert('Your product has been added successfully.');

    // Optionally, clear input fields after adding the product
    document.getElementById('Work-field').value = '';
    document.getElementById('productName').value = '';
}


let field, electrician, customerName;
let productList = JSON.parse(localStorage.getItem('products')) || [];
let list = [];

function showNextSection(event) {
    event.preventDefault();
    field = document.getElementById('field').value;
    customerName = document.getElementById('CustomerName').value;
    Place = document.getElementById('Place').value;
    

    if (!field || !Place || !customerName) {
        alert('Please fill in all fields.');
        return;
    }

    document.querySelector('.createList-section').style.display = 'none';
    document.querySelector('.addProductSection').style.display = 'flex';

    populateProductDropdown();
}

function populateProductDropdown() {
    const productDropdown = document.getElementById('product-list');
    productDropdown.innerHTML = '<option value="">Select Product</option>';

    productList.forEach(product => {
        if (product.type === field) {
            let option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.name;
            productDropdown.appendChild(option);
        }
    });
}

// add product to list 

function addProductToList() {
    const productId = document.getElementById('product-list').value;
    const productQuantity = document.getElementById('ProductQuantity').value;

    if (!productId || !productQuantity) {
        alert('Please select a product and enter quantity.');
        return;
    }

    // Check for duplicate product
    if (list.some(item => item.id === productId)) {
        alert('This product is already added.');
        document.getElementById('product-list').value = '';
        document.getElementById('ProductQuantity').value = '';
        return;
    }

    const product = productList.find(item => item.id === productId);
    const productName = product ? product.name : '';

    list.push({
        id: productId,
        name: productName,
        quantity: productQuantity
    });

    displayProductList();

    alert('Product added successfully.');

    document.getElementById('product-list').value = '';
    document.getElementById('ProductQuantity').value = '';
}


// Display Product List 

function displayProductList() {
    const listContainer = document.getElementById('listContainer');
    listContainer.innerHTML = '';

    if (list.length === 0) {
        document.getElementById('myListSection').style.display = 'none';
        return;
    }

    document.getElementById('myListSection').style.display = 'flex';
    list.forEach((item,index)=> {
        let i = 1;
        const listItem = document.createElement('div');
        listItem.className = 'list-item';  // Optional: Add a class for styling
        
        // Custom HTML structure
        listItem.innerHTML = `
            <div class="list-item-list">
                
            <div class="td-div1" ><p class="td-text">${index +1}</p></div>
            <div class="td-div2" ><p class="td-text">${item.name}</p></div>
            <div class="td-div3" onclick="editQuantity(${index}, '${item.quantity}')" ><p class="td-text">${item.quantity}</p></div>
            <div class="td-div4" onclick="deleteProduct(${index})"><p class="td-text">Del</p></div>
            </div>
        `;
        listContainer.appendChild(listItem);
    });
    
   
}
function editQuantity(index, currentQuantity) {
    const newQuantity = prompt('Enter new quantity:', currentQuantity); // Show a prompt with current quantity
    if (newQuantity !== null) {
        // If user entered a new quantity and didn't cancel
        list[index].quantity = newQuantity; // Update the quantity in the list array
        displayProductList(); // Redisplay the updated list
    }
}
function deleteProduct(index) {
    // Remove the product at the specified index from the list array
    list.splice(index, 1);
    
    // Update the displayed product list
    displayProductList();

    // Optionally, update localStorage if needed
}

function completeList() {
    const timestamp = new Date().toISOString();

    var now = new Date();

// समय को HH:MM प्रारूप में प्राप्त करें
var hours = String(now.getHours()).padStart(2, '0');
var minutes = String(now.getMinutes()).padStart(2, '0');
var time = hours + ":" + minutes;

// तारीख को DD-MM-YYYY प्रारूप में प्राप्त करें
var day = String(now.getDate()).padStart(2, '0');
var month = String(now.getMonth() + 1).padStart(2, '0'); // महीना 0 से शुरू होता है, इसलिए +1 करें
var year = now.getFullYear();
var date = day + "-" + month + "-" + year;
    const dateandtime = time + " & " + date;
    const customerList = JSON.parse(localStorage.getItem('customerList')) || [];

    customerList.push({
        field,
        customerName,
        Place,
        id: Date.now(),
        timestamp,
        dateandtime,
        products: list
    });

    localStorage.setItem('customerList', JSON.stringify(customerList));
    
    alert('List completed successfully.');
    displayCustomerList();
    // Reset variables
    console.log(customerList);
    field = '';
    customerName = '';
    Place = '';
    document.getElementById('field').value = '';
    document.getElementById('CustomerName').value = '';
    document.getElementById('Place').value = '';

    // Optionally, clear all data and reset form
    list = [];
    document.querySelector('.createList-section').style.display = 'flex';
    document.querySelector('.addProductSection').style.display = 'none';
   
    displayProductList();
}


function displayCustomerList() {
    const customerList = JSON.parse(localStorage.getItem('customerList')) || [];
    const customerDetailsContainer = document.getElementById('customerDetails');
    customerList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    // Clear existing content
    customerDetailsContainer.innerHTML = '';

    customerList.forEach((customer,index) => {
        // Create a div for each customer entry
        const customerEntry = document.createElement('div');
        customerEntry.classList.add('customer-entry');

        // Create HTML content for customer details
        customerEntry.innerHTML = `
            
            <div class="td-1" id="Clist1"><p class="entry-title">${index+1}</p></div>
                    <div class="td-2" id="Clist2"><p class="entry-title">${customer.customerName}</p></div>
                    <div class="td-3" id="Clist3" onclick="viewList(${customer.id})"><div class="icons"><i class="fa-solid fa-print view"></i></div></div>
                    <div class="td-4" id="Clist4" onclick="deleteCustomer(${customer.id})"><div class="icons"><i class="fa-solid fa-trash del"></i></div></div>
        `;
        
        // Append the entry to the container
        customerDetailsContainer.appendChild(customerEntry);
    });
}

function viewList(customerId) {
    window.open(`view.html?id=${customerId}`, '_blank');
}

function deleteCustomer(customerId) {
    // Retrieve customer list from localStorage
    let customerList = JSON.parse(localStorage.getItem('customerList')) || [];

    // Filter out the customer with the given ID
    customerList = customerList.filter(customer => customer.id !== customerId);

    // Update the customer list in localStorage
    localStorage.setItem('customerList', JSON.stringify(customerList));

    // Re-display the updated customer list
    displayCustomerList();

    // Alert the user that the customer has been deleted
    alert('Customer deleted successfully.');
}

displayCustomerList();





// =========== Just for testing purpose 
function getProducts() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    console.log(products);
}

// Call getProducts to print products array to console
document.addEventListener('DOMContentLoaded', () => {
    getProducts();
});

document.addEventListener('DOMContentLoaded', loadDetails);
