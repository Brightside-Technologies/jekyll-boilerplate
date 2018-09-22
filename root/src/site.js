require("./scss/site.scss");
import $ from "jquery";
window.jQuery = $;
window.$ = $;
require("popper.js");
import "bootstrap";

import greet from "./greet";

const greetingMessage = greet("World");
console.log(greetingMessage);
