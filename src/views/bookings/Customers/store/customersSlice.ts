import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmUsers,
    apiGetCrmCustomers,
    apCreateCrmUser,
    apPutCrmCustomer,
    apPutCrmUser,
    apiDeleteCrmUser,
    apiGetCrmCustomersStatistic,
    apiGetBookings,
    apiDeleteBooking,
    apiGetBookingById,
    apPutBooking
} from '@/services/CrmService'
import type { TableQueries } from '@/@types/common'

type Filter = {
    selectedSaloon: string
}

type Booking = {
    _id: string
    userId: string
    bookingTime: string
    serviceIds: []
    saloonId: string
    total: number
    status: string
    paymentMethod: string
    createdAt: string
    updatedAt: string
}

export type BookingsState = {
    loading: boolean,
    statisticLoading: boolean
    bookingsList: Booking[]
    customerList: any[],
    usersList: any[],
    statisticData: Partial<any>
    tableData: TableQueries
    filterData: Filter
    drawerOpen: boolean,
    createDrawerOpen: boolean,
    selectedCustomer: Partial<any>,
    selectedBooking: any
    deletedUserId: string
}

export const SLICE_NAME = 'bookings'

export const getCustomerStatistic = createAsyncThunk(
    'bookings/data/getCustomerStatistic',
    async () => {
        const response =
            await apiGetCrmCustomersStatistic<any>()
        return response.data
    }
)

export const getCustomers = createAsyncThunk(
    'bookings/data/getCustomers',
    async (data: TableQueries & { filterData?: Filter }) => {
        const response = await apiGetCrmCustomers<
            any,
            TableQueries
        >(data)
        return response.data
    }
)

export const getBookings = createAsyncThunk(
    'bookings/data/getBookings',
    async (data: any) => {
        const response = await apiGetBookings<
            any
        >(data)

        return response.data
    }
)

export const getBookingById = createAsyncThunk(
    'bookings/data/getBookingById',
    async (data: any) => {
        const response = await apiGetBookingById<
            any
        >(data)

        return response.data
    }
)

export const getUsers = createAsyncThunk(
    'bookings/data/getUsers',
    async (data: any) => {
        const response = await apiGetCrmUsers<
            any
        >(data)

        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'bookings/data/putCustomer',
    async (data: any) => {
        const response = await apPutCrmCustomer(data)
        return response.data
    }
)

export const putBooking = createAsyncThunk(
    'bookings/data/putBooking',
    async (data: any) => {
        console.log(data)
        const response = await apPutBooking(data)
        return response.data
    }
)

export const putUser = createAsyncThunk(
    'bookings/data/putUser',
    async (data: Partial<any>) => {
        const response = await apPutCrmUser(data)
        return response.data
    }
)

export const createUser = createAsyncThunk(
    'bookings/data/createUser',
    async (data: any) => {
        const response = await apCreateCrmUser(data)
        return response.data
    }
)

export const deleteUser = createAsyncThunk(
    'bookings/data/deleteUser',
    async (data: any) => {
        const response = await apiDeleteCrmUser(data)
        return response.data
    }
)

export const deleteBooking = createAsyncThunk(
    'bookings/data/deleteBooking',
    async (data: any) => {
        const response = await apiDeleteBooking(data)
        return response.data
    }
)

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    selectedSaloon: "",
}

const initialState: BookingsState = {
    loading: false,
    statisticLoading: false,
    bookingsList: [],
    customerList: [],
    usersList: [],
    statisticData: {},
    tableData: initialTableData,
    filterData: initialFilterData,
    drawerOpen: false,
    createDrawerOpen: false,
    selectedCustomer: {},
    selectedBooking: {},
    deletedUserId: ''
}

const bookingsSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCustomerList: (state, action) => {
            state.customerList = action.payload
        },
        setUsersList: (state, action) => {
            state.usersList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload
        },
        setDeletedUserId: (state, action) => {
            state.deletedUserId = action.payload
        },
        setDrawerOpen: (state) => {
            state.drawerOpen = true
        },
        setDrawerClose: (state) => {
            state.drawerOpen = false
        },
        setCreateDrawerOpen: (state) => {
            state.createDrawerOpen = true
        },
        setCreateDrawerClose: (state) => {
            state.createDrawerOpen = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookingById.fulfilled, (state, action) => {
                state.selectedBooking = action.payload.data
                state.loading = false
            })
            .addCase(getBookings.pending, (state) => {
                state.loading = true
             })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.bookingsList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getBookings.rejected, (state) => {
                state.bookingsList = []
                state.loading = false
             })
            .addCase(getCustomers.fulfilled, (state, action) => {
                state.customerList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getCustomers.pending, (state) => {
                state.loading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.usersList = action.payload.data
                state.tableData.total = action.payload.length
                state.loading = false
            })
            .addCase(getUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getCustomerStatistic.fulfilled, (state, action) => {
                state.statisticData = action.payload
                state.statisticLoading = false
            })
            .addCase(getCustomerStatistic.pending, (state) => {
                state.statisticLoading = true
            })
    },
})

export const {
    setTableData,
    setCustomerList,
    setUsersList,
    setFilterData,
    setSelectedCustomer,
    setDeletedUserId,
    setDrawerOpen,
    setDrawerClose,
    setCreateDrawerOpen,
    setCreateDrawerClose
} = bookingsSlice.actions

export default bookingsSlice.reducer
