import Handlebars from "handlebars/runtime";
import constructorPartial from "../views/partials/constructor.hbs";
import constructorsPartial from "../views/partials/constructors.hbs";

import {resource} from "../services/api";

Handlebars.registerPartial("constructor", constructorPartial);
Handlebars.registerPartial("constructors", constructorsPartial);

export function index() {
    resource("constructors")
        .then(data => data.MRData.ConstructorTable.Constructors)
        .then(constructors => {
            console.log(constructors);
            this.render("constructors", {constructors});
        });
}

export function show(ctx) {
    resource(`constructors/${ctx.params.constructor}`)
        .then(data => data.MRData.ConstructorTable.Constructors.shift())
        .then(constructor => {
            return resource(`constructors/${constructor.constructorId}/drivers`)
                .then(data => data.MRData.DriverTable.Drivers)
                .then(drivers => {
                    constructor.drivers = drivers;
                    return constructor;
                })
        })
        .then(constructor => {
            console.log(constructor);
            this.render("constructor", {constructor});
        });
}
