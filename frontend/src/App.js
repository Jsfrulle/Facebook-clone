import { PageRoutes } from "./PageRoutes";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";

const store = configureStore({ reducer: rootReducer, composeWithDevTools } );

export const App = () => (
  <Provider store={store}>
    <PageRoutes />
  </Provider>
);

export default App;
