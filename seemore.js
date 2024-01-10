let fetchedData = JSON.parse(localStorage.getItem("products"));
console.log(fetchedData);

let allItems = document.getElementById("allItems");
fetchedData.forEach(({id,price,title,discountPercentage,stock,images}, i) => {
  allItems.innerHTML += ` <div class="d-flex mb-4 align-items-center bg-light flex-column" style="width:fit-content; height:fit-content;" > <button id="${id}" value='${price}' onclick="showProduct(event)"   class="border-0 mb-2 eachproduct flex-column align-items-center  rounded data${1} d-flex  justify-content-around">
     
<img id="${id}" value='${
    price
  }' width="85%" height="210px" style="border-radius:10px;" class="mt-2" src='${
    images[Math.floor(Math.random() * 5)]
  }' alt="">


<p id="${id}" value='${
    price
  }' class="text d-flex align-items-center justify-content-start flex-column w-100">

<span id="${id}" style="font-size:14px;"  value='${
    price
  }' class="mb-2 mt-3 w-100  "  >
${title.toUpperCase()}
</span>



<b id="${id}" value='${
    price
  }' class="d-flex mb-2 align-items-center justify-content-between w-75 "style="font-size:12px;> 

<legend id="${id}" value='${
    price
  }' style="font-size:10px;" class=" eachprice">  N${price}.00  </legend> 

<s id="${id}" value='${
    price
  }'  class="eachprice" style="font-size:12px; font-weight:300;">N${(
    price +
    price * (discountPercentage / 100)
  ).toFixed(2)} </s>

<small id="${id}" value='${
    price
  }' class=" ms-2 me-2 danger eachdiscount" style="font-size:8px; color:#ff706d;"> -${
    discountPercentage
  }%</small>

</b>

<div class="progress" role="progressbar" style="width:95%;" aria-label="Success example" aria-valuenow="${
    stock
  }" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar bg-success"  style="width:${stock}%;" >${
    stock
  }%</div>
</div>




</p>

</button>

<b onclick="addToCart(event)" id="${id}" value='${
    price
  }' onmouseenter="changeColor(event)"  class="d-flex eachcart align-items-center justify-content-center "> Add to cart </b> </div>

`;
});

function changeColor(event) {
  el = event.target;
  el.style.backgroundColor = "#f855a6";
  el.style.color = "white";

  el.addEventListener("mouseleave", () => {
    el.style.backgroundColor = "white";
    el.style.color = "#f855a6";
  });
}