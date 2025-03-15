let res = document.querySelector(".res");
let numb = document.querySelector(".numb");
res.textContent = "";
numb.addEventListener("click", function (event) {
    if (event.target.className != "del") {
        if (event.target.className == "n") {
            res.textContent += event.target.textContent;
        }

    }
});
let del = document.querySelector(".del");
del.addEventListener("click", function () {
    res.textContent = "";
})