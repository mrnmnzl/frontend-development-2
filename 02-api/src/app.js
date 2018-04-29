import router from "page";
import {render} from "./views/engine";

export function createApp() {
    const app = {
        render,
        route: (path, fn) => router(path, fn.bind(app)),
        run() {
            router();
        }
    };

    // return app
    return Object.freeze(app);
}
