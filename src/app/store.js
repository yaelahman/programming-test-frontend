import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../helper/auth/authSlice'
import { authApi } from '../helper/auth/authService'

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})
export default store
