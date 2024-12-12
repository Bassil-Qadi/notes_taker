import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const authRoute: Routes = [
    {
        key: 'newRegister',
        path: `/new-register`,
        component: lazy(() => import('@/views/NewRegisteration/SignUp')),
        authority: [],
    },
    {
        key: 'addNewSaloon',
        path: `/add-saloon`,
        component: lazy(() => import('@/views/NewRegisteration/AddNewSaloon')),
        authority: [],
    },
    {
        key: 'verifyOtp',
        path: `/verify-otp`,
        component: lazy(() => import('@/views/NewRegisteration/VerifyOtp')),
        authority: [],
    },
    {
        key: 'verifyForgotPasswordOtp',
        path: `/verify-password-otp`,
        component: lazy(() => import('@/views/auth/VerifyOtp')),
        authority: [],
    },
    {
        key: 'signIn',
        path: `/sign-in`,
        component: lazy(() => import('@/views/auth/SignIn')),
        authority: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: lazy(() => import('@/views/auth/SignUp')),
        authority: [],
    },
    {
        key: 'forgotPassword',
        path: `/forgot-password`,
        component: lazy(() => import('@/views/auth/ForgotPassword')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: lazy(() => import('@/views/auth/ResetPassword')),
        authority: [],
    },
]

export default authRoute
