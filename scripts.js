let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'SUN SECURE ...',
        tag: 'product1',
        price: 49.740,
        inCart: 0,
    },
    {
        name: 'BARIÉSUN CRÈME',
        tag: 'product2',
        price: 60.210,
        inCart: 0,
    },
    {
        name: 'Sun Crème ...',
        tag: 'product3',
        price: 60.960,
        inCart: 0,
    },
    {
        name: 'URIAGE CREM...',
        tag: 'product4',
        price: 26.770,
        inCart: 0,
    },
    {
        name: 'COFFRET ...',
        tag: 'product5',
        price: 39.950,
        inCart: 0,
    },
    {
        name: 'Ecran Fluid...',
        tag: 'product6',
        price: 60.990,
        inCart: 0,
    }
]


for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }
}
function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers+1);
        document.querySelector('.cart span').textContent=productNumbers+1;
    } else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent=1;
    }
    setItems(product);
    
}
function setItems(product){
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    if (cartItems != null){
        if (cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag] : product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart=1;
        cartItems={
        [product.tag]:product
        }
    }
    
    localStorage.setItem('productsInCart', JSON.stringify (cartItems) )
}
function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    
    if (cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    } 
}
function displayCart (){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML+= `
                <div class ="product">
                    <ion-icon name ="close-circle"></ion-icon>
                    <img src="./images/${item.tag}.jpg" >
                    <span> ${item.name} </span>
                </div>
                <div class ="price">
                    ${item.price}0 DT
                </div>
                <div class ="quantity"> 
                   <ion-icon name="caret-back-circle-outline"></ion-icon>
                   <span> ${item.inCart} </span>
                   <ion-icon name="caret-forward-circle-outline"></ion-icon>
                </div>
                <div class ="total">
                    ${item.inCart * item.price}0 DT
                </div>
            `
        });
        productContainer.innerHTML+=`
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">${cartCost}0 DT</h4>
            </div>
        `
    }
}
onLoadCartNumbers();
displayCart ();
