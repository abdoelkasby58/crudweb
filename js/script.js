let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let darkmode = document.getElementById("darkmode");
//themes
title.focus();
function toggleTheme() {
  if (document.body.classList.contains("dark-theme")) {
    darkmode.innerHTML = `<i class="fa-solid fa-sun" style="color: rgb(255, 255, 255);"></i>`;
    document.body.classList.remove("dark-theme");
  } else {
    darkmode.innerHTML = `<i class="fa-solid fa-moon" style="color: rgb(0, 0, 0);"></i>`;
    document.body.classList.add("dark-theme");
  }
}
//متغير وهمي
let mood = "create";
let tmp;
//get total
//getTotal
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "rgb(1, 88, 1)";
  } else {
    total.innerHTML = ``;
    total.style.background = "rgb(139, 3, 3)";
  }
}
//create product

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
create.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  //count
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newpro.count < 100
  ) {
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          dataPro.push(newpro);
        }
      } else {
        dataPro.push(newpro);
      }
    } else {
      dataPro[tmp] = newpro;
      mood = "create";
      create.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  } else {
    alert(
      "Please fill in all required fields and ensure count is less than 100.",
    );
  }
  //save local storage
  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
};

//clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  total.style.background = "rgb(139, 3, 3)";
}
//read
function showData() {
  getTotal();
  let table = ``;
  for (let i = 0; i < dataPro.length; i++) {
    table += `
       <tr>
              <td data-label="Id">${i + 1}</td>
              <td data-label="Title">${dataPro[i].title}</td>
              <td data-label="Price">${dataPro[i].price}</td>
              <td data-label="Taxes">${dataPro[i].taxes}</td>
              <td data-label="Ads">${dataPro[i].ads}</td>
              <td data-label="Discount">${dataPro[i].discount}</td>
              <td data-label="Total">${dataPro[i].total}</td>
              <td data-label="Category">${dataPro[i].category}</td>
              <td data-label="Update"><button onclick="updateData(${i})">Update</button></td>
              <td data-label="Delete"><button onclick="deleteData(${i})">Delete</button></td>
            </tr>`;
  }
  document.getElementById("table-body").innerHTML = table;
  let delAll = document.getElementById("delAll");
  if (dataPro.length > 0) {
    delAll.innerHTML = `<button class="btn" onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
  } else {
    delAll.innerHTML = "";
  }
}
showData();
//delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  console.log(dataPro);
  showData();
}
//delete all
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
//update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  count.style.display = "none";
  create.innerHTML = "Update";
  mood = "update";
  tmp = i;
  getTotal();
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search
let searchMood = "Title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "Title";
    search.placeholder = "Search By " + searchMood;
  } else {
    searchMood = "Category";
    search.placeholder = "Search By " + searchMood;
  }
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = ``;
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "Title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `<tr>
              <td data-label="Id">${i + 1}</td>
              <td data-label="Title">${dataPro[i].title}</td>
              <td data-label="Price">${dataPro[i].price}</td>
              <td data-label="Taxes">${dataPro[i].taxes}</td>
              <td data-label="Ads">${dataPro[i].ads}</td>
              <td data-label="Discount">${dataPro[i].discount}</td>
              <td data-label="Total">${dataPro[i].total}</td>
              <td data-label="Category">${dataPro[i].category}</td>
              <td data-label="Update"><button onclick="updateData(${i})">Update</button></td>
              <td data-label="Delete"><button onclick="deleteData(${i})">Delete</button></td>
            </tr>`;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `<tr>
                <td data-label="Id">${i + 1}</td> 
                <td data-label="Title">${dataPro[i].title}</td>
                <td data-label="Price">${dataPro[i].price}</td>
                <td data-label="Taxes">${dataPro[i].taxes}</td>
                <td data-label="Ads">${dataPro[i].ads}</td>
                <td data-label="Discount">${dataPro[i].discount}</td>
                <td data-label="Total">${dataPro[i].total}</td>
                <td data-label="Category">${dataPro[i].category}</td>
                <td data-label="Update"><button onclick="updateData(${i})">Update</button></td>
                <td data-label="Delete"><button onclick="deleteData(${i})">Delete</button></td>
              </tr>`;
      }
    }
  }
  document.getElementById("table-body").innerHTML = table;
}
let scrollUp = document.getElementById("uPscroll");
window.onscroll = function () {
  if (window.scrollY >= 300) {
    scrollUp.style.display = "flex";
  } else {
    scrollUp.style.display = "none";
  }
};
scrollUp.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
 scrollUp.style.display = "none";