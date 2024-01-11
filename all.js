let cart = document.querySelectorAll(".theCart");

let cartNum = localStorage.getItem("cartNo") || 0;

let cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];

let cartDiv = document.getElementById('cartDiv')
let categoryText = document.getElementById('cartegoryText')
let cartAddText = document.getElementById('cartAddText')

function addToCart(event) {
 
    ++cartNum;
    localStorage.setItem("cartNo", cartNum);
    displayCartNumber() 
    el = event.target;
    console.log(el.id);

    let foundObj = fetchedData.find((obj) => {
      return el.id == obj.id;
    });

    let item = {
      itemImage: foundObj.images[0],
      itemTitle: foundObj.title,
      itemQuantity: 1,
      get itemPrice() {
        return foundObj.price * this.itemQuantity;
      },
      itemAmount: foundObj.price,
      itemBrand: foundObj.brand , 
    };

    cartAddText.innerHTML = `You've added ${foundObj.title} to Cart 
    <div class="d-flex">           <button onclick="carT()" style="background: none; border: 2px solid white; padding: 2px, 4px; color:white"> View cart </button> 
    <button style="background: none; margin-left: 5px; border: 2px solid white; padding: 2px, 4px; color:white"> View cart </button> </div>`
    categoryText.innerHTML = `${foundObj.category.toUpperCase()}`
 
 cartDiv.style.left = '20px'
 cartDiv.style.transition = '0.5s'
 
 setTimeout(()=> {
   cartDiv.style.left = '-250px'
   cartDiv.style.transition = '0.5s'
 }, 3000)

    cartArray.push(item);
    localStorage.setItem("cartArray", JSON.stringify(cartArray));
    console.log(cartArray);

}

function displayCartNumber() {
  cart.forEach((c) => {
    c.innerHTML = cartNum;
  });
}

displayCartNumber() 

function goHome() {
  window.location.href = "dashboard.html";
}

function carT() {
  window.location.href = "cart.html"
}

function seeAllItems() {
  window.location.href = "seemore.html";
}

fetchedData = JSON.parse(localStorage.getItem("products"));
console.log(fetchedData);

function showProduct(event) {
  el = event.target;
  
  console.log(el.id);
  let foundObj = fetchedData.find((obj) => {
    return el.id == obj.id;
  });

  localStorage.setItem("foundObj", JSON.stringify(foundObj));

  window.location.href = "item.html";
}

let tbody = document.getElementById("tBody");

function goToCart() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      console.log(user);
      currentUser = user;

      window.location.href = "cart.html";

      // ...
    } else {
      // User is signed out
      // ...
      alert("no user is logged in");
      window.location.href = "login.html";
    }
  });
}

let search = document.querySelectorAll(".searcher");
console.log(search);

let dropdownSearch = document.getElementById("drop");
dropdownSearch.style.display = "none";

search.forEach((s) => {
  s.addEventListener("input", (event) => {
    let sValue = event.target.value.toLowerCase();
    let searched = fetchedData.filter(({ title, category, brand }) => {
      return (
        title.toLowerCase().includes(sValue) ||
        category.toLowerCase().includes(sValue) ||
        brand.toLowerCase().includes(sValue)
      );
    });

    if (searched.length == 0) {
      dropdownSearch.innerHTML = `this product does not exist`;
    } else if (s.value.length > 0) {
      dropdownSearch.innerHTML = "";
      dropdownSearch.style.display = "flex";
      searched.forEach((data) => {
        dropdownSearch.innerHTML += `<button id="${data.id}"  onclick="showProduct(event)" class="border border-success m-1 bg-light d-flex text-dark align-items-center justify-content-between  ;" style="height:40px; width:98%;" value='${data.price}'>
       
        <p style="text-align:left;" id="${data.id}" value='${data.price}'  class="h-100 d-flex align-items-center mt-3"> ${data.title} </p>
        <p style="text-align:left; font-size:8px; width:120px;" id="${data.id}" value='${data.price}'  class="h-100 d-flex align-items-center mt-3"> ${data.category} </p>
        <p style="text-align:left; font-size:5px; width:120px;" id="${data.id}" value='${data.price}'  class="h-100 d-flex align-items-center mt-3"> ${data.brand} </p>
        <img style="width:20px; text-align:left; height;90%; " id="${data.id}" value='${data.price}'  src="${data.images[0]}"> </img>
        
        </button>`;
      });
    } else {
      dropdownSearch.style.display = "none";
    }
  });
});

function goToLogin() {
  window.location.href = "login.html";
}