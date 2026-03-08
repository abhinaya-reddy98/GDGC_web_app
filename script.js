let cart=[]
let total=0

function addToCart(name,price){

let item={
name:name,
price:price
}

cart.push(item)

total+=price

updateCart()

}

function updateCart(){

let cartItems=document.getElementById("cart-items")
cartItems.innerHTML=""

cart.forEach((item,index)=>{

let li=document.createElement("li")

li.innerHTML=
`${item.name} - $${item.price} 
<button onclick="removeItem(${index})">❌</button>`

cartItems.appendChild(li)

})

document.getElementById("cart-total").innerText=total

document.getElementById("cart-count").innerText=cart.length

}

function removeItem(index){

total-=cart[index].price

cart.splice(index,1)

updateCart()

}
