import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetFAQs, apiDeleteFAQ, apiAddFAQ, apiUpdateFAQ } from '@/services/KnowledgeBaseService'

export type Article = {
    _id: string
    title: string
    description: string
    createdBy: string
    createdAt: string
    updatedAt: string
}

export type CategorizedArticles = {
    label: string
    value: string
    articles: Article[]
}


export type ManageArticleState = {
    loading: boolean
    categorizedArticles: CategorizedArticles[]
    FAQs: Article[]
    articleDeleteConfirmation: boolean
    categoryDeleteConfirmation: boolean
    categoryRenameDialog: boolean
    categoryAddDialog: boolean
    faqAddDialog: boolean
    faqEditDialog: boolean
    selected: {
        id: string
        title: string
        description: string
        createdBy: string
        createdAt: string
        updatedAt: string
    }
}

export const SLICE_NAME = 'knowledgeBaseManageArticles'

export const addFAQ = createAsyncThunk(
    SLICE_NAME + 'addFAQ',
    async (data: any) => {
        const response = await apiAddFAQ<any>(data)
        return response.data
    }
)

export const updateFAQ = createAsyncThunk(
    SLICE_NAME + 'updateFAQ',
    async (data: any) => {
        const response = await apiUpdateFAQ<any>(data)
        return response.data
    }
)

export const getFAQs = createAsyncThunk(
    SLICE_NAME + '/getFAQs',
    async () => {
        const response =
            await apiGetFAQs<any>()
        let { data } = response.data
        return data
    }
)

export const deleteFAQ = createAsyncThunk(
    SLICE_NAME + '/deleteFAQ',
    async (data: any) => {
        const response =
            await apiDeleteFAQ<any>(data)
        return response.data
    }
)

const initialState: ManageArticleState = {
    loading: false,
    categorizedArticles: [],
    FAQs: [],
    articleDeleteConfirmation: false,
    categoryDeleteConfirmation: false,
    categoryRenameDialog: false,
    categoryAddDialog: false,
    faqAddDialog: false,
    faqEditDialog: false,
    selected: { 
        id: '',
        title: '',
        description: '',
        createdBy: '',
        createdAt: '',
        updatedAt: ''
    },
}

const manageArticlesSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setFAQs: (state, action) => {
            state.FAQs = action.payload
        },
        toggleAddFaq: (state, action) => {
            state.faqAddDialog = action.payload
        },toggleEditFaq: (state, action) => {
            state.faqEditDialog = action.payload
        },
        setCategorizedArticles: (state, action) => {
            state.categorizedArticles = action.payload
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
            .addCase(getFAQs.fulfilled, (state, action) => {
                state.loading = false
                state.FAQs = action.payload
            })
            .addCase(getFAQs.pending, (state) => {
                state.loading = true
            })
            .addCase(getFAQs.rejected, (state) => {
                state.loading = false
            })
            .addCase(addFAQ.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(addFAQ.pending, (state) => {
                state.loading = true
            })
            .addCase(addFAQ.rejected, (state) => {
                state.loading = false
            })
    },
})

export const {
    toggleAddFaq,
    toggleEditFaq,
    toggleArticleDeleteConfirmation,
    toggleCategoryDeleteConfirmation,
    toggleCategoryRenameDialog,
    toggleAddCategoryDialog,
    setSelected,
    setCategorizedArticles,
    setFAQs
} = manageArticlesSlice.actions

export default manageArticlesSlice.reducer
