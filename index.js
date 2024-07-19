const querySelectAll = (attr_name) => document.querySelectorAll(attr_name);
const querySelectOne = (attr_name) => document.querySelector(attr_name);
let aTags = querySelectAll("a");
// humberger menu ==============================================================
const humberger_menu = querySelectOne(".hambergerMenu");
const nav_container = querySelectOne(".navigationContainer");
let isToogle = true;
humberger_menu.addEventListener("click", () => {
  isToogle = !isToogle;
  isToogle
    ? nav_container.classList.remove("nav-toogle")
    : nav_container.classList.add("nav-toogle");
});


document.addEventListener("click", (e) => {
  if(e.target.className != "nav-links d-flex" 
  && e.target.classList != "fa-solid fa-bars"
  && e.target.className != "navigationContainer nav-toogle"
  ){
    nav_container.classList.remove("nav-toogle")
    isToogle = !isToogle;
  }

 
})

// CV downlaod ========================================================================
const download_CV = querySelectAll(".downLoadCv");

download_CV.forEach((dl_button) => {
  let createdaTag = document.createElement("a");
  dl_button.addEventListener("click", () => {
    createdaTag.href = "./images/sample.jpg";
    createdaTag.download = "sample.jpg";
    createdaTag.click();
  });
});



// current page ===============================================================

const scrollPage = (attrName, elementName, className) => {
  const current_page_navLinks = Array.from(elementName).find(
    (as) => as.getAttribute("name") === attrName
  );

  if (current_page_navLinks) {
    querySelectOne("." + className)?.classList.remove(className);
    current_page_navLinks.classList.add(className);
  }
  console.log(current_page_navLinks);
};

window.addEventListener("scroll", () => {
  let halfViewportHeight = window.innerHeight / 2;
  let scrollFromTop = document.documentElement.scrollTop;

  const isInScrollRange = (currentPage, nextPage) =>
    scrollFromTop >= halfViewportHeight * currentPage &&
    scrollFromTop < halfViewportHeight * nextPage;

  if (isInScrollRange(1, 7)) {
    scrollPage("About", aTags, "active");
  } else if (isInScrollRange(7, 11)) {
    scrollPage("Services", aTags, "active");
  } else if (isInScrollRange(11, 20)) {
    scrollPage("Contacts", aTags, "active");
  } else {
    scrollPage("Home", aTags, "active");
  }

  console.log("scrollFromTop", scrollFromTop);
});

// message me ==============================================================

const sendEmail = () => {
  let sent_verify = querySelectOne(".email-sent-ver");
  let name_ipt = document.getElementById("ipt-name");
  let email_ipt = document.getElementById("ipt-email");
  let message_ipt = document.getElementById("ipt-message");

  if (email_ipt.value != "" && message_ipt.value != "") {
    let param = {
      name: name_ipt.value,
      email: email_ipt.value,
      message: message_ipt.value,
    };

    emailjs.send("service_caae0pj", "template_aeywzmt", param)
    .then((_) => {
      sent_verify.style.display = "block";
      sent_verify.innerHTML = `Hello ${param.name}, your message has been successfully sent!`;

      setTimeout(() => {
        sent_verify.style.display = "none";
      }, 10000);
      
    });

    name_ipt.value = "";
    email_ipt.value = "";
    message_ipt.value = "";
  }
};
