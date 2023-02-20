//hover mega menu
function hoverIn(params) {
    params.classList.add("hover");
}

function hoverOut(params) {
    params.classList.remove("hover");
}

function hoverInMega(params) {
    console.log(params.previousElementSibling);
    params.previousElementSibling.classList.add("hover");
}

function hoverOutMega(params) {
    console.log(params.previousElementSibling);
    params.previousElementSibling.classList.remove("hover");
}

//render product card
let productsCount = 20;
let productsPerPage = 10;
let pageCount = productsCount / productsPerPage;
//let currentPage = 1;
let showProducts = (sectionID) => {
    //let sectionID = document.getElementsByTagName('script');
    console.log(`#${sectionID} .products-row .products-list`);
    let tempString = `#${sectionID} .products-row .products-list`;
    let productsList = document.querySelector(`#${sectionID} .products-row .products-list`);
    for (let i = 0; i < productsCount; i++) {
        let pageNumber = ((i - (i % productsPerPage)) / productsPerPage) + 1;
        if (pageNumber === 1) {
            productsList.innerHTML +=
                `<div page-id = "${pageNumber}" class="product-card">
                <div class="product-img">
                    <img src="../images/Products/${sectionID}${pageNumber}.webp" alt="">
                    <div class="products-showmore">
                        <a href="#">Click để xem chi tiết</a>
                        <button class="porducts-order">Đặt hàng</button>
                    </div>
                </div>
                <h1 class="product-info">GVN VIPER i3050</h1>
                <div class="product-saleoff">-3%</div>
                <div class="product-price">
                    <h2>22,710,000đ</h2>
                    <h1>22,000,000đ</h1>
                </div>
            </div>`;
        } else {
            productsList.innerHTML +=
                `<div page-id = "${pageNumber}" class="product-card" style="display:none;">
                <div class="product-img">
                    <img src="../images/Products/${sectionID}${pageNumber}.webp" alt="">
                    <div class="products-showmore">
                        <a href="#">Click để xem chi tiết</a>
                        <button class="porducts-order">Đặt hàng</button>
                    </div>
                </div>
                <h1 class="product-info">GVN VIPER i3050</h1>
                <div class="product-saleoff">-3%</div>
                <div class="product-price">
                    <h2>22,710,000đ</h2>
                    <h1>22,000,000đ</h1>
                </div>
            </div>`;
        }
    }
}

