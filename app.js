document.addEventListener("DOMContentLoaded", () => {
  fetch('/api/products')
    .then(response => response.json())
    .then(products => {
      const productList = document.getElementById('product-list');
      productList.innerHTML = products.map(product => `
        <div class="product-card">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <strong>Price: $${product.price}</strong>
        </div>
      `).join('');
    })
    .catch(error => console.error('Error fetching products:', error));
});
