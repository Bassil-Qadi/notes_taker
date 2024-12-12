import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetArticle } from '@/services/KnowledgeBaseService'

type Page = {
    _id: string
    title: string
    description: string
    createdBy: string
    createdAt: string
    updatedAt: string
    updatedBy: string
}

type GetArticleRequest = { id: string }

type GetArticleResponse = Page

export type EditArticleState = {
    loading: boolean
    page: Partial<Page>
    categoryValue: string
    categoryLabel: string
    mode: string
}

export const SLICE_NAME = 'knowledgeBaseEditPage'

export const getArticle = createAsyncThunk(
    SLICE_NAME + '/getPage',
    async (param: GetArticleRequest) => {
        const response = await apiGetArticle<
            GetArticleResponse,
            GetArticleRequest
        >(param)
        return response.data
    }
)

const initialState: EditArticleState = {
    loading: false,
    page: {},
    categoryValue: '',
    categoryLabel: '',
    mode: 'edit',
}

const editPageSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        },
        setCategory: (state, action) => {
            state.categoryValue = action.payload.categoryValue
            state.categoryLabel = action.payload.categoryLabel
        },
        setMode: (state, action) => {
            state.mode = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArticle.fulfilled, (state, action) => {
                state.loading = false
                state.page = action.payload
            })
            .addCase(getArticle.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setPage, setCategory, setMode } = editPageSlice.actions

export default editPageSlice.reducer
