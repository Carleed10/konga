let fetcher = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    const products = data.products;
    localStorage.setItem("products", JSON.stringify(products));
  };
  fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(console.log);
            

  fetcher();
  
  let fetchedData = JSON.parse(localStorage.getItem("products"));
  console.log(fetchedData);
  
  let numbs = [4, 7, 9];
  let nums = [23, 24, 25, 26, 27, 28, 29];
  let wholeNum = [10, 12];
  
  function randomCreator(num) {
    let random = Math.floor(Math.random() * (num.length - 1));
    return random;
  }
  
  let randomNum = Math.floor(Math.random() * (nums.length - 1));
  
  let todaysDeals = fetchedData.slice(
    Math.floor(Math.random() * numbs[randomCreator(numbs)]),
    wholeNum[randomCreator(wholeNum)]
  );
  console.log(todaysDeals);
  
  let dealsContent = document.getElementById("deals-content");
  
  function displaySlide(name, arr, flex, num, type) {
    arr.forEach(({id,price,title,discountPercentage , images}, i) => {
      name.innerHTML += `<button id="${
       id
      }" onclick="showProduct(event)" value='${
       price
      }'  class="border-0 ${flex} rounded deal${num} d-flex  justify-content-around">
           
      <img width="100px" id="${id}" value='${
       price
      }' height="110px" style="border-radius:10px;" src='${images[Math.floor(Math.random() * 4)]}' alt="">
  
  
   <p value='${price}' id="${
       id
      }"  class="${type}text d-flex align-items-start justify-content-start flex-column">
    <span class="mb-2 mt-3" >
  ${title}
    </span>
  
    <s id="${id}" value='${
       price
      }' style="font-size:12px; font-weight:300;">N${(
       price + price * (discountPercentage / 100)
      ).toFixed(2)} </s>
   
    <b id="${id}" value='${
       price
      }' class="d-flex mb-2 align-items-center justify-content-between w-100 "style="font-size:12px;> 
    <legend style="font-size:10px;">  N${price}.00  </legend> 
       
   <small id="${id}" value='${
       price
      }' class="danger" style="font-size:8px; color:#ff706d;"> -${
       discountPercentage
      }%</small>
    </b>
  
   
  
    <b id="${id}" value='${
       price
      }' style="font-size:11px; color:#32b27a;"> You saved N${(
       price *
        (discountPercentage / 100)
      ).toFixed(2)} </b>
  
  
   </p>
  
  </button>`;
    });
  }
  
  displaySlide(dealsContent, todaysDeals, "flex-row", 1, "deals");
  
  
  let sponsoredArr = fetchedData.slice(23, 29);
  console.log(sponsoredArr);
  let sponsoredContent = document.getElementById("sponsored-content");
  
  displaySlide(sponsoredContent, sponsoredArr, "flex-column", 2, "sponsored");
  
  let recommendedArr = fetchedData.slice(20, nums[randomNum]);
  let recommendedContent = document.getElementById("recommended-content");
  
  displaySlide(recommendedContent, recommendedArr, "flex-row", 3, "recommended");
  
  document.addEventListener("DOMContentLoaded", function () {
    let navBar = document.getElementById("nav");
    let searchBar = document.getElementById("search-bar");
    let shoppingLine = document.getElementById("shopping-line");
    window.addEventListener("scroll", () => {
      let windowHeight = window.scrollY;
  
      if (windowHeight > 100) {
        navBar.style.display = "none";
        searchBar.style.transition = "1s";
        shoppingLine.style.transition = "1s";
        searchBar.style.top = "0px";
        shoppingLine.style.top = "60px";
      } else if (windowHeight < 100) {
        navBar.style.display = "flex";
        searchBar.style.top = "40px";
        shoppingLine.style.top = "100px";
      }
    });
  });