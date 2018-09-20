import "../sass/style.scss";

import { $, $$ } from "./modules/bling";
import autocomplete from "./modules/autocomplete.js";
import typeAhead from "./modules/typeAhead.js";
import makeMap from "./modules/map";

autocomplete($("#address"), $("#lat"), $("#lng"));

typeAhead($(".search"));

makeMap($("#map"));
