import { useEffect, useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import Loading from '@/components/shared/Loading'
import Container from '@/components/shared/Container'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import SaloonProfile from './components/SaloonProfile'
import PaymentHistory from './components/PaymentHistory'
import CategoriesTable from './components/CategoriesTable'
import ServicesTable from './components/ServicesTable'
import AdminsTable from './components/AdminsTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
// // import CurrentSubscription from './components/CurrentSubscription'
// import PaymentMethods from './components/PaymentMethods'
import reducer, {
    useAppDispatch,
    useAppSelector,
    setSelectedSaloon,
    toggleNewCategoryDialog,
    toggleDeleteCategoryDialog,
    toggleDeleteServiceDialog,
    getSaloon,
    deleteService,
    toggleDeleteSaloonUser,
    deleteSaloonUser,
} from './store'
import { useAppSelector as saloonAppSelector } from '@/views/project/ProjectList/store'
import NewProjectDialog from '../CategoryList/components/NewProjectDialog'
import NewServiceDialog from './components/NewServiceDialog'
import NewSaloonUserDialog from './components/NewSaloonUserDialog'

import { injectReducer } from '@/store'
import isEmpty from 'lodash/isEmpty'
import useQuery from '@/utils/hooks/useQuery'
import {
    deleteCategory,
    getCategoryList,
    getSaloonServices,
    getSaloonUsers
} from '../CategoryList/store'
import UserTable from '@/views/bookings/Customers/components/UsersTable'

injectReducer('projectSaloonDetails', reducer)

const SaloonDetail = () => {
    const dispatch = useAppDispatch()
    const [saloonServices, setSaloonServices] = useState([])
    const [saloonUsers, setSaloonUsers] = useState([])

    const query = useQuery()

    const dialogOpen = useAppSelector(
        (state) => state.projectSaloonDetails.data.deleteCategoryDialog,
    )
    const serviceDialogOpen = useAppSelector(
        (state) => state.projectSaloonDetails.data.deleteServiceDialog,
    )
    const saloonUserDialogOpen = useAppSelector(
        (state) => state.projectSaloonDetails.data.deleteSaloonUserDialog,
    )
    const data = useAppSelector(
        (state) => state.projectSaloonDetails.data.profileData.saloon,
    )
    const saloonStaff = useAppSelector(
        state => state.projectSaloonDetails.data.profileData.saloonStaff
    )
    const saloonCategories = useAppSelector(
        (state) => state.projectSaloonDetails.data.profileData.saloonCategories,
    )
    const loading = useAppSelector(
        (state) => state.projectSaloonDetails?.data.loading,
    )
    const selectedCategory = useAppSelector(
        (state) => state.projectSaloonDetails?.data.selectedCategory,
    )
    const selectedService = useAppSelector(
        (state) => state.projectSaloonDetails?.data.selectedService,
    )

    useEffect(() => {
        fetchData()
        fetchSaloonServices()
        fetchSaloonUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, data?._id])

    const fetchSaloonUsers = () => {
        if(data?._id) {
            let response = dispatch(getSaloonUsers({ saloonId: data._id }))
            response.then((data) => {
                if(data.error) setSaloonUsers([])
                if (data.payload) {
                    setSaloonUsers(data.payload)
                }
            })
        }
    }

    const fetchSaloonServices = () => {
        if (data?._id) {
            let response = dispatch(getSaloonServices({ saloonId: data._id }))
            response.then((data) => {
                if(data.error) setSaloonServices([])
                if (data.payload) {
                    setSaloonServices(data.payload)
                }
            })
        }
    }

    const fetchData = () => {
        let response = dispatch(getSaloon(query.get('id')))
        response.then((data) => {
            if (data.payload) {
                dispatch(setSelectedSaloon(data.payload.data))
            }
        })
    }

    const onDialogClose = () => {
        dispatch(toggleDeleteCategoryDialog(false))
    }

    const onServiceDialogClose = () => {
        dispatch(toggleDeleteServiceDialog(false))
    }

    const onSaloonUserDialogClose = () => {
        dispatch(toggleDeleteSaloonUser(false))
    }

    const onDeleteCategory = () => {
        let response = dispatch(deleteCategory(selectedCategory))

        response.then((data) => {
            if(data.error) {
                toast.push(
                    <Notification
                        title={'Something went wrong'}
                        type="danger"
                    >
                        الرجاء المحاولة مرة أخرى
                    </Notification>,
                )
            }
           
            if (data.payload.responseType === 'Success') {
                toast.push(
                    <Notification
                        title={'Successfully Modified'}
                        type="success"
                    >
                        تم حذف الصنف بنجاح
                    </Notification>,
                )
            } 
        })
        dispatch(toggleDeleteCategoryDialog(false))
    }

    const onDeleteService = () => {
        let response = dispatch(deleteService(selectedService))

        response.then((data) => {

            if(data.error) {
                toast.push(
                    <Notification
                        title={'Something went wrong'}
                        type="danger"
                    >
                        الرجاء المحاولة مرة أخرى
                    </Notification>,
                )
            }

            if (data.payload.responseType === 'Success') {
                dispatch(toggleDeleteServiceDialog(false))
                fetchSaloonServices()
                // fetchData()
                toast.push(
                    <Notification
                        title={'Successfully Deleted'}
                        type="success"
                    >
                        تم حذف الخدمة بنجاح
                    </Notification>,
                )
            }
        })
    }

    const onDeleteSaloonUser = () => {
        let response = dispatch(deleteSaloonUser(selectedCategory))

        response.then((data) => {

            if(data.error) {
                toast.push(
                    <Notification
                        title={'Something went wrong'}
                        type="danger"
                    >
                        الرجاء المحاولة مرة أخرى
                    </Notification>,
                )
            }

            if (data.payload.responseType === 'Success') {
                dispatch(toggleDeleteSaloonUser(false))
                fetchSaloonUsers()
                // fetchData()
                toast.push(
                    <Notification
                        title={'Successfully Deleted'}
                        type="success"
                    >
                        تم حذف المسؤول بنجاح
                    </Notification>,
                )
            }
        })
    }

    return (
        <Container className="h-full">
            <Loading loading={loading}>
                {!isEmpty(data) && (
                    <div className="flex flex-col xl:flex-row gap-4">
                        <div>
                            <SaloonProfile data={data} fetchData={fetchData} />
                        </div>
                        <div className="w-full">
                            <AdaptableCard>
                                {/* <CurrentSubscription /> */}
                                {data?.workingTime?.length > 0 && (
                                    <PaymentHistory
                                        data={data.workingTime}
                                        userId={query.get('id')}
                                    />
                                )}
                                {saloonCategories && (
                                    <CategoriesTable
                                        data={saloonCategories}
                                        userId={query.get('id')}
                                    />
                                )}
                                {saloonServices && (
                                    <ServicesTable
                                        data={saloonServices}
                                        userId={query.get('id')}
                                    />
                                )}
                                {saloonUsers && <AdminsTable data={saloonUsers} userId={query.get('id')} />}
                                {/* <PaymentMethods /> */}
                            </AdaptableCard>
                        </div>
                    </div>
                )}
            </Loading>
            {!loading && isEmpty(data) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No user found!"
                    />
                    <h3 className="mt-8">No user found!</h3>
                </div>
            )}
            <NewSaloonUserDialog fetchSaloonUsers={fetchSaloonUsers} />
            <NewProjectDialog saloonId={data?._id} fetchData={fetchData} />
            <NewServiceDialog
                saloonStaff={saloonStaff}
                saloonCategories={saloonCategories}
                fetchData={fetchSaloonServices}
            />
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="حذف الصنف"
                confirmButtonColor="red-600"
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                onCancel={onDialogClose}
                onConfirm={onDeleteCategory}
            >
                <p>
                    هل أنت متأكد أنك تريد حذف هذه الفئة؟ كل سجل سيتم حذف
                    المتعلقة بهذه الفئة أيضًا. هذا لا يمكن التراجع عن الإجراء.
                </p>
            </ConfirmDialog>
            <ConfirmDialog
                isOpen={serviceDialogOpen}
                type="danger"
                title="حذف الخدمة"
                confirmButtonColor="red-600"
                onClose={onServiceDialogClose}
                onRequestClose={onServiceDialogClose}
                onCancel={onServiceDialogClose}
                onConfirm={onDeleteService}
            >
                <p>
                    هل أنت متأكد أنك تريد حذف هذه الخدمة كل سجل سيتم حذف
                    المتعلقة بهذه الخدمة أيضًا. هذا لا يمكن التراجع عن الإجراء.
                </p>
            </ConfirmDialog>
            <ConfirmDialog
                isOpen={saloonUserDialogOpen}
                type="danger"
                title="حذف المسؤول"
                confirmButtonColor="red-600"
                onClose={onSaloonUserDialogClose}
                onRequestClose={onSaloonUserDialogClose}
                onCancel={onSaloonUserDialogClose}
                onConfirm={onDeleteSaloonUser}
            >
                <p>
                    هل أنت متأكد أنك تريد حذف هذا المسؤول كل سجل سيتم حذف
                    المتعلقة بهذا المسؤول أيضًا. هذا لا يمكن التراجع عن الإجراء.
                </p>
            </ConfirmDialog>
        </Container>
    )
}

export default SaloonDetail
