import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import demoService from '../services/demoService';

// ১. Async Thunks (CRUD Operations)
export const fetchItems = createAsyncThunk('data/fetchAll', async (params, thunkAPI) => {
    try { return await demoService.fetchAllItems(params); } 
    catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch items'); }
});

export const fetchItemById = createAsyncThunk('data/fetchById', async (id, thunkAPI) => {
    try { return await demoService.fetchItemById(id); } 
    catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch item'); }
});

export const createNewItem = createAsyncThunk('data/create', async (data, thunkAPI) => {
    try { return await demoService.createItem(data); } 
    catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create item'); }
});

export const updateExistingItem = createAsyncThunk('data/update', async ({ id, data }, thunkAPI) => {
    try { return await demoService.updateItem(id, data); } 
    catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update item'); }
});

export const deleteExistingItem = createAsyncThunk('data/delete', async (id, thunkAPI) => {
    try { await demoService.deleteItem(id); return id; } // ডিলিট সফল হলে আইডি রিটার্ন করছি
    catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete item'); }
});

// ২. Slice
const dataSlice = createSlice({
    name: 'data',
    initialState: {
        items: [],
        currentItem: null,
        isLoading: false,
        isError: false,
        message: '',
    },
    reducers: {
        resetState: (state) => {
            state.items = [];
            state.currentItem = null;
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchItems.pending, (state) => { state.isLoading = true; })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Fetch By ID
            .addCase(fetchItemById.fulfilled, (state, action) => {
                state.currentItem = action.payload;
            })
            // Create
            .addCase(createNewItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Update
            .addCase(updateExistingItem.fulfilled, (state, action) => {
                state.items = state.items.map(item => item._id === action.payload._id ? action.payload : item);
            })
            // Delete
            .addCase(deleteExistingItem.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    },
});

export const { resetState } = dataSlice.actions;
export default dataSlice.reducer;
