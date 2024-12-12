import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { apiGetAccountLogData, apiGetNotificationsList, apiDeleteNotification, apiAddNotification, apiAddAllUsersNotification, apiAddAllSaloonssNotification } from '@/services/AccountServices'
import {
    UPDATE_TICKET,
    COMMENT,
    COMMENT_MENTION,
    ASSIGN_TICKET,
    ADD_TAGS_TO_TICKET,
    ADD_FILES_TO_TICKET,
    CREATE_TICKET,
} from '../constants'

type Event = {
    type: string
    dateTime: number
    ticket?: string
    status?: number
    userName: string
    userImg?: string
    comment?: string
    tags?: string[]
    files?: string[]
    assignee?: string
}

type Log = {
    id: string
    date: number
    events: Event[]
}

type Logs = Log[]

type GetAccountLogDataRequest = {
    filter: string[]
    activityIndex: number
}

type GetAccountLogDataResponse = {
    data: Logs
    loadable: boolean
}

type GetNotificationsListDataResponse = {
    data: Logs
    loadable: boolean
}

export type Notification = {
    _id: string
    title: string
    message: string
    userIds: []
    status: string
    type: string
    createdAt: string
}


export type ActivityLogState = {
    loading: boolean
    loadMoreLoading: boolean
    loadable: boolean
    activityIndex: number
    logs: Logs
    selectedType: string[]
    notificationsList: Notification[]
    deleteDialog: boolean
    deletedNotification: string
    newNotificationDialog: boolean
}


export const SLICE_NAME = 'accountActivityLog'

export const getNotifications = createAsyncThunk(
    SLICE_NAME + '/getNotifications',
    async () => {
        const response = await apiGetNotificationsList<
            any
        >()
        return response.data.data
    }
)

export const getLogs = createAsyncThunk(
    SLICE_NAME + '/getLogs',
    async (data: GetAccountLogDataRequest) => {
        const response = await apiGetAccountLogData<
            GetAccountLogDataResponse,
            GetAccountLogDataRequest
        >(data)
        return response.data
    }
)

export const filterLogs = createAsyncThunk(
    SLICE_NAME + '/filterLogs',
    async (data: GetAccountLogDataRequest) => {
        const response = await apiGetAccountLogData<
            GetAccountLogDataResponse,
            GetAccountLogDataRequest
        >(data)
        return response.data
    }
)

export const addSaloonNotification = createAsyncThunk(
    SLICE_NAME + '/addSaloonNotification',
    async (data: any) => {
        const response = await apiAddNotification(data)
        return response.data
    }
)

export const addAllSaloonsNotification = createAsyncThunk(
    SLICE_NAME + '/addAllSaloonsNotification',
    async (data: any) => {
        const response = await apiAddAllSaloonssNotification(data)
        return response.data
    }
)

export const addAllUsersNotification = createAsyncThunk(
    SLICE_NAME + '/addNotification',
    async (data: any) => {
        const response = await apiAddAllUsersNotification(data)
        return response.data
    }
)

export const deleteNotification = createAsyncThunk(
    SLICE_NAME + '/deleteNotification',
    async (data: any) => {
        const response = await apiDeleteNotification(data)
        return response.data
    }
)

const initialState: ActivityLogState = {
    loading: false,
    loadMoreLoading: false,
    loadable: false,
    activityIndex: 1,
    logs: [],
    notificationsList: [],
    deleteDialog: false,
    deletedNotification: '',
    newNotificationDialog: false,
    selectedType: [
        UPDATE_TICKET,
        COMMENT,
        COMMENT_MENTION,
        ASSIGN_TICKET,
        ADD_TAGS_TO_TICKET,
        ADD_FILES_TO_TICKET,
        CREATE_TICKET,
    ],
}

const activityLogSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setActivityIndex: (state, action) => {
            state.activityIndex = action.payload
        },
        setSelected: (state, action) => {
            state.selectedType = action.payload
        },
        toggleDeleteNotificationDialog: (state, action) => {
            state.deleteDialog = action.payload
        },
        toggleNewNotificationDialog: (state, action) => {
            state.newNotificationDialog = action.payload
        },
        setSelectedNotification: (state, action) => {
            state.deletedNotification = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLogs.fulfilled, (state, action) => {
                const currentState = current(state)
                state.logs = [...currentState.logs, ...action.payload.data]
                state.loadMoreLoading = false
                state.loadable = action.payload.loadable
            })
            .addCase(getLogs.pending, (state) => {
                state.loadMoreLoading = true
            })
            .addCase(filterLogs.fulfilled, (state, action) => {
                state.logs = action.payload.data
                state.loading = false
                state.loadable = action.payload.loadable
            })
            .addCase(filterLogs.pending, (state) => {
                state.loading = true
            })
            .addCase(getNotifications.pending, (state) => {
                state.loading = true
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loading = false
                state.notificationsList = action.payload
            })
            .addCase(getNotifications.rejected, (state) => {
                state.loading = false
            })
            // .addCase(addNotification.pending, (state) => {
            //     state.loading = true
            // })
            // .addCase(addNotification.fulfilled, (state, action) => {
            //     state.loading = false
            // })
    },
})

export const { setActivityIndex, setSelected, toggleDeleteNotificationDialog, setSelectedNotification, toggleNewNotificationDialog } = activityLogSlice.actions

export default activityLogSlice.reducer
