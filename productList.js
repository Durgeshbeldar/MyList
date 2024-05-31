




function deleteThisProduct(productId) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
    alert("Product delete successfully");
    const selectedField = document.getElementById('field').value;
    loadProductList(selectedField);
}
function loadProductList(field) {
    const productListContainer = document.getElementById('productListContainer');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const filteredProducts = field ? products.filter(product => product.type === field) : [];
    if (filteredProducts.length === 0) {
        productListContainer.innerHTML = '<p class="no-product">No products found.</p>';
        return;
    }

    const productHTML = filteredProducts.map((product, index) => `

    <section class="data-cell">
        <div class="ihd1">
            <p class="ih-title1">${index + 1}</p>
        </div>
        <div class="ihd2">
            <p class="ih-title1">${product.name}</p>
        </div>
        <div class="ihd3">
           <div id="deleteProduct" onclick="deleteThisProduct('${product.id}')"> <i class="fa-solid fa-trash del1"></i></div>
        </div>
    </section>

    `).join('');

    productListContainer.innerHTML = productHTML;
    document.getElementById('productListContainer').style.display = 'flex';



}

document.getElementById('field').addEventListener('change', function () {
    const selectedField = this.value;
    if (selectedField) {
        loadProductList(selectedField);
        console.log(selectedField);
    } else {
        document.getElementById('productListContainer').style.display = 'none';
    }
});
// Main code start here 








document.addEventListener('DOMContentLoaded', () => {
    const selectedField = document.getElementById('field').value;
    if (selectedField) {
        loadProductList(selectedField);
    }
});












