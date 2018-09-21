require("./scss/site.scss");
import { $, jQuery } from "jquery";
window.$ = $;
window.jQuery = jQuery;
require("popper.js");
import "bootstrap";

import greet from "./greet";

const responsiveImage = require("./assets/images/sample.jpg");
console.log("responsiveImage", responsiveImage);

const greetingMessage = greet("World");
console.log(greetingMessage);
