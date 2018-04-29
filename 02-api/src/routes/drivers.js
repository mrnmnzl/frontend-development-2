import Handlebars from "handlebars/runtime";
import driverPartial from "../views/partials/driver.hbs";
import driversPartial from "../views/partials/drivers.hbs";

import {resource} from "../services/api";

Handlebars.registerPartial("driver", driverPartial);
Handlebars.registerPartial("drivers", driversPartial);

export function index() {
    resource("drivers")
        .then(data => data.MRData.DriverTable.Drivers)
        .then(drivers => this.render("drivers", {drivers}));
}

export function show(ctx) {
    resource(`drivers/${ctx.params.driver}`)
        .then(data => data.MRData.DriverTable.Drivers.shift())
        .then(driver => {
            return resource(`drivers/${driver.driverId}/constructors`)
                .then(data => data.MRData.ConstructorTable.Constructors)
                .then(constructors => {
                    driver.constructors = constructors;
                    return driver;
                })
        })
        .then(driver => {
            return resource(`drivers/${driver.driverId}/results`)
                .then(data => data.MRData.RaceTable.Races)
                .then(races => {
                    driver.races = races;
                    return driver;
                })
        })
        .then(driver => {
            this.render("driver", {driver});
        });
}
