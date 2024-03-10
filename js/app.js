const tableBody = document.querySelector('#table-body');
const itemsPerPage = 10;
let currentPage = 0;
// Fetch products function
const fetchProducts = () => {
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then((data) => {
        const products = data.products;
        console.log(products);
        loadTable(products);
        // Pagination buttons event listeners
        document.getElementById('prevPage').addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                loadTable(products);
            }
        });
        document.getElementById('nextPage').addEventListener('click', () => {
            const maxPage = Math.ceil(products.length / itemsPerPage) - 1;
            if (currentPage < maxPage) {
                currentPage++;
                loadTable(products);
            }
        });
    })
        .catch(error => {
        console.error('Error fetching products:', error);
    });
};
// Load table function
const loadTable = (products) => {
    if (tableBody) {
        tableBody.innerHTML = '';
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productsToShow = products.slice(startIndex, endIndex);
        productsToShow.forEach(item => {
            const row = document.createElement('tr');
            const cells = `
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td><img src="${item.thumbnail}" alt="Thumbnail" style="max-width: 150px;"></td>
                    <td>${item.description}</td>
                    <td>$${item.price}</td>
                    <td>%${item.discountPercentage}</td>
                    <td>${item.rating}</td>
                    <td>${item.stock}</td>
                    <td>${item.brand}</td>
                    <td>${item.category}</td>
                    <td>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-dark" onclick=""><i class="fa fa-eye" aria-hidden="true"></i></button>
                            <button class="btn btn-outline-warning" onclick=""><i class="fa fa-pencil" aria-hidden="true"></i></button>
                            <button class="btn btn-outline-danger" onclick=""><i class="fa fa-times" aria-hidden="true"></i></button>
                        </div>
                    </td>`;
            row.innerHTML = cells;
            tableBody.appendChild(row);
        });
    }
    else {
        console.error("tableBody is null. Unable to update the table.");
    }
};
fetchProducts();
export {};
