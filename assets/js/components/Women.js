export default function Movie(id, div) {
    const api_url = `https://65a06946600f49256faff298.mockapi.io/api/shopping/woman/${id}`

    fetch(api_url)
    .then(response => response.json())
    .then(data => {
        console.log('data', data)
        div.innerHTML = `
        <div class = "card-wrapper">
        <div class = "product-card">
          <!-- card left -->
          <div class = "product-imgs">
            <div class = "img-display">
              <div class = "img-showcase">
                <img src = "${data.avatar}" alt = "shoe image">
              </div>
            </div>
            </div>
          </div>
          <!-- card right -->
          <div class = "product-content">
            <h2 class = "product-title">${data.name}</h2>
            <div class = "product-price">
              <p class = "last-price">Old Price: <span>${data.price}</span></p>
              <p class = "new-price">New Price: <span>${data.new_price} (5%)</span></p>
            </div>
      
            <div class = "product-detail">
              <h2>about this item: </h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
              <ul>
                <li>Color: <span>${data.color}</span></li>
                <li>Available: <span>in stock</span></li>
                <li>Category: <span>${data.category}</span></li>
              </ul>
            </div>
      
            <div class = "purchase-info">
              <button type = "button" class = "btn">
                Add to Cart <i class = "fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
        `
    })
}