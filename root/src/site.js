require("./scss/site.scss");
import { $, jQuery } from "jquery";
window.$ = $;
window.jQuery = jQuery;
require("popper.js");
import "bootstrap";

import greet from "./greet";

const responsiveImage = require("./assets/images/Sphynx.jpg?sizes[]=500,sizes[]=750,sizes[]=1000");
console.log("responsiveImage", responsiveImage);

const greetingMessage = greet("World");
console.log(greetingMessage);
