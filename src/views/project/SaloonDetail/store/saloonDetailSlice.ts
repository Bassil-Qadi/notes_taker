import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomerDetails,
    // apiDeleteCrmCustomer,
    apPutCrmCustomer,
} from '@/services/CrmService'

import { apPutSaloon, apiGetSaloonDetails, apiAddSaloonService, apiDeleteService, apiAddSaloonUser, apiDeleteSaloonUser } from '@/services/ProjectService'

export const SLICE_NAME = 'projectSaloonDetails'

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

export type OrderHistory = {
    _id: string
    day: string
    open: string
    close: string
}

export type PaymentMethod = {
    cardHolderName: string
    cardType: string
    expMonth: string
    expYear: string
    last4Number: string
    primary: boolean
}

export type Subscription = {
    plan: string
    status: string
    billing: string
    nextPaymentDate: number
    amount: number
}

export type Saloon = {
    _id: string
    name: string
    phone: string
    categories: []
    createdBy: {
        name: string
        id: string
    }
    workingTime: []
    logo: string
    images: []
    type: string
    isActive: boolean
    createdAt: string
    address: string
    facebook: string
    snapchat: string
    tiktok: string
    instagram: string
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
}

type GetSaloonDetailsResponse = Saloon & {
    orderHistory?: OrderHistory[]
    paymentMethod?: PaymentMethod[]
    subscription?: Subscription[]
}

type GetSaloonDetailsRequest = { id: string }

// eslint-disable-next-line @typescript-eslint/ban-types
type DeleteCrmCustomerResponse = {}

type DeleteCrmCustomerRequest = { id: string }

export type CustomerDetailState = {
    loading: boolean
    profileData: Partial<Saloon>
    saloonCategories: any
    subscriptionData: Subscription[]
    paymentHistoryData: OrderHistory[]
    paymentMethodData: PaymentMethod[]
    newCategoryDialog: boolean
    newServiceDialog: boolean
    newSaloonUserDialog: boolean
    deletePaymentMethodDialog: boolean
    editPaymentMethodDialog: boolean
    editSaloonDetailDialog: boolean
    deleteCategoryDialog: boolean
    deleteServiceDialog: boolean
    deleteSaloonUserDialog: boolean
    selectedCategory: string
    selectedService: string
    selectedCard: Partial<PaymentMethod>
}

export const getCustomer = createAsyncThunk(
    SLICE_NAME + '/getCustomer',
    async (data: GetSaloonDetailsRequest) => {
        const response = await apiGetCrmCustomerDetails<
            GetSaloonDetailsResponse,
            GetSaloonDetailsRequest
        >(data)
        return response.data
    }
)

export const getSaloon = createAsyncThunk(
    SLICE_NAME + '/getSaloon',
    async (data: any) => {
        const response = await apiGetSaloonDetails<
            GetSaloonDetailsResponse,
            GetSaloonDetailsRequest
        >(data)
        return response.data
    }
)

