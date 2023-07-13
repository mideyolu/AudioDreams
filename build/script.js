//Hamburger Menu
const ham = document.querySelector('.hamburger');
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll('.nav-link');

ham.addEventListener('click', () =>{
    ham.classList.toggle('active');
    navMenu.classList.toggle('active');
    
})
navLinks.forEach(link =>{
    link.addEventListener('click', ()=>{
        ham.classList.remove('active');
        navMenu.classList.remove('active');

    });
    
});
//End of Hamburger Menu

//Scroll Reveal
const revealFunction = () => {
  window.sr = ScrollReveal({ duration: 1350, distance: '250px', delay: 100, easing: 'ease-out' ,scale:'1.1' });
  sr.reveal('.two', { origin: 'bottom', rotate: { x: 900, z: 1000 },  delay: 200 ,reset: true });
  sr.reveal('.one', { origin: 'left', duration: 1000, distance: '200px',delay: 400, reset: true });
  sr.reveal('.four', { origin: 'right', duration: 1000, distance: '200px', reset: false });
  sr.reveal('.three', { duration: 1000, opacity: 0, reset: true });
}
window.addEventListener('load', () => {
  revealFunction();
});
//End of Scroll Reveal

//Owl Carousel

 /*Owl Carousel*/
 $('.owl-carousel').owlCarousel({
  loop:true,
  margin:25,
  nav:false,
  autoplay:true,
  autoplayTimeout:2500,
  dots:false,
  responsive:{
0:{
  items:1
},
600:{
  items:2
},
1000:{
  items:4
}
}
});
//End of Owl Carousel


//Contact Popup
const conatct = document.getElementById('contact');
const secet_7 = document.querySelector('.section-7');
const form_close= document.querySelector('.fa-times');

conatct.addEventListener('click', ()=>{
  secet_7.classList.toggle('active');
  secet_7.style.transition='0.9s ease-in-out';
});

form_close.addEventListener('click', ()=>{
  secet_7.classList.remove('active');
  secet_7.style.transition='1.2s linear';
  secet_7.style.opacity='0.2'
});

//End of Contact Popup



//DOM Ready
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

//DOM Ready Function
function ready() {
  //Remove from cart
  let removeCartButtons = document.getElementsByClassName('cart-remove');

  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  let quantityInputs = document.getElementsByClassName('cart-quantity');

  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  //Add to cart
  let addCart = document.getElementsByClassName('add-cart');

  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener('click', addCartClicked);
  }

  document.getElementsByClassName('btn-buy')[0].addEventListener('click', buybuttonClicked);
  updateCartCount(); // Update the cart count on page load
}


//Cart
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#close-cart');

//Open Cart
cartIcon.addEventListener('click', () => {
  cart.classList.toggle('active');
});

//Close Cart
closeCart.addEventListener('click', () => {
  cart.classList.remove('active');
  cart.style.transition= '0.8s all linear';
});

// Get the close cart icon element
const closeCartIcon = document.getElementById('close-cart');

// Update Cart Count
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  const cartItems = document.getElementsByClassName('cart-box');
  cartCountElement.innerText = cartItems.length.toString();
}

//Buy Button
function buybuttonClicked() {


let cartContent = document.getElementsByClassName('cart-content')[0];
  let cartBoxes = cartContent.getElementsByClassName('cart-box');
  
  if (cartBoxes.length === 0) {
    alert('Your cart is empty. Please add items to the cart.');
    return;
  }

  alert('Your order is placed.');

  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }

  updateTotal();
  updateCartCount();

}

//; // Update the cart count after purchase



//Delete Function
function removeCartItem(e) {
  let buttonClicked = e.target;
  buttonClicked.parentElement.remove();
  updateTotal();
  updateCartCount(); // Update the cart count after removing an item
}


//Quantity Changes
function quantityChanged(e) {
  let input = e.target;

  if (isNaN(parseInt(input.value)) || parseInt(input.value) <= 0) {
    input.value = 1;
  }

  let cartBox = input.closest('.cart-box');
  let cartQuantity = cartBox.getElementsByClassName('cart-quantity');
  let cartCountElement = document.getElementById('cart-count');
  let cartCount = 0;

  for (let i = 0; i < cartQuantity.length; i++) {
    let quantity = parseInt(cartQuantity[i].value);
    cartCount += quantity;
  }

  cartCountElement.innerText = cartCount.toString();
  updateTotal();
}

//Add to Cart
function addCartClicked(e) {
  let button = e.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  let price = shopProducts.getElementsByClassName('price')[0].innerText;
  let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
  updateCartCount(); // Update the cart count after adding an item
}

//Add to Cart Function
function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  let cartItems = document.getElementsByClassName('cart-content')[0];
  let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerHTML == title) {
      alert('Already exist in cart');
      return;
    }
  }

  let cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <div class="quality-controls">
            <input type="number" value="1" class="cart-quantity">
        </div>
    </div>
    <!--Remove Btn-->
    <i class="bx bxs-trash-alt cart-remove"></i>
  `;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
  cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

//Update Total
function updateTotal() {
  let cartContent = document.getElementsByClassName('cart-content')[0];
  let cartBoxes = cartContent.getElementsByClassName('cart-box');
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName('cart-price')[0];
    let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    let price = parseFloat(priceElement.innerText.replace('$', ''));
    let quantity = parseInt(quantityElement.value);
    total = total + quantity * price;
  }
  //Round up the total
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}


  