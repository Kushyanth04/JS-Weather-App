const weatherApiKey = " ";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric";

const galleryImages = [
    // {src: "./assets/gallery/img1.png", alt: "Thumbnail Image 0"},
    { src: "./assets/gallery/image3.jpg", alt: "Thumbnail Image 3" },
    { src: "./assets/gallery/image1.jpg", alt: "Thumbnail Image 1" },
    { src: "./assets/gallery/image2.jpg", alt: "Thumbnail Image 2" }
];

const products = [
    {
        title: "AstroFiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
    },
    {
        title: "Space Odissey",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img1.png"
    },
    {
        title: "Doomed City",
        author: "Jason Cobert",
        price: 0,
        image: "./assets/products/img2.png"
    },
    {
        title: "Black Dog",
        author: "John Doe",
        price: 85.35,
        image: "./assets/products/img3.png"
    },
    {
        title: "My Little Robot",
        author: "Pedro Paulo",
        price: 0,
        image: "./assets/products/img5.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img4.png"
    }
]

// Menu section
function menuHandler() {
    document.querySelector("#open-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });

    document.querySelector("#close-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

menuHandler();

// Celsius to Fahrenheit converter
function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

// Weather section

// Greeting section
function greetingHandler() {
    let currentHour = new Date().getHours();
    let greetingText;

    if (currentHour < 12) {
        greetingText = "Good Morning";
    } else if (currentHour < 19) {
        greetingText = "Good Afternoon";
    } else if (currentHour < 24) {
        greetingText = "Good Evening";
    } else {
        greetingText = "Welcome";
    }

    document.querySelector("#greeting").innerHTML = greetingText;
}

greetingHandler();

function clockHandler() {
    setInterval(function () {
        let localTime = new Date();
        let hours = localTime.getHours();
        let minutes = localTime.getMinutes();
        let seconds = localTime.getSeconds();
        let period = hours >= 12 ? "PM" : "AM";

        document.querySelector(".time-number[data-time='hours']").innerHTML = (hours % 12 || 12).toString().padStart(2, "0");
        document.querySelector(".time-number[data-time='minutes']").innerHTML = minutes.toString().padStart(2, "0");
        document.querySelector(".time-number[data-time='seconds']").innerHTML = seconds.toString().padStart(2, "0");
        document.querySelector(".time-period").innerHTML = period;
    }, 1000);
}

clockHandler();

// Gallery section
function galleryHandler() {

    let mainImage = document.querySelector("#gallery > img");
    let thumbnails = document.querySelector("#gallery .thumbnails");

    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;

    galleryImages.forEach(function (img, index) {
        let thumb = document.createElement("img");
        thumb.src = img.src;
        thumb.alt = img.alt;
        thumb.dataset.arrayIndex = index
        thumb.dataset.selected = index === 0 ? true : false;

        thumb.addEventListener("click", function (e) {
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImg = galleryImages[selectedIndex];
            mainImage.src = selectedImg.src;
            mainImage.alt = selectedImg.alt;

            thumbnails.querySelectorAll("img").forEach(function (img) {
                img.dataset.selected = false;
            });
            e.target.dataset.selected = true;
        });

        thumbnails.appendChild(thumb);
    });
}

galleryHandler();

// Products section

function populateProducts(productsToShow) {
    let productsSection = document.querySelector(".products-area");
    productsSection.innerHTML = "";
    productsToShow.forEach(function (product, index) {
        let productItem = document.createElement("div");
        productItem.classList.add("product-item");

        let productImg = document.createElement("img");
        productImg.src = product.image;
        productImg.alt = "Image for" + product.title;

        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details");
        productItem.append(productDetails);

        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.innerHTML = product.title;
        productDetails.append(productTitle);

        let productAuthor = document.createElement("p");
        productAuthor.classList.add("product-author");
        productAuthor.innerHTML = product.author;
        productDetails.append(productAuthor);

        let priceTitle = document.createElement("p");
        priceTitle.classList.add("price-title");
        priceTitle.innerHTML = "Price";
        productDetails.append(priceTitle);

        let productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.innerHTML = product.price > 0 ? "$ " + product.price.toFixed(2) : "Free";
        productDetails.append(productPrice);

        productItem.append(productImg);
        productsSection.append(productItem);

        productItem.dataset.arrayIndex = index;
        productItem.dataset.selected = index === 0 ? true : false;

    });
}

populateProducts(products);

function productsHandler() {

    let freeProducts = products.filter(item => !item.price || item.price <= 0);
    let paidProducts = products.filter(item => item.price > 0);

    populateProducts(products);

    let totalProducts = products.length;
    document.querySelector(".products-filter label[for=all] span.product-amount").innerHTML = totalProducts;
    document.querySelector(".products-filter label[for=paid] span.product-amount").innerHTML = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").innerHTML = freeProducts.length;

    let productFilter = document.querySelector(".products-filter");
    productFilter.addEventListener("click", function (e) {
        if (e.target.id === "all") {
            populateProducts(products);
        } else if (e.target.id === "paid") {
            populateProducts(paidProducts);
        } else if (e.target.id === "free") {
            populateProducts(freeProducts);
        }
    });
}

productsHandler();

function footerHandler() {
    let currentYear = new Date().getFullYear();
    document.querySelector("footer").innerHTML = "Copyright " + currentYear + " Kushy | All rights reserved.";
}

footerHandler();

function weatherHandler() {
    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let url = weatherUrl.replace("{lat}", lat)
            .replace("{lon}", lon)
            .replace("{API key}", weatherApiKey);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const weatherCondition = data.weather[0].description;
                const userLocation = data.name;
                const temperature = data.main.temp;
                try {
                    let weatherText = "The weather is " + weatherCondition + " in " + userLocation + " and it's " + temperature + "°C outside.";

                    document.querySelector("p#weather").innerHTML = weatherText;
                    document.querySelector("#celsius").addEventListener("click", function () {
                        document.querySelector("#weather").innerHTML = "The weather is " + weatherCondition + " in " + userLocation + " and it's " + temperature + "°C outside.";
                    });

                    document.querySelector("#fahr").addEventListener("click", function () {
                        document.querySelector("#weather").innerHTML = "The weather is " + weatherCondition + " in " + userLocation + " and it's " + celsiusToFahrenheit(temperature) + "°F outside.";
                    });
                } catch (error) {
                    console.log(error);
                    document.querySelector("p#weather").innerHTML = "Could not retrieve weather data.";
                }
            });
    });
}
weatherHandler();
