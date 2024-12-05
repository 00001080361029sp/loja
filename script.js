const products = [
    { id: 1, name: "Produto 1", price: 29.99, image: "https://via.placeholder.com/200" },
    { id: 2, name: "Produto 2", price: 49.99, image: "https://via.placeholder.com/200" },
    { id: 3, name: "Produto 3", price: 19.99, image: "https://via.placeholder.com/200" },
    { id: 4, name: "Produto 4", price: 99.99, image: "https://via.placeholder.com/200" },
    { id: 5, name: "Produto 5", price: 39.99, image: "https://via.placeholder.com/200" },
    { id: 6, name: "Produto 6", price: 59.99, image: "https://via.placeholder.com/200" },
    { id: 7, name: "Produto 7", price: 79.99, image: "https://via.placeholder.com/200" },
    { id: 8, name: "Produto 8", price: 89.99, image: "https://via.placeholder.com/200" },
];

// Carrinho (array para armazenar os itens)
let cart = [];

// Renderizar produtos
const productGrid = document.getElementById("products");
products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>R$ ${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
    `;
    productGrid.appendChild(productCard);
});

// Adicionar item ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Atualizar exibição do carrinho
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");

    cartItemsContainer.innerHTML = ""; // Limpa o carrinho
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p>${item.name} (x${item.quantity})</p>
            <p>R$ ${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})">Remover</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);
    checkoutBtn.disabled = cart.length === 0; // Desativa botão se carrinho estiver vazio
}

// Remover item do carrinho
function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex > -1) {
        cart[cartItemIndex].quantity--;

        if (cart[cartItemIndex].quantity === 0) {
            cart.splice(cartItemIndex, 1);
        }
    }

    updateCart();
}
