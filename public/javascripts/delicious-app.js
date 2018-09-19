import "../sass/style.scss";

import { $, $$ } from "./modules/bling";

import autocomplete from "./modules/autocomplete.js";
import typeAhead from "./modules/typeAhead.js";

autocomplete($("#address"), $("#lat"), $("#lng"));

typeAhead($(".search"));
