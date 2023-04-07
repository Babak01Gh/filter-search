// http://localhost:3000/items

const searchInput = document.querySelector('#searchBox');
const mainDiv = document.querySelector('.main-div');
const filterButtons = document.querySelectorAll('.filterBtn');
let allProducts = [];

const filter = {
    searchItems: ""
};

document.addEventListener('DOMContentLoaded', ()=>{
    axios.get("https://my-json-server.typicode.com/Babak01Gh/filter-search/items")
    .then(
        res => {
            allProducts = res.data;
            renderProducts(res.data,filter)
        }
    )
    .catch(err => console.log(err))
})

function renderProducts(_products,_filters){
    mainDiv.innerHTML = "";
    const filteredItems = _products.filter((p)=>{
        return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase())
    })
    if(filteredItems.length){
        filteredItems.forEach(prod => {
            mainDiv.innerHTML += `<div class="product">
            <div class="imgContainer">
                <img src="${prod.image}" alt="${prod.title} product">
            </div>
            <div class="product-desc">
                <p class="product-price">${prod.price}$</p>
                <p class="product-title">${prod.title}</p>
            </div>
        </div>`
    }); 
    }
    else{
        mainDiv.innerHTML = 'Cannot find any item'
        console.log('hi')
    }
}

searchInput.addEventListener('input',(e)=>{
    filter.searchItems = e.target.value;
    renderProducts(allProducts,filter)
})

filterButtons.forEach(btn => {
    btn.addEventListener('click',(el)=>{
        filter.searchItems = el.target.dataset.filter;
        renderProducts(allProducts,filter)
    })
})
