

let slideIndex = 1;
// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}
// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let captionText = document.getElementById("caption");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}



window.addEventListener("load", (event) => {
    var url = window.location.href;
    var idWithQueryString = url.substring(url.lastIndexOf('/') + 1);
    var id = idWithQueryString.split("?")[0];
    try {
        GetPic(id)
    } catch (error) {
        GetPicAlkatresz(id);
    }
    
});


async function GetPic(id) {
    var imgslider = document.getElementById('imgslider');
    let response = await fetch(`/get-pic-to-reszletes/${id}`);
    
    const poszt = await response.json();
    console.table(poszt);
    let postHTML = "";
    try {
        a = 1;
        for (let post of poszt) {
            postHTML += `
                <div class="mySlides">
                    <div class="numbertext">${a} / ${poszt.length}</div>
                    <img class="imgnagy" src="/images/${poszt[a-1].picpath}" alt="${a}">
                </div>
            `;
            a++;
        }
        postHTML += `
        <!-- Next and previous buttons -->
            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>
            <div class="row">
        `;
            i = 1;
        for (let post of poszt) {
            postHTML += `
                <div class="column">
                    <img class="demo cursor" src="/images/${post.picpath}" style="width:100%" onclick="currentSlide(${i})">
                </div>
            `;
            i++;
        }
        postHTML += `
            </div>
        `;
    } catch (error) {
        console.log(error);
    }
    imgslider.innerHTML = postHTML;

    if (poszt != "") {
        showSlides(slideIndex);
    } else {
        GetPicAlkatresz(id)
    }
}


async function GetPicAlkatresz(id) {
    var imgslider = document.getElementById('imgslider');
    let response = await fetch(`/GetPicToAlkatresz/${id}`);
    
    const poszt = await response.json();
    console.table(poszt);
    let postHTML = "";
    try {
        a = 1;
        for (let post of poszt) {
            postHTML += `
                <div class="mySlides">
                    <div class="numbertext">${a} / ${poszt.length}</div>
                    <img class="imgnagy" src="/images/${poszt[a-1].picpath}" alt="${a}">
                </div>
            `;
            a++;
        }
        postHTML += `
        <!-- Next and previous buttons -->
            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>
            <div class="row">
        `;
            i = 1;
        for (let post of poszt) {
            postHTML += `
                <div class="column">
                    <img class="demo cursor" src="/images/${post.picpath}" style="width:100%" onclick="currentSlide(${i})">
                </div>
            `;
            i++;
        }
        postHTML += `
            </div>
        `;
    } catch (error) {
        console.log(error);
    }
    imgslider.innerHTML = postHTML;
    showSlides(slideIndex);
}