import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import promise from "redux-promise-middleware";
import reducers from "./reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = applyMiddleware(thunk, promise);
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(middleware);
export const store = createStore(persistedReducer, {}, enhancer);

export const persistor = persistStore(store);
