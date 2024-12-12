import { useState, useEffect } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import Select from '@/components/ui/Select'
import { Field, Form, Formik, FieldProps } from 'formik'
import { HiCloudUpload } from 'react-icons/hi'
import DatePicker from '@/components/ui/DatePicker'
import {
    addBanner,
    getBannersList,
    toggleNewBannerDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'
import { useAppSelector as useCrmSelector } from '@/views/crm/Customers/store'
import { getSaloonServices } from '../../CategoryList/store'
import * as Yup from 'yup'

type FormModel = {
    title: string
    description: string
    saloonId?: string
    userId?: string
    image: string
    startData: string
    endData: string
    price: string
    priceAfterDiscount: string
    serviceIds: []
}

const validationSchema = Yup.object().shape({
    title: Yup.string().min(3, 'Too Short!').required('Title required'),
    description: Yup.string().required('Title required'),
})

const NewCategoryForm = () => {
    const dispatch = useAppDispatch()
    const [services, setServices] = useState([])
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [totalPrice, setTotalPrice] = useState(0)

    const selectedSaloonId = useCrmSelector(
        (state) => state.crmCustomers.data.filterData.selectedSaloon,
    )

    const handleStartDatePickerChange = (date: any) => {
        setStartDate(date)
    }

    const handleEndDatePickerChange = (date: any) => {
        setEndDate(date)
    }

    useEffect(() => {
        let responseData = dispatch(getSaloonServices({ saloonId: selectedSaloonId }))
        responseData.then((data: any) => {
            const updatedServices = data.payload.map((service: any) => {
                return {
                    ...service,
                    label: service.name,
                    value: service.name,
                }
            })
            setServices(updatedServices)
        })
    }, [])

    const onSubmit = (
        formValue: FormModel,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        setSubmitting(true)

        const formData = new FormData()
        const { title, description, price, priceAfterDiscount, image, serviceIds } = formValue

        let newServices = serviceIds.map((service: any) => service._id)

        formData.append('title', title)
        formData.append('description', description)
        formData.append('saloonId', selectedSaloonId)
        formData.append('image', image)
        formData.append('startDate', startDate)
        formData.append('endDate', endDate)
        formData.append('price', totalPrice)
        formData.append('priceAfterDiscount', priceAfterDiscount)
        formData.append('serviceIds', JSON.stringify(newServices))

        let responseData = dispatch(addBanner(formData))

        responseData.then((data) => {
            if (data.payload.statusCode === 201) {
                dispatch(toggleNewBannerDialog(false))
                dispatch(getBannersList({ saloonId: selectedSaloonId }))
                toast.push(
                    <Notification title={'Successfully Added'} type="success">
                        تم إضافة العرض بنجاح
                    </Notification>,
                )
            }
        })
    }

    return (
        <Formik
            initialValues={{
                title: '',
                description: '',
                image: '',
                startDate: '',
                endDate: '',
                price: '',
                priceAfterDiscount: '',
                serviceIds: [],
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
                            label="العنوان"
                            invalid={errors.title && touched.title}
                            errorMessage={errors.title}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="title"
                                placeholder="ادخل عنوان العرض"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="التفاصيل"
                            invalid={errors.description && touched.description}
                            errorMessage={errors.description}
                        >
                            <Field
                                textArea
                                type="text"
                                autoComplete="off"
                                name="description"
                                placeholder="ادخل تفاصيل العرض"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem label="تاريخ بدء العرض">
                            <Field
                                name="startDate"
                            >
                                {() => {
                                    return (
                                        <DatePicker
                                            placeholder="Pick a date"
                                            value={startDate}
                                            onChange={handleStartDatePickerChange}
                                        />
                                    )
                                }}
                            </Field>
                        </FormItem>
                        <FormItem label="تاريخ انتهاء العرض">
                            <Field
                                name="endDate"
                            >
                                {() => {
                                    return (
                                        <DatePicker
                                            placeholder="Pick a date"
                                            value={endDate}
                                            onChange={handleEndDatePickerChange}
                                        />
                                    )
                                }}
                            </Field>
                        </FormItem>
                        <FormItem label="الخدمات">
                            <Field name="serviceIds">
                                {({ field, form }: FieldProps) => {
                                    return (
                                        <Select
                                            isMulti
                                            placeholder="اختر الخدمات"
                                            options={services}
                                            onChange={(options) => {
                                                let sum = options?.reduce((acc, item) => acc + item.price, 0)
                                                setTotalPrice(sum)
                                                form.setFieldValue(
                                                    field.name,
                                                    options,
                                                )
                                            }
                                            }
                                        />
                                    )
                                }}
                            </Field>
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
                                placeholder="ادخل السعر "
                                component={Input}
                                value={totalPrice}
                                disabled
                            />
                        </FormItem>
                        <FormItem
                            label="السعر بعد الخصم"
                            invalid={errors.priceAfterDiscount && touched.priceAfterDiscount}
                            errorMessage={errors.priceAfterDiscount}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="priceAfterDiscount"
                                placeholder="ادخل السعر بعد الخصم"
                                component={Input}
                            />
                        </FormItem>
                        {/* <FormItem label="الخدمات">
                            <Field name="serviceIds">
                                {({ field, form }: FieldProps) => {
                                    return (
                                        <Select
                                            isMulti
                                            placeholder="اختر الخدمات"
                                            options={services}
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
                        </FormItem> */}
                        <FormItem
                            invalid={errors.image && touched.image}
                            errorMessage={errors.image}
                        >
                            <Field name="image">
                                {({ field, form }: FieldProps) => {
                                    const avatarProps = field.value
                                        ? {
                                              src: URL.createObjectURL(
                                                  field.value,
                                              ),
                                          }
                                        : {}
                                    return (
                                        <div className="flex justify-center">
                                            <Upload
                                                className="cursor-pointer"
                                                showList={false}
                                                uploadLimit={1}
                                                onChange={(files) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        files[0],
                                                    )
                                                }
                                                onFileRemove={(files) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        URL.createObjectURL(
                                                            files[0],
                                                        ),
                                                    )
                                                }
                                            >
                                                <Avatar
                                                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                    size={100}
                                                    icon={<HiCloudUpload />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        </div>
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

export default NewCategoryForm
