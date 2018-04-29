import "bootstrap";

import {createApp} from  "./app";
import {home} from "./routes/pages";
import {index as constructorIndex, show as constructorShow} from "./routes/constructors";
import {index as driverIndex, show as driverShow} from "./routes/drivers";
import {notFound} from "./routes/errors";

import "./styles/main.scss";

const app = createApp();

app.route('/', home);
app.route('/constructors/:constructor', constructorShow);
app.route('/constructors', constructorIndex);
app.route('/drivers/:driver', driverShow);
app.route('/drivers', driverIndex);
app.route('*', notFound);

app.run();