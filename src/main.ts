import {AppContainer} from "./container/app-container";
import {DEPENDENCY_TAG} from "./container/dependency-tags";
import {App} from "./app";

const appContainer = new AppContainer();
const app = appContainer.get<App>(DEPENDENCY_TAG.APPLICATION);
app.init();

export {app, appContainer};