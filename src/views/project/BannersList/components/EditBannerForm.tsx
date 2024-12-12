import { useState } from 'react'
import DatePicker from '@/components/ui/DatePicker'
import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { HiOutlineUser } from 'react-icons/hi'
import { FormContainer, FormItem } from '@/components/ui/Form'
import { Form, Formik, FormikProps } from 'formik'
import { useAppDispatch, putBanner, getBannersList, toggleEditBannerDialog } from '../store'
import { useAppSelector as useCrmSelector } from '@/views/crm/Customers/store'
import dayjs from 'dayjs'
import { Field, FieldProps } from 'formik'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'

export type Banner = {
    _id?: string
    title: string
    description: string
    image: string
    startDate: string
    endDate: string
    price: string
}

export type FormModel = Banner

export type FormikRef = FormikProps<FormModel>

export type BannerProps = Partial<Banner>

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    description: Yup.string().required('الرجاء إدخال تفاصيل الصنف'),
    title: Yup.string().required('الرجاء إدخال الاسم'),
    image: Yup.string().required('الرجاء إرفاق صورة الصنف'),
})

const EditBannerForm = ({ banner }: any) => {
    const dispatch = useAppDispatch()

    const selectedSaloonId = useCrmSelector(
        (state) => state.crmCustomers.data.filterData.selectedSaloon,
    )

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const handleStartDatePickerChange = (date: any) => {
        setStartDate(date)
    }

    const handleEndDatePickerChange = (date: any) => {
        setEndDate(date)
    }

    return (
        <Formik<FormModel>
            initialValues={{
                title: banner.title || '',
                description: banner.description || '',
                image: banner.image || '',
                price: banner.price || '',
                startDate: banner?.startDate || '',
                endDate: banner?.endDate || '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData()
                const { title, description, image, startDate, endDate, price } = values

                formData.append('title', title)
                formData.append('description', description)
                formData.append('image', image)
                formData.append('saloonId', selectedSaloonId)
                formData.append('startDate', startDate)
                formData.append('endDate', endDate)
                formData.append('price', price)
                formData.append('bannerId', banner._id)

                let returndedData = dispatch(putBanner(formData))

                returndedData.then((data) => {
                    if (data?.payload?.statusCode === 201) {
                        dispatch(getBannersList({ saloonId: selectedSaloonId }))
                        toast.push(
                            <Notification title={'Successfully Modified'} type="success">
                                تم تعديل العرض بنجاح
                            </Notification>,
                        )
                    } else {
                        toast.push(
                            <Notification title={'Something went wrong'} type="danger">
                                حدث خطأ ما الرجاء المحاولة لاحقا
                            </Notification>,
                        )
                    }
                })

                dispatch(toggleEditBannerDialog(false))
                setSubmitting(false)
            }}
        >
            {({ touched, errors }) => (
                <Form>
                    <FormContainer>
                        <FormItem
                            invalid={errors.image && touched.image}
                            errorMessage={errors.image}
                        >
                            <Field name="image">
                                {({ field, form }: FieldProps) => {
                                    const avatarProps = field.value
                                        ? { src: field.value }
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
                                                        URL.createObjectURL(
                                                            files[0],
                                                        ),
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
                                                    shape="circle"
                                                    icon={<HiOutlineUser />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        </div>
                                    )
                                }}
                            </Field>
                        </FormItem>
                        <FormItem
                            label="الاسم"
                            invalid={errors.title && touched.title}
                            errorMessage={errors.title}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="title"
                                placeholder="اسم العرض"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="التفاصيل"
                            invalid={errors.description && touched.description}
                            errorMessage={errors.description}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="description"
                                placeholder="تفاصيل الصنف"
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
                                placeholder="ادخل السعر "
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
                    </FormContainer>
                    <Button block variant="solid" type="submit">
                        حفظ
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

EditBannerForm.displayName = 'EditBannerForm'

export default EditBannerForm
