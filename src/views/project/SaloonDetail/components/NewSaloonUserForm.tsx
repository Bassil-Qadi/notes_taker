import { useState, useEffect } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { Field, Form, Formik, FieldProps } from 'formik'
import { getSaloonsList } from '../../ProjectList/store'
import {
    useAppDispatch,
    useAppSelector,
    toggleNewSaloonUserDialog,
    addSaloonUser
} from '../store'
import * as Yup from 'yup'

type FormModel = {
    name: string
    email: string
    phone: string
    password: string
}

const NewSaloonUserForm = ({ fetchData }: any) => {
    const dispatch = useAppDispatch()

    const saloonId = useAppSelector(
        state => state.projectSaloonDetails.data.profileData.saloon._id
    )

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('الرجاء إدحال الاسم'),
        email: Yup.string().required("الرجاء إدخال البريد الإلكتروني"),
        phone: Yup.string().required("الرجاء إدخال رقم الجوال"),
        password: Yup.string().required("الرجاء إدخال كلمة المرور"),
    })

    // useEffect(() => {
    //     fetchSaloonsList()
    // }, [])

    // const fetchSaloonsList = async () => {
    //     let response = dispatch(getSaloonsList())
    //     response.then((data) => {
    //         const updatedSaloons = data.payload
    //             .filter(
    //                 (saloon: any) => saloon?.createdBy?.id === currentUserId,
    //             )
    //             .map((saloon: any) => {
    //                 return {
    //                     ...saloon,
    //                     label: saloon.name,
    //                     value: saloon.name,
    //                 }
    //             })
    //         setSaloonsList(updatedSaloons)
    //     })
    //     let newSaloonCategories = saloonCategories.map((cat: any) => {
    //         return {
    //             ...cat,
    //             label: cat.name,
    //             value: cat._id
    //         }
    //     })
    //     let newSaloonStaff = saloonStaff.map((staff: any) => {
    //         return {
    //             ...staff,
    //             label: staff.name,
    //             value: staff._id
    //         }
    //     })
    //     setSaloonCategoriresList(newSaloonCategories)
    //     setSaloonStaffList(newSaloonStaff)
    // }

    const onSubmit = (
        formValue: FormModel,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        setSubmitting(true)

        const { name, email, phone, password } = formValue

        let response = dispatch(addSaloonUser({ name, email, phone, password, saloonId, fcmToken: '' }))
        response.then(data => {
            if(data.payload.responseType === 'Success') {
                fetchData()
            }
        })
        dispatch(toggleNewSaloonUserDialog(false))
        // dispatch(getCategoryList({ saloonId: saloon._id }))
    }

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                phone: '',
                password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values, setSubmitting)
            }}
        >
            {({ touched, errors, values }) => (
                <Form>
                    <FormContainer>
                        <FormItem
                            label="الاسم"
                            invalid={errors.name && touched.name}
                            errorMessage={errors.name}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="name"
                                placeholder="ادخل اسم المسؤول"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="البريد الإلكتروني"
                            invalid={errors.email && touched.email}
                            errorMessage={errors.email}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="email"
                                placeholder="ادخل البريد الإلكتروني"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="رقم الجوال"
                            invalid={errors.phone && touched.phone}
                            errorMessage={errors.phone}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="phone"
                                placeholder="ادخل رقم الجوال"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="كلمة المرور"
                            invalid={errors.password && touched.password}
                            errorMessage={errors.password}
                        >
                            <Field
                                type="password"
                                autoComplete="off"
                                name="password"
                                placeholder="ادخل كلمة المرور"
                                component={Input}
                            />
                        </FormItem>
                        <Button block variant="solid" type="submit">
                            إضافة
                        </Button>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default NewSaloonUserForm
