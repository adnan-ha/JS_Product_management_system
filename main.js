let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let total = document.getElementById("total");
let createBtn = document.getElementById("createBtn");
let tbody = document.getElementById("tbody");
let search = document.getElementById("search");

let mode = "create";
let temp;

// to get the total price
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(143, 4, 4)";
  }
}

//to creat a product
let data;
if (localStorage.prod != null) {
  data = JSON.parse(localStorage.prod);
} else {
  data = [];
}

createBtn.onclick = function () {
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    category: category.value.toLowerCase(),
    total: total.innerHTML,
  };
  if (product.title != "" && product.price != "" && product.count <= 100) {
    if (mode === "create") {
      if (product.count > 1) {
        for (let y = 0; y < count.value; y++) {
          data.push(product);
        }
      } else {
        data.push(product);
      }
    } else {
      data[temp] = product;
      mode = "create";
      count.style.display = "block";
      createBtn.innerHTML = "Create";
    }
    clear();
  }
  localStorage.setItem("prod", JSON.stringify(data));
  displayData();
};

// To display the product
function displayData() {
  let table = "";
  for (let i = 0; i < data.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${data[i].title}</td>
      <td>${data[i].price}</td>
      <td>${data[i].taxes}</td>
      <td>${data[i].ads}</td>
      <td>${data[i].discount}</td>
      <td>${data[i].total}</td>
      <td>${data[i].category}</td>
      <td><button onclick= "updateProd(${i})" id="updateBtn">update</button></td>
      <td><button onclick="deleteProd(${i})" id="deleteBtn">delete</button></td>
    </tr>
    `;
  }
  tbody.innerHTML = table;
  let deleteBtn = document.getElementById("deleteAll");
  if (data.length > 0) {
    deleteBtn.innerHTML = `
    <button onclick = "deleteAll()">Delete All(${data.length})</button>
    `;
  } else {
    deleteBtn.innerHTML = "";
  }
}
displayData();

// To clear data from inputs
function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  total.style.background = "rgb(143, 4, 4)";
  count.value = "";
  category.value = "";
}

// To delete product
function deleteProd(i) {
  data.splice(i, 1);
  localStorage.setItem("prod", JSON.stringify(data));
  displayData();
}

// To delete all the products
function deleteAll() {
  data.splice(0);
  localStorage.clear();
  displayData();
}

// To update a product
function updateProd(i) {
  mode = "update";
  temp = i;
  title.value = data[i].title;
  price.value = data[i].price;
  taxes.value = data[i].taxes;
  ads.value = data[i].ads;
  discount.value = data[i].discount;
  category.value = data[i].category;
  count.style.display = "none";
  createBtn.innerHTML = "Update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
  getTotal();
}

// To search in products
let searchMode = "title";
function getSearchMode(id) {
  if (id == "byTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  search.focus();
  search.value = "";
  search.placeholder = `search by ${searchMode}`;
  displayData();
}

function searchData() {
  let table = "";
  if (searchMode == "title") {
    for (let i = 0; i < data.length; i++) {
      if (data[i].title.includes(search.value.toLowerCase())) {
        table += `
        <tr>
          <td>${i + 1}</td>
          <td>${data[i].title}</td>
          <td>${data[i].price}</td>
          <td>${data[i].taxes}</td>
          <td>${data[i].ads}</td>
          <td>${data[i].discount}</td>
          <td>${data[i].total}</td>
          <td>${data[i].category}</td>
          <td><button onclick= "updateProd(${i})" id="updateBtn">update</button></td>
          <td><button onclick="deleteProd(${i})" id="deleteBtn">delete</button></td>
        </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].category.includes(search.value.toLowerCase())) {
        table += `
        <tr>
          <td>${i + 1}</td>
          <td>${data[i].title}</td>
          <td>${data[i].price}</td>
          <td>${data[i].taxes}</td>
          <td>${data[i].ads}</td>
          <td>${data[i].discount}</td>
          <td>${data[i].total}</td>
          <td>${data[i].category}</td>
          <td><button onclick= "updateProd(${i})" id="updateBtn">update</button></td>
          <td><button onclick="deleteProd(${i})" id="deleteBtn">delete</button></td>
        </tr>
        `;
      }
    }
  }
  tbody.innerHTML = table;
}

// To change the theme
let css = document.getElementById("css");
let theme = document.getElementById("themeBtn");
let themeMood = localStorage.theme;
function changeTheme() {
  if (themeMood == "dark") {
    themeMood = "light";
    css.href = "CSS/light.css";
    themeBtn.innerHTML = "Dark Theme";
    localStorage.setItem("theme", "dark");
  } else {
    themeMood = "dark";
    css.href = "CSS/master.css";
    themeBtn.innerHTML = "Light Theme";
    localStorage.setItem("theme", "light");
  }
}
