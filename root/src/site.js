require("./scss/site.scss");
import { $, jQuery } from "jquery";
window.$ = $;
window.jQuery = jQuery;
require("popper.js");
import "bootstrap";

import greet from "./greet";

const greetingMessage = greet("World");
console.log(greetingMessage);
