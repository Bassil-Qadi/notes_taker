import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmUsers,
    apiGetCrmCustomers,
    apCreateCrmUser,
    apPutCrmCustomer,
    apPutCrmUser,
    apiDeleteCrmUser,
    apiGetCrmCustomersStatistic,
} from '@/services/CrmService'
import type { TableQueries } from '@/@types/common'

type PersonalInfo = {
    location: string
    title: string
    birthday: string
    phoneNumber: string
    facebook: string
    twitter: string
    pinterest: string
    linkedIn: string
}

type OrderHistory = {
    id: string
    item: string
    status: string
    amount: number
    date: number
}

type PaymentMethod = {
    cardHolderName: string
    cardType: string
    expMonth: string
    expYear: string
    last4Number: string
    primary: boolean
}

type Subscription = {
    plan: string
    status: string
    billing: string
    nextPaymentDate: number
    amount: number
}

export type User = {
    id?: string | undefined
    name: string
    job: string
    image: string
    createdAt?: string
    updatedAt?: string
}

export type Customer = {
    id: string
    name: string
    email: string
    img: string
    role: string
    lastOnline: number
    status: string
    personalInfo: PersonalInfo
    orderHistory: OrderHistory[]
    paymentMethod: PaymentMethod[]
    subscription: Subscription[]
}

type Statistic = {
    value: number
    growShrink: number
}

type CustomerStatistic = {
    totalCustomers: Statistic
    activeCustomers: Statistic
    newCustomers: Statistic
}

type Filter = {
    selectedSaloon: string
}

type GetCrmCustomersResponse = {
    data: Customer[]
    total: number
}

type GetCrmUsersResponse = {
    data: User[],
    length: number
}

type GetCrmCustomersStatisticResponse = CustomerStatistic

export type CustomersState = {
    loading: boolean,
    statisticLoading: boolean
    customerList: Customer[],
    usersList: User[],
    statisticData: Partial<CustomerStatistic>
    tableData: TableQueries
    filterData: Filter
    drawerOpen: boolean,
    createDrawerOpen: boolean,
    selectedCustomer: Partial<Customer>,
    deletedUserId: string
}

export const SLICE_NAME = 'crmCustomers'

export const getCustomerStatistic = createAsyncThunk(
    'crmCustomers/data/getCustomerStatistic',
    async () => {
        const response =
            await apiGetCrmCustomersStatistic<GetCrmCustomersStatisticResponse>()
        return response.data
    }
)

export const getCustomers = createAsyncThunk(
    'crmCustomers/data/getCustomers',
    async (data: TableQueries & { filterData?: Filter }) => {
        const response = await apiGetCrmCustomers<
            GetCrmCustomersResponse,
            TableQueries
        >(data)
        return response.data
    }
)

export const getUsers = createAsyncThunk(
    'crmCustomers/data/getUsers',
    async (data: any) => {
        const response = await apiGetCrmUsers<
            GetCrmUsersResponse
        >(data)

        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'crmCustomers/data/putCustomer',
    async (data: Customer) => {
        const response = await apPutCrmCustomer(data)
        return response.data
    }
)

export const putUser = createAsyncThunk(
    'crmCustomers/data/putUser',
    async (data: Partial<User>) => {
        const response = await apPutCrmUser(data)
        return response.data
    }
)

export const createUser = createAsyncThunk(
    'crmCustomers/data/createUser',
    async (data: any) => {
        const response = await apCreateCrmUser(data)
        return response.data
    }
)

export const deleteUser = createAsyncThunk(
    'crmCustomers/data/deleteUser',
    async (data: any) => {
        const response = await apiDeleteCrmUser(data)
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

const initialState: CustomersState = {
    loading: false,
    statisticLoading: false,
    customerList: [],
    usersList: [],
    statisticData: {},
    tableData: initialTableData,
    filterData: initialFilterData,
    drawerOpen: false,
    createDrawerOpen: false,
    selectedCustomer: {},
    deletedUserId: ''
}

const customersSlice = createSlice({
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
            .addCase(getUsers.rejected, (state) => {
                state.loading = false
                state.usersList = []
                state.tableData.total = 0
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
} = customersSlice.actions

export default customersSlice.reducer
