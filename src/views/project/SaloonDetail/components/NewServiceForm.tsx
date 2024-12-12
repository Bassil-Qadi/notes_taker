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
    toggleNewServiceDialog,
    addService
} from '../store'
import * as Yup from 'yup'

type FormModel = {
    name: string
    price: number
    duration: string
    saloon: string
    maxService: string
    saloonCategory: string 
    saloonStaff: string 
}

const NewServiceForm = ({ saloonCategories, saloonStaff, fetchData }: any) => {
    const dispatch = useAppDispatch()

    const [saloonsList, setSaloonsList] = useState([])
    const [saloonCategoriesList, setSaloonCategoriresList] = useState([])
    const [saloonStaffList, setSaloonStaffList] = useState([])

    const currentUserId = useAppSelector((state) => state.auth.user.id)
    const currentUserRole = useAppSelector((state) => state.auth.user.role)
    const currentUserSaloonId = useAppSelector(state => state.auth.user.saloonId) 

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('الرجاء إدحال الاسم'),
        price: Yup.string().required('الرجاء إدحال السعر'),
        duration: Yup.string().required('الرجاء إدحال المدة'),
        maxService: Yup.string().required('الرجاء اختيار الحد الأعلى للخدمة'),
        saloonCategory: Yup.string().required('الرجاء اختيار الصنف').oneOf(saloonCategoriesList.map((option: any) => option.value), 'Invalid option selected'),
    })

    useEffect(() => {
        fetchSaloonsList()
    }, [])

    const fetchSaloonsList = async () => {
        let response = dispatch(getSaloonsList())
        response.then((data) => {
            const updatedSaloons = data.payload
                .filter(
                    (saloon: any) => currentUserRole === 'owner' ? saloon?.userId === currentUserId : saloon?._id === currentUserSaloonId,
                )
                .map((saloon: any) => {
                    return {
                        ...saloon,
                        label: saloon.name,
                        value: saloon.name,
                    }
                })
            setSaloonsList(updatedSaloons)
        })
        let newSaloonCategories = saloonCategories.map((cat: any) => {
            return {
                ...cat,
                label: cat.name,
                value: cat._id
            }
        })
        let newSaloonStaff = saloonStaff.map((staff: any) => {
            return {
                ...staff,
                label: staff.name,
                value: staff._id
            }
        })
        setSaloonCategoriresList(newSaloonCategories)
        setSaloonStaffList(newSaloonStaff)
    }

    const onSubmit = (
        formValue: FormModel,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        setSubmitting(true)

        const { name, price, duration, saloon, saloonCategory, saloonStaff, maxService } = formValue

        let response = dispatch(addService({ name, price, duration, saloonCategoryId: saloonCategory, userId: currentUserId, saloonId: saloon._id, maxService }))
        response.then(data => {
            if(data.payload.responseType === 'Success') {
                fetchData()
            }
        })
        dispatch(toggleNewServiceDialog(false))
        // dispatch(getCategoryList({ saloonId: saloon._id }))
    }

    return (
        <Formik
            initialValues={{
                name: '',
                price: 0,
                duration: '',
                saloon: '',
                saloonCategory: '',
                maxService: '',
                saloonStaff: '',
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
                                placeholder="ادخل اسم الخدمة"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="السعر"
                            invalid={errors.price && touched.price}
                            errorMessage={errors.price}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="price"
                                placeholder="ادخل سعر الخدمة"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="المدة (بالدقيقة)"
                            invalid={errors.duration && touched.duration}
                            errorMessage={errors.duration}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="duration"
                                placeholder="ادخل مدة الخدمة"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="الحد الأعلى لطلب الخدمة"
                            invalid={errors.maxService && touched.maxService}
                            errorMessage={errors.maxService}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="maxService"
                                placeholder="ادخل الحد الأعلى للخدمة"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="قائمة الصالونات"
                            invalid={errors.saloon && touched.saloon}
                            errorMessage={errors.saloon}
                        >
                            <Field name="saloon">
                                {({ field, form }: FieldProps) => {
                                    return (
                                        <Select
                                            placeholder="اختر الصالون"
                                            options={saloonsList}
                                            onChange={(options) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    options,
                                                )
                                            }
                                        />
                                    )
                                }}
                            </Field>
                        </FormItem>
                        <FormItem
                            label="قائمة الأصناف"
                            invalid={errors.saloonCategory && touched.saloonCategory}
                            errorMessage={errors.saloonCategory}
                        >
                            <Field name="saloonCategory">
                                {({ field, form }: FieldProps) => {
                                    return (
                                        <Select
                                            placeholder="اختر الصنف المراد إضافة الخدمة له"
                                            options={saloonCategoriesList}
                                            onChange={(options: any) =>
                                                {
                                                    form.setFieldValue(
                                                        field.name,
                                                        options._id,
                                                    )
                                                }
                                            }
                                        />
                                    )
                                }}
                            </Field>
                        </FormItem>
                        <FormItem
                            label="قائمة العاملين"
                            invalid={errors.saloonStaff && touched.saloonStaff}
                            errorMessage={errors.saloonStaff}
                        >
                            <Field name="saloonStaff">
                                {({ field, form }: FieldProps) => {
                                    return (
                                        <Select
                                            placeholder="اختر العامل المراد إضافة الخدمة له"
                                            options={saloonStaffList}
                                            onChange={(options: any) =>
                                                {
                                                    form.setFieldValue(
                                                        field.name,
                                                        options._id,
                                                    )
                                                }
                                            }
                                        />
                                    )
                                }}
                            </Field>
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

export default NewServiceForm
