const API = "http://localhost:5000/api/products";

// GET products
async function getProducts() {
  const res = await fetch(API);
  const data = await res.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  data.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <h4>${p.name}</h4>
        <p>₹${p.price}/month</p>
        <button onclick="deleteProduct(${p.id})">Delete</button>
      </div>
    `;
  });
}

// ADD product
async function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, price })
  });

  getProducts();
}

// DELETE product
async function deleteProduct(id) {
  await fetch(`http://localhost:5000/api/products/${id}`, {
    method: "DELETE"
  });

  getProducts();
}

// page load
getProducts();