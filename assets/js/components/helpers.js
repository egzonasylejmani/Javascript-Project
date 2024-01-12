function getQueryStringFromURL(url) {
    const url_parts = url.split("?");
    const qa_index = url_parts.length - 1;
    return url_parts[qa_index];
}

function displayWomen(page, div) {
    const api_url = `https://65a06946600f49256faff298.mockapi.io/api/shopping/woman`;

    const productsPerPage = 1;
    let currentPage = page;
    let data;

    const loadMoreButton = document.getElementById('loadMore');

    const getFinalUrl = async (url) => {
        const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
        return response.url;
    };

    const updateDisplay = (products) => {
        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;
        const visibleProducts = products.slice(start, end);

        const promises = visibleProducts.map(async m => {
            const finalUrl = await getFinalUrl(m.avatar);

            return `
                <div class="product">
                    <img src="${finalUrl}" alt="">
                    <h6>${m.name}</h6>
                    <a href="women-details.html?id=${m.id}" class="btn">Visit Product</a>
                </div>
            `;
        });

        Promise.all(promises)
            .then(htmlArray => {
                div.innerHTML += htmlArray.join('');

                // Check if there are more products to display
                const hasMoreProducts = end < products.length;

                if (hasMoreProducts) {
                    // Show the "Load More" button
                    loadMoreButton.style.display = 'block';
                } else {
                    // Hide the "Load More" button if there are no more products
                    loadMoreButton.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error fetching image URLs:', error);
            });
    };

    const loadMoreHandler = () => {
        currentPage++;
        loadMoreButton.style.display = 'none'; // Hide the button temporarily to prevent multiple clicks
        updateDisplay(data);
    };

    loadMoreButton.addEventListener('click', loadMoreHandler);

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredProducts = data.filter(product =>
            product.name.toLowerCase().includes(query)
        );

        currentPage = 1; // Reset current page when searching
        updateDisplay(filteredProducts);
    });

    // Fetch data on page load
    fetch(api_url)
        .then(response => response.json())
        .then(apiData => {
            data = apiData;
            // Initial display
            updateDisplay(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Call displayWomen on page load
document.addEventListener('DOMContentLoaded', () => {
    const shopWomenDiv = document.querySelector('.shop-women');

    // on load
    displayWomen(1, shopWomenDiv);
});
