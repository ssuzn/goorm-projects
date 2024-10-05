import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IOrder } from "./order.type";

export const fetchOrder = createAsyncThunk(
    "order/fetchOrder",
    async (userId: string, thunkAPI) => {
        try {
            const response = await axios.get<IOrder[]>(
                `https://640f6d494ed25579dc4ec41b.mockapi.io/orders?search=${userId}`
            )
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Error receiving order")
        }
    }
)

export const deleteOrder = createAsyncThunk(
    "order/deleteOrder",
    async (orderId: string, thunkAPI) => {
        try {
            await axios.delete<IOrder[]>(
                `https://640f6d494ed25579dc4ec41b.mockapi.io/orders/${orderId}`
            )

            return orderId;
        } catch (err) {
            return thunkAPI.rejectWithValue("Error receiving order")
        }
    }
)

type OrderState = {
    order: IOrder[];
    isLoading: boolean;
    error: string;
}


const initialState: OrderState = {
    order: [],
    isLoading: false,
    error: ""
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload;
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = state.order.filter(item => item.id !== action.payload);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    }
})

export default orderSlice.reducer;