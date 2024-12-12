import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetBannersList,
    apiPutProjectList,
    apiAddBannerList,
    apiDeleteBannerList,
    apiPutBanner
} from '@/services/ProjectService'

type Banner = {
    _id: string
    title: string
    description: string
    image: string
    saloonId: string
    userId: string
    status: string
}

type BannersList = Banner[]

type Query = {
    sort: 'asc' | 'desc' | ''
    search: ''
}

type GetBannersListRequest = Query

type GetBannersListResponse = BannersList

type AddCategoryListRequest = {
    title: string
    description: string
    saloonId?: string
    userId?: string
    image: string
    status: string
}

type PutProjectListRequest = {
    id?: string | undefined
    name: string
    description: string
    file: string
}

export type AddCategoryListResponse = BannersList

export type ProjectListState = {
    loading: boolean
    bannersList: BannersList
    view: 'grid' | 'list'
    query: Query
    newBannerDialog: boolean
    deleteBannerDialog: boolean
    editBannerdialog: boolean
    selectedBanner: Banner
    deletedBannerId: string
}

export const SLICE_NAME = 'bannersList'

export const getBannersList = createAsyncThunk(
    SLICE_NAME + '/getList',
    async (data: any) => {
        const response = await apiGetBannersList(data)

        return response.data.data
    },
)

export const addBanner = createAsyncThunk(
    SLICE_NAME + '/addBanner',
    async (data: any) => {
        const response = await apiAddBannerList<
            AddCategoryListResponse,
            AddCategoryListRequest
        >(data)
        return response.data
    },
)

export const deleteBanner = createAsyncThunk(
    SLICE_NAME + '/deleteBanner',
    async (data: any) => {
        const response = await apiDeleteBannerList<any>(data)
        return response.data
    },
)

export const putBanner = createAsyncThunk(
    SLICE_NAME + '/putBanner',
    async (data: any) => {
        const response = await apiPutBanner(data)
        return response.data
    },
)

const initialState: ProjectListState = {
    loading: false,
    bannersList: [],
    view: 'grid',
    query: {
        sort: 'asc',
        search: '',
    },
    newBannerDialog: false,
    deleteBannerDialog: false,
    editBannerdialog: false,
    selectedBanner: {
        _id: '',
        title: '',
        description: '',
        image: '',
        saloonId: '',
        userId: '',
        status: ''
    },
    deletedBannerId: '',
}

const categoryListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        toggleView: (state, action) => {
            state.view = action.payload
        },
        toggleSort: (state, action) => {
            state.query.sort = action.payload
        },
        setSearch: (state, action) => {
            state.query.search = action.payload
        },
        toggleNewBannerDialog: (state, action) => {
            state.newBannerDialog = action.payload
        },
        toggleDeleteBannerDialog: (state, action) => {
            state.deleteBannerDialog = action.payload
        },
        toggleEditBannerDialog: (state, action) => {
            state.editBannerdialog = action.payload
        },
        setSelectedBanner: (state, action) => {
            state.selectedBanner = action.payload
        },
        setDeletedBannerId: (state, action) => {
            state.deletedBannerId = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBannersList.fulfilled, (state, action) => {
                state.bannersList = action.payload
                state.loading = false
            })
            .addCase(getBannersList.pending, (state) => {
                state.loading = true
            })
        // .addCase(putProject.fulfilled, (state, action) => {
        //     state.projectList = action.payload
        // })
    },
})

export const {
    toggleView,
    toggleSort,
    toggleNewBannerDialog,
    toggleDeleteBannerDialog,
    setSearch,
    setDeletedBannerId,
    setSelectedBanner,
    toggleEditBannerDialog
} = categoryListSlice.actions

export default categoryListSlice.reducer
