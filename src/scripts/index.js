import "../styles/main.scss";
const responsiveImage = require("../images/light-1.jpg?sizes[]=450,sizes[]=800,sizes[]=1200,sizes[]=2200");

const newImg = document.createElement("img");
newImg.srcset = responsiveImage.srcSet;

document.body.appendChild(newImg);
