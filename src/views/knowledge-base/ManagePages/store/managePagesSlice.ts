import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetPages, apiAddPage, apiUpdatePage, apiDeletePage } from '@/services/KnowledgeBaseService'

export type Page = {
    _id: string
    title: string
    description: string
    createdBy: string
    createdAt: string
    updatedAt: string
    updatedBy: string
}

export type ManageArticleState = {
    loading: boolean
    pages: Page[]
    articleDeleteConfirmation: boolean
    categoryDeleteConfirmation: boolean
    categoryRenameDialog: boolean
    categoryAddDialog: boolean
    pageAddDialog: boolean
    pageEditDialog: boolean
    selected: {
        _id: string
        title: string
        description: string
        createdBy: string
        createdAt: string
        updatedAt: string
        updatedBy: string
    }
}

export const SLICE_NAME = 'knowledgeBaseManagePages'

export const addPage = createAsyncThunk(
    SLICE_NAME + 'addPage',
    async (data: any) => {
        const response = await apiAddPage<any>(data)
        return response.data
    }
)

export const updatePage = createAsyncThunk(
    SLICE_NAME + 'updatePage',
    async (data: any) => {
        const response = await apiUpdatePage<any>(data)
        return response.data
    }
)

export const getPages = createAsyncThunk(
    SLICE_NAME + '/getPages',
    async (saloonId: any) => {
        const response =
            await apiGetPages<any>(saloonId)
        let { data } = response.data
        return data
    }
)

export const deletePage = createAsyncThunk(
    SLICE_NAME + '/deletePage',
    async (data: any) => {
        const response =
            await apiDeletePage<any>(data)
        return response.data
    }
)

const initialState: ManageArticleState = {
    loading: false,
    pages: [],
    articleDeleteConfirmation: false,
    categoryDeleteConfirmation: false,
    categoryRenameDialog: false,
    categoryAddDialog: false,
    pageAddDialog: false,
    pageEditDialog: false,
    selected: { 
        id: '',
        title: '',
        description: '',
        createdBy: '',
        createdAt: '',
        updatedAt: '',
        updatedBy: ''
    },
}

const manageArticlesSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setPages: (state, action) => {
            state.pages = action.payload
        },
        toggleAddPage: (state, action) => {
            state.pageAddDialog = action.payload
        },toggleEditPage: (state, action) => {
            state.pageEditDialog = action.payload
        },
        toggleArticleDeleteConfirmation: (state, action) => {
            state.articleDeleteConfirmation = action.payload
        },
        toggleCategoryDeleteConfirmation: (state, action) => {
            state.categoryDeleteConfirmation = action.payload
        },
        toggleCategoryRenameDialog: (state, action) => {
            state.categoryRenameDialog = action.payload
        },
        toggleAddCategoryDialog: (state, action) => {
            state.categoryAddDialog = action.payload
        },
        setSelected: (state, action) => {
            state.selected = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPages.fulfilled, (state, action) => {
                state.loading = false
                state.pages = action.payload
            })
            .addCase(getPages.pending, (state) => {
                state.loading = true
            })
            .addCase(getPages.rejected, (state) => {
                state.loading = false
            })
            .addCase(addPage.fulfilled, (state, action) => {
                state.loading = false
                // state.pages = action.payload.data
            })
            .addCase(addPage.pending, (state) => {
                state.loading = true
            })
            .addCase(addPage.rejected, (state) => {
                state.loading = false
            })
            .addCase(updatePage.fulfilled, (state, action) => {
                state.loading = false
                // state.pages = action.payload
            })
            .addCase(updatePage.pending, (state) => {
                state.loading = true
            })
            .addCase(updatePage.rejected, (state) => {
                state.loading = false
            })
            .addCase(deletePage.fulfilled, (state, action) => {
                state.loading = false
                state.pages = action.payload
            })
            .addCase(deletePage.pending, (state) => {
                state.loading = true
            })
            .addCase(deletePage.rejected, (state) => {
                state.loading = false
            })
    },
})

export const {
    toggleAddPage,
    toggleEditPage,
    toggleArticleDeleteConfirmation,
    toggleCategoryDeleteConfirmation,
    toggleCategoryRenameDialog,
    toggleAddCategoryDialog,
    setSelected,
    setPages
} = manageArticlesSlice.actions

export default manageArticlesSlice.reducer
