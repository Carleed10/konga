let cart = document.querySelectorAll('.theCart')


let cartNum = localStorage.getItem('cartNo') || 0
function addToCart(event){
    el = event.target
    cart.forEach((c)=> {
        ++cartNum
        localStorage.setItem('cartNo', cartNum)
        c.innerHTML = cartNum
      })


  }
 
  cart.forEach((c)=> {
    c.innerHTML = cartNum
  })
