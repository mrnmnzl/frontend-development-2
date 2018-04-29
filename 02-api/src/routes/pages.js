import Handlebars from "handlebars/runtime";
import homePartial from "../views/partials/home.hbs";

Handlebars.registerPartial("home", homePartial);

export function home(ctx) {
    this.render("home");
}
