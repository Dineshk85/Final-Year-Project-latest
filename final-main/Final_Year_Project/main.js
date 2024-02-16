const products = [
    {
        id:1,
        title:"Autumn Hoodie",
        price:264.9,
        image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indiamart.com%2Fproddetail%2Fmen-s-autumn-hoodie-jacket-2850904254397.html&psig=AOvVaw3hRN8iXdYPeT-f1mGCKSYB&ust=1708102112394000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDXl8fsrYQDFQAAAAAdAAAAABAD",
    },
    {
        id:2,
        title:"FUSION HOODIE",
        price:295,
        image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FFashion-fusion-Cotton-Travel-Hoodie%2Fdp%2FB0CN62XFY7&psig=AOvVaw31lUyOmx761LadLM-H6Dby&ust=1708102182567000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDPmrnsrYQDFQAAAAAdAAAAABAD",

    },
    {
        id:3,
        title:"Chestnut Brown",
        price:74.9,
        image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Flittleandlively.com%2Fproducts%2Fadult-unisex-bamboo-fleece-lined-zip-up-hoodie-chestnut&psig=AOvVaw2FKLZZ-jrYwCZ8ctR4yte7&ust=1708102491323000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMDysuvnrYQDFQAAAAAdAAAAABAK",
    },
    {
        id:4,
        title:"Nike Sportswear",
        price:80,
        image:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F435230751496198686%2F&psig=AOvVaw1TopkwzT1pUM72ESrs6zzK&ust=1708103040797000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNjJkPTprYQDFQAAAAAdAAAAABAE",
         
    },
    {
        id:5,
        title:"Champion BASIC", 
        price:48.99,
        image:
         "https://www.google.com/url?sa=i&url=https%3A%2F%2Fruncolors.com%2Fproduct-eng-3106-Champion-BASIC-C-LOGO-CREWNECK-T-SHIRT-PASTEL-BLUE.html&psig=AOvVaw1fY7uYE8wx1TfLmr65feeA&ust=1708103901901000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLjh7ovtrYQDFQAAAAAdAAAAABAe",
    },
    {
        id:6,
        title:"Cotton Hoodie",
        price:395,
        image:
           "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FMore-Unisex-Adult-Cotton-Hooded-Hoodie%2Fdp%2FB08HHH3RPT&psig=AOvVaw1aZtC4bKN9EQFrFxZGnQnO&ust=1708103294105000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCMlObqrYQDFQAAAAAdAAAAABAF",
    },
    {
        id:7,
        title:"CLASSIC CREWNECK",
        price:48.99,
        image:
           "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcitizensofhumanity.com%2Fproducts%2Fvintage-crewneck-sweatshirt-khaki-classic&psig=AOvVaw2kVaVuLf9G0J0aB-EqR0HQ&ust=1708103446307000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCICA67brrYQDFQAAAAAdAAAAABAU",
    },
    {
        id:8,
        title:"TAPE HOODED",
        price:79.99,
        image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.zalando.ie%2Fchampion-tape-hooded-half-zip-hoodie-dark-red-c7642g0cw-g11.html&psig=AOvVaw3QwXPUPENtXS1wztpuiCoI&ust=1708103642315000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLDZtJDsrYQDFQAAAAAdAAAAABAE",
    },


];


//get the product list and elements
const productList = document.getElementById('productList')
const cartItemsElement = document.getElementById('cartItems')
const cartTotalElement = document.getElementById('cartTotal')

//store cartitems in local storage
let cart =JSON.parse(localStorage.getItem('cart')) || [];

//Render products on page
function renderProducts(){
    productList.innerHTML = products
    .map(
        (product) => `
        <div class="product">
        <img src="${product.image}" alt="${product.title}" class="product-img">
        <div class="product-info">
         <h2 class="product-title">${product.title}</h2>
         <p class="product-price">${product.price.toFixed(2)}</p>
         <a href="" class="add-to-cart" data-id="${product.id}>Add to cart</a>
        </div>

     </div>
       `
    )
    .join("");
    //Add to cart
    const addToCartButtons = document.getElementsByClassName('add-to-cart');
    for(let i = 0; i < addToCartButtons.length; i++){
        const addToCartButton = addToCartButtons[i];
        addToCartButton.addEventListener("click",addToCart)
    }
}

//add to cart
function addToCart(event){
    const productID = parseInt(event.target.dataset.id);
    const product = products.find((product) =>product.id === productID);

    if (product){
        //if product already in cart
        const exixtingItem = cart.find((item) => item.id === productID);
        if (exixtingItem) {
            exixtingItem.quantity++;
        }else{
            const cartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
            };
            cart.push(cartItem);
        }
        //change add to cat text to added
        event.target.textContent = "Added";
        
        saveToLocalStorage();
        renderCartItems();
        calculateCartTotal();

        }
    }
    //remove from cart
function removeFromCart(event) {
    const productID = parseInt(event.target.dataset.id);
    cart = cart.filter((item) => item.id !== productID);
    saveToLocalStorage();
    renderCartItems();
    calculateCartTotal();
}  
//quantitty change 
function changeQuantity(event){
    const productID = parseInt(event.target.dataset.id);
    const quantity = parseInt(event.target.value);
    if (quantity > 0){
        const cartItem = cart.find((item) => item.id === productID);
        if(cartItem){
          cartItem.quantity = quantity;
        saveToLocalStorage();
        calculateCartTotal();
    }
}

//savetolocalstorage
function saveToLocalStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

//render products on cart page
function renderCartItems(){
    cartItemsElement.innerHtml =cart
    .map(
        (item) =>`
        <div class="cart-item">
              <img src="${item.image}" alt="${item.title}">
              <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input class="cart-item-quantity" type="number"
                name="" 
                min="1" 
                value="${item.quantity}" 
                data-id="${item.id}"
                />
              </div>
              <h2 class="cart-item-price">${item.price}</h2>
              <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>
        `
    )
    .join("");
    //remove from cart
    const removeButtons = document.getElementsByClassName('remove-from-cart');
    for(let i = 0; i < removeButtons.length; i++){
        const removeButton = removeButtons[i];
        removeButton.addEventListener("click",removeFromCart)
    }
    //quantity change
    const quantityInputs = document.querySelectorAll(`.cart-item-quantity`)
    quantityInputs.forEach((input) => {
        input.addEventListener(`change`,changeQuantity)
    })

}

//calculate total
function calculateCartTotal(){
    const total = cart.reduce((sum,item) => sum + item.price * item.quantity, 0);
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}


//check if on cart page
if(window.location.pathname.includes("cart.html")){
    renderCartItems();
    calculateCartTotal();
}else{
    renderProduct();
}
//cart icon quantity
const cartIcon = document.getElementsById(`cart-icon`)
function updateCartIcon(){
    const totalQuantity = cart.reduce((sum,item) => sum + item.quantity,0);
    const cartIcon = document.getElementById(`cart-icon`);
    cartIcon.setAttribute("data-quantity",totalQuantity);

}
update
renderProduct();
renderCartItems();
calculateCartTotal();
