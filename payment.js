cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
cartNum = localStorage.getItem("cartNo");
let cartContainer = document.getElementById("cartContainer");
let total = document.getElementById("total");
let subtotal = document.getElementById("subtotal");
let thetotal = document.getElementById("thetotal");

let totalPrice = localStorage.getItem("totalPrice") || 0;

function sortCart() {
  cartArray.sort((a, b) => {
    if (a.itemTitle > b.itemTitle) {
      return 1;
    }
    if (a.itemTitle < b.itemTitle) {
      return -1;
    }
    return 0;
  });
}

sortCart();

function displayCart() {
  if (cartArray == null || cartArray.length == 0) {
    cartContainer.innerHTML = `


        <div class="empty">
            <div class="content">
                <iconify-icon icon="bi:cart-x-fill" style="color: rgb(237,1,127);" width="60"></iconify-icon>
            <h4>Your cart is empty.</h4>
            <p>You have not added any item to your cart.</p>
            </div>
        </div>
       
    
    
    `;
    let totalDiv = document.getElementsByClassName("sub-total");
    for (div of totalDiv) {
      div.style.visibility = "hidden";
    }
  } else if (cartArray.length > 0) {
    cartArray.forEach(
      (
        {
          itemImage,
          itemQuantity,
          itemTitle,
          itemPrice,
          itemAmount,
          itemBrand,
        },
        index
      ) => {
        tbody.innerHTML += `<tr style="background-color: white; color: black; margin:10px;" >
          <td  style="display: flex;">
              <img width="50px" height="50px" src="${itemImage}" alt="">
              
              <div class="proo">
                  <b>${itemTitle}</b>
              <p>Sold by ${itemBrand} </p>
              </div>
          
          
          </td>
          <td  >
              
              <div style="display: flex; margin-left: 10px;" class="inc">
              <button class="shadow  border d-flex align-items-center justify-content-center bg-light " id="${itemImage}" value="${itemQuantity}" name="${itemAmount}"  title="${itemTitle}" aria-brand="${itemBrand}"
              onclick="increaseQuantity(event , -1 , ${index} )"  style="width: 25px; height: 25px;">-</button>
              <button class="shadow border d-flex align-items-center justify-content-center  bg-light"  style="width: 25px; height: 25px;">${itemQuantity}</button> 
              <button class="shadow  border d-flex align-items-center justify-content-center bg-light" id="${itemImage}" value="${itemQuantity}" name="${itemAmount}" title="${itemTitle}" aria-brand="${itemBrand}"
              onclick="increaseQuantity(event ,+1 , ${index} )"   style="width: 25px; height: 25px;">+</button>
              </div>
              
          </td>
          
          <td class="ps-2">
             <b>N${itemPrice} </b>
              <p class="itempieces"> N${itemAmount} <small> x  ${itemQuantity} pcs  </small </p>
          </td>
          <td class="ps-2" style=" text-align: end; ">
              
              <div class="r">
              <button class="shadow border-0 d-flex  bg-light align-items-center justify-content-center"  onclick="deleteItem(event)" id="${index}" value="${itemQuantity}" name="${itemPrice}" > Delete </button>
              <br>
              <p id="timer" class="shadow itemtime  border-0 d-flex  bg-light align-items-center justify-content-center" > 
              Just now  </p>
              </div>
          
          
          </td>
          </tr>`;
      }
    );

    sortCart();
  }
}

displayCart();

function displayPrice() {
  totalPrice = cartArray.reduce((a, { itemPrice }) => {
    return a + itemPrice;
  }, 0);
  localStorage.setItem("totalPrice", totalPrice);

  subtotal.innerHTML = `Subtotal: N${totalPrice}`;
  total.innerHTML = `Total: N${totalPrice}`;
  thetotal.innerHTML = `Subtotal:  N${totalPrice}`;
}

displayPrice();

currentUser = localStorage.getItem("currentUser");
console.log(currentUser);

const paymentForm = document.querySelectorAll(".paymentForm");
paymentForm.forEach((p)=> {
  p.addEventListener("submit", payWithPaystack, false);
})



function payWithPaystack(e) {
  e.preventDefault();
  paymentForm.innerHTML = `<div class="text-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  </div>`;
  let handler = PaystackPop.setup({
    key: "pk_test_9a558288d1670a641dafa6f4e899ddb24f2fe749", // Replace with your public key
    email: currentUser,
    amount: totalPrice * 100,
    ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function () {
      alert("Window closed.");
    },
    callback: function (response) {
      let message = "Payment complete! Reference: " + response.reference;
      alert(message);
      paymentForm.innerHTML = `Payment Confirmed`;
      cartArray.splice(0, cartArray.length);
      localStorage.setItem("cartArray", JSON.stringify(cartArray));
      tbody.innerHTML = "";
      displayCart();
      cartNum = 0;
      localStorage.setItem("cartNo", cartNum);
      displayCartNumber();
    },
  });

  handler.openIframe();
}

function increaseQuantity(event, params, i, thebrand) {
  let el = event.target;

  let quantity = Number(el.value);
  let image = el.id;
  let title = el.title;
  let price = Number(el.name);
  let brand = String(el.getAttribute("aria-brand"));

  let item = {
    itemImage: image,
    itemTitle: title,
    itemQuantity: quantity + Number(params),
    get itemPrice() {
      return price * this.itemQuantity;
    },
    itemAmount: price,
    itemBrand: brand,
  };

  if (item.itemQuantity == 0) {
    return;
  } else {
    cartNum = Number(cartNum) + Number(params);
    localStorage.setItem("cartNo", cartNum);
    let index = Number(i);
    cartArray.splice(index, 1, item);
    localStorage.setItem("cartArray", JSON.stringify(cartArray));
    console.log(cartArray);
    tbody.innerHTML = "";
    sortCart();
    displayCart();
    displayCartNumber();
    displayPrice();
  }
}

function deleteItem(event) {
  el = event.target;
  cartNum = Number(cartNum) - Number(el.value);
  localStorage.setItem("cartNo", cartNum);
  let index = el.id;
  cartArray.splice(index, 1);
  localStorage.setItem("cartArray", JSON.stringify(cartArray));
  tbody.innerHTML = "";
  totalPrice = Number(totalPrice) - Number(el.name);
  localStorage.setItem("totalPrice", totalPrice);
  sortCart();
  displayCart();

  displayCartNumber();

  displayPrice();
}