//render products list nav
let btnNavClick = (pageid, btn) => {
    let sectionID = btn.parentNode.parentNode.parentNode.getAttribute('id');
    let productsList = document.querySelectorAll(`#${sectionID} .products-row .products-list .product-card`);
    let productsNav = document.querySelector(`#${sectionID} .products-row .products-nav`);

    let btnNext = document.querySelector(`#${sectionID} .products-row .products-nav .next`);
    let btnPrev = document.querySelector(`#${sectionID} .products-row .products-nav .prev`);

    let currentPage = parseInt(document.querySelector(`#${sectionID} .products-row .products-nav .current`).getAttribute(`nav-id`));


    let activePage = 0;
    if (pageid.toString() == "next") {
        activePage = currentPage + 1;
        if (activePage == pageCount && btnNext != null) {
            if (btnPrev == null) {
                productsNav.innerHTML = `<button class="btn-nav prev" onclick = "btnNavClick('prev',this)"><i class="fa-solid fa-chevron-left"></i></button>` + productsNav.innerHTML;
            }
            productsNav.removeChild(productsNav.lastElementChild);
        } else if (activePage > 1 && btnPrev == null) {
            productsNav.innerHTML = `<button class="btn-nav prev" onclick = "btnNavClick('prev',this)"><i class="fa-solid fa-chevron-left"></i></button>` + productsNav.innerHTML;
        }
    } else if (pageid.toString() == "prev") {
        activePage = currentPage - 1;
        if (activePage == 1 && btnPrev != null) {
            if (btnNext == null) {
                productsNav.innerHTML = productsNav.innerHTML + `<button class="btn-nav next" onclick = "btnNavClick('next',this)"><i class="fa-solid fa-chevron-right"></i></button>`;
            }
            productsNav.removeChild(productsNav.firstElementChild);
        } else if (activePage < pageCount && btnNext == null) {
            productsNav.innerHTML = productsNav.innerHTML + `<button class="btn-nav next" onclick = "btnNavClick('next',this)"><i class="fa-solid fa-chevron-right"></i></button>`;
        }
    } else {
        activePage = pageid;
        if (activePage == 1 && btnPrev != null) {
            if (btnNext == null) {
                productsNav.innerHTML = productsNav.innerHTML + `<button class="btn-nav next" onclick = "btnNavClick('next',this)"><i class="fa-solid fa-chevron-right"></i></button>`;
            }
            productsNav.removeChild(productsNav.firstElementChild);
        } else if (activePage == pageCount && btnNext != null) {
            if (btnPrev == null) {
                productsNav.innerHTML = `<button class="btn-nav prev" onclick = "btnNavClick('prev',this)"><i class="fa-solid fa-chevron-left"></i></button>` + productsNav.innerHTML;
            }
            productsNav.removeChild(productsNav.lastElementChild);
        } else if (activePage > 1 && btnPrev == null) {
            productsNav.innerHTML = `<button class="btn-nav prev" onclick = "btnNavClick('prev',this)"><i class="fa-solid fa-chevron-left"></i></button>` + productsNav.innerHTML;
        } else if (activePage < pageCount && btnNext == null) {
            productsNav.innerHTML = productsNav.innerHTML + `<button class="btn-nav next" onclick = "btnNavClick('next',this)"><i class="fa-solid fa-chevron-right"></i></button>`;
        }
    }
    console.log(currentPage, " ", activePage);
    for (let i = 0; i < productsList.length; i++) {
        productsPageId = productsList[i].getAttribute(`page-id`);
        if (activePage.toString() === productsPageId.toString()) {
            productsList[i].style.display = "flex";
        } else productsList[i].style.display = "none";
    }
    let navList = document.querySelectorAll(`#${sectionID} .products-row .products-nav .btn-nav`);
    for (let i = 0; i < navList.length; i++) {
        if (navList[i].innerText.toString() === activePage.toString()) {
            navList[i].classList.add("current");
        } else {
            navList[i].classList.remove("current");
        }
    }
    //currentPage = activePage;

}
let showProductsNav = (sectionID) => {

    let productsNav = document.querySelector(`#${sectionID} .products-row .products-nav`);

    for (let i = 0; i < pageCount; i++) {
        if (i === 0) {
            productsNav.innerHTML +=
                `<button nav-id="${i+1}" class="btn-nav current" onclick = "btnNavClick(${i+1},this)">${i+1}</button>`;
        } else {
            productsNav.innerHTML +=
                `<button nav-id="${i+1}" class="btn-nav" onclick = "btnNavClick(${i+1},this)">${i+1}</button>`;
        }

    }
    productsNav.innerHTML += `<button class="btn-nav next" onclick = "btnNavClick('next',this)"><i class="fa-solid fa-chevron-right"></i></button>`;

}

//Sidebar control
let sidebarClick = (listitem) => {
    listitem.classList.toggle("active");

    listitem.querySelector(`.fa-chevron-right`).classList.toggle("fa-rotate-90");
    listitem.querySelector(`.fa-chevron-right`).classList.toggle("active");
    if (listitem.classList.contains("active")) {
        listitem.querySelector(`.list-item-title`).style.color = "white";
        listitem.parentNode.querySelector('.sub-list').style.maxHeight = "1000px";
    } else {
        listitem.querySelector(`.list-item-title`).style.color = "black";
        listitem.parentNode.querySelector('.sub-list').style.maxHeight = "0";

    }
}
let subitemClick = (subitem) => {
    subitem.classList.toggle("sub-menu-active");
    if (subitem.classList.contains("sub-menu-active")) {
        subitem.querySelector(`.sub-menu`).style.maxHeight = "1000px";
    } else {
        subitem.querySelector(`.sub-menu`).style.maxHeight = "0px";
    }
}

// Toggle Sidebar
let toggleSidebar = (sidebarToggle) => {
    let toggleCheck = sidebarToggle.getAttribute(`sidebar`);

    console.log(toggleCheck);
    document.querySelector(`body`).classList.toggle(`body-fade`);
    if (toggleCheck == "on") {
        document.querySelector(`.cover`).style.display = "block";
        // document.querySelector(`.sidebar`).style.width = "250px";

    } else {
        document.querySelector(`.cover`).style.display = "none";
        // document.querySelector(`.sidebar`).style.width = "0";
    }
    document.querySelector(`.sidebar`).classList.toggle(`sidebar-active`);
}