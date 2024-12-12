import { APP_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const appsNavigationConfig: NavigationTree[] = [
    {
        key: 'apps',
        path: '',
        title: 'APPS',
        translateKey: 'nav.apps',
        icon: 'apps',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'notes.allNotes',
                        path: `${APP_PREFIX_PATH}/sales/dashboard`,
                        title: 'All Notes',
                        translateKey: 'nav.notes.allNotes',
                        icon: 'sales',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],
            },
            {
                key: 'apps.project',
                path: '',
                title: 'Archived Notes',
                translateKey: 'nav.appsProject.archivedNotes',
                icon: 'project',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            // {
            //     key: 'apps.account',
            //     path: '',
            //     title: 'Account',
            //     translateKey: 'nav.appsAccount.account',
            //     icon: 'account',
            //     type: NAV_ITEM_TYPE_COLLAPSE,
            //     authority: [ADMIN, USER],
            //     subMenu: [
            //         {
            //             key: 'appsAccount.settings',
            //             path: `${APP_PREFIX_PATH}/account/settings/profile`,
            //             title: 'Settings',
            //             translateKey: 'nav.appsAccount.settings',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN, USER],
            //             subMenu: [],
            //         },
            //         {
            //             key: 'appsAccount.activityLog',
            //             path: `${APP_PREFIX_PATH}/account/activity-log`,
            //             title: 'Activity Log',
            //             translateKey: 'nav.appsAccount.activityLog',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN, USER],
            //             subMenu: [],
            //         },
            //     ],
            // },
        ],
    },
]

export default appsNavigationConfig
