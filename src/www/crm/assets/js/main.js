// Controls

let pages = [
  {
    name: "admin",
    button: document.querySelector("#button-admin"),
    page: document.querySelector("#content-admin")
  },
  {
    name: "profile",
    button: document.querySelector("#button-profile"),
    page: document.querySelector("#content-profile")
  },
  {
    name: "orders",
    button: document.querySelector("#button-orders"),
    page: document.querySelector("#content-orders")
  }
];

let remove_active_classes = () => {
  pages.forEach((page) => {
    page.button.classList.remove("activitybar__item--active");
    page.page.classList.remove("content--active");
  })
}

let set_active = (page) => {
  remove_active_classes();

  item = pages.find(i => i.name === page);
  item.button.classList.add("activitybar__item--active");
  item.page.classList.add("content--active");
}

pages.forEach(page => {
  page.button.addEventListener('click', function() {
    set_active(page.name);
  });
});


// Info form

let info = document.querySelector(".card--info");
let info_close = document.querySelector(".card__close");

info_close.addEventListener("click", () => {
  info.classList.add("hidden");
})

set_active("profile");