export const addSaloonUser = createAsyncThunk(
    SLICE_NAME + '/addSaloonUser',
    async (data: any) => {
        const response = await apiAddSaloonUser(data)
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    SLICE_NAME + '/putCustomer',
    async (data: Saloon) => {
        const response = await apPutCrmCustomer(data)
        return response.data
    }
)

export const addService = createAsyncThunk(
    SLICE_NAME + '/addService',
    async (data: any) => {
        const response = await apiAddSaloonService(data)
        return response.data
    }
)

export const deleteService = createAsyncThunk(
    SLICE_NAME + '/deleteService',
    async (data: any) => {
        const response = await apiDeleteService(data)
        return response.data
    }
)

export const deleteSaloonUser = createAsyncThunk(
    SLICE_NAME + '/deleteSaloonUser',
    async (data: any) => {
        const response = await apiDeleteSaloonUser(data)
        return response.data
    }
)

export const putSaloon = createAsyncThunk(
    SLICE_NAME + '/putSaloon',
    async (data: Saloon) => {
        const response = await apPutSaloon(data)
        return response.data
    }
)

const initialState: CustomerDetailState = {
    loading: false,
    profileData: {},
    saloonCategories: {},
    subscriptionData: [],
    paymentHistoryData: [],
    paymentMethodData: [],
    deletePaymentMethodDialog: false,
    editPaymentMethodDialog: false,
    editSaloonDetailDialog: false,
    newCategoryDialog: false,
    newServiceDialog: false,
    newSaloonUserDialog: false,
    deleteCategoryDialog: false, 
    deleteServiceDialog: false,
    deleteSaloonUserDialog: false,
    selectedCategory: '',
    selectedService: '',
    selectedCard: {},
}

const saloonDetailSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setSelectedSaloon: (state, action) => {
            state.profileData = action.payload
        },
        setDeletedCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
        setDeletedService: (state, action) => {
            state.selectedService = action.payload
        },
        updatePaymentMethodData: (state, action) => {
            state.paymentMethodData = action.payload
        },
        updateProfileData: (state, action) => {
            state.profileData = action.payload
        },
        openDeletePaymentMethodDialog: (state) => {
            state.deletePaymentMethodDialog = true
        },
        closeDeletePaymentMethodDialog: (state) => {
            state.deletePaymentMethodDialog = false
        },
        openEditPaymentMethodDialog: (state) => {
            state.editPaymentMethodDialog = true
        },
        closeEditPaymentMethodDialog: (state) => {
            state.editPaymentMethodDialog = false
        },
        openEditSaloonDetailDialog: (state) => {
            state.editSaloonDetailDialog = true
        },
        closeEditSaloonDetailDialog: (state) => {
            state.editSaloonDetailDialog = false
        },
        updateSelectedCard: (state, action) => {
            state.selectedCard = action.payload
        },
        toggleNewCategoryDialog: (state, action) => {
            state.newCategoryDialog = action.payload
        },
        toggleDeleteCategoryDialog: (state, action) => {
            state.deleteCategoryDialog = action.payload
        },
        toggleNewServiceDialog: (state, action) => {
            state.newServiceDialog = action.payload
        },
        toggleNewSaloonUserDialog: (state, action) => {
            state.newSaloonUserDialog = action.payload
        },
        toggleDeleteServiceDialog: (state, action) => {
            state.deleteServiceDialog = action.payload
        },
        toggleDeleteSaloonUser: (state, action) => {
            state.deleteSaloonUserDialog = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomer.fulfilled, (state, action) => {
                state.loading = false
                state.profileData = action.payload?.saloon
                state.saloonCategories = action.payload?.saloonCategories
                state.subscriptionData = action.payload?.subscription || []
                state.paymentHistoryData = action.payload?.orderHistory || []
                state.paymentMethodData = action.payload?.paymentMethod || []
            })
            .addCase(getSaloon.pending, (state) => {
                state.loading = true
            })
            .addCase(getSaloon.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(getSaloon.rejected, (state) => {
                state.loading = false
            })
            // .addCase(addSaloonUser.pending, (state) => {
            //     state.loading = true
            // })
            // .addCase(addSaloonUser.fulfilled, (state) => {
            //     state.loading = false
            // })
            // .addCase(addSaloonUser.rejected, (state) => {
            //     state.loading = false
            // })
            .addCase(addService.pending, (state) => {
                state.loading = true
            })
            .addCase(addService.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(addService.rejected, (state) => {
                state.loading = false
            })
            .addCase(deleteService.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteService.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(deleteService.rejected, (state) => {
                state.loading = false
            })
    },
})

export const {
    updatePaymentMethodData,
    updateProfileData,
    openDeletePaymentMethodDialog,
    closeDeletePaymentMethodDialog,
    openEditPaymentMethodDialog,
    closeEditPaymentMethodDialog,
    openEditSaloonDetailDialog,
    closeEditSaloonDetailDialog,
    updateSelectedCard,
    setSelectedSaloon,
    toggleNewCategoryDialog,
    toggleNewServiceDialog,
    toggleDeleteCategoryDialog,
    setDeletedCategory,
    setDeletedService,
    toggleDeleteServiceDialog,
    toggleDeleteSaloonUser,
    toggleNewSaloonUserDialog
} = saloonDetailSlice.actions

export default saloonDetailSlice.reducer
