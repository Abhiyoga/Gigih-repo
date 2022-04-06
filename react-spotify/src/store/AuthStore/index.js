import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../../reducer/AuthReducer";

export default configureStore({
    reducer: {
        auth: AuthReducer
    }
}) 