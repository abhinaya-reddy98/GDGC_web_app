const products=[
{
id:1,
name:"iPhone",
price:999,
image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
},
{
id:2,
name:"Laptop",
price:1299,
image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
},
{
id:3,
name:"Headphones",
price:199,
image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
},
{
id:4,
name:"Smart Watch",
price:299,
image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30"
},
{
id:5,
name:"Camera",
price:799,
image:"https://images.unsplash.com/photo-1519183071298-a2962be96f83"
},
{
id:6,
name:"Keyboard",
price:120,
image:"https://images.unsplash.com/photo-1517331156700-3c241d2b4d83"
},
{
id:7,
name:"Gaming Mouse",
price:89,
image:"https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7"
},
{
id:8,
name:"Speaker",
price:150,
image:"https://images.unsplash.com/photo-1585386959984-a4155224a1ad"
}
]

let cart=JSON.parse(localStorage.getItem("cart"))||[]

function displayProducts(){

const container=document.getElementById("products")

products.forEach(product=>{

container.innerHTML+=`
<div class="product-card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>$${product.price}</p>

<button onclick="addToCart(${product.id})">Add to Cart</button>

</div>
`

})

}

displayProducts()


function addToCart(id){

let item=cart.find(p=>p.id===id)

if(item){

item.qty++

}else{

let product=products.find(p=>p.id===id)

cart.push({...product,qty:1})

}

updateCart()

}


function updateCart(){

const cartItems=document.getElementById("cart-items")

cartItems.innerHTML=""

let total=0

cart.forEach(item=>{

total+=item.price*item.qty

cartItems.innerHTML+=`

<div class="cart-item">

<div>
${item.name}<br>
$${item.price}
</div>

<div>

<button class="qty-btn" onclick="changeQty(${item.id},-1)">-</button>

${item.qty}

<button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>

</div>

</div>

`

})

document.getElementById("cart-count").innerText=cart.length

document.getElementById("total-price").innerText=total

localStorage.setItem("cart",JSON.stringify(cart))

}


function changeQty(id,change){

let item=cart.find(p=>p.id===id)

item.qty+=change

if(item.qty<=0){

cart=cart.filter(p=>p.id!==id)

}

updateCart()

}



function toggleCart(){

document.getElementById("cart").classList.toggle("active")

}


function scrollToProducts(){

document.getElementById("products").scrollIntoView({
behavior:"smooth"
})

}


updateCart()
