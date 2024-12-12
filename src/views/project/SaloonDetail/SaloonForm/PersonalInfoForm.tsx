import { useEffect, useState } from 'react'
import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { getCategoryList, useAppDispatch } from '../../CategoryList/store'
import { useAppSelector } from '../store'
import { HiUserCircle, HiOutlineUser } from 'react-icons/hi'
import { Field, FieldProps, FormikErrors, FormikTouched } from 'formik'
import { FcImageFile } from 'react-icons/fc'

type Option = {
    value: boolean | string
    label: string
    color: string
}

type FormFieldsName = {
    logo: string
    name: string
    address: string
    categories: []
    title: string
    email: string
    phone: string
    role: string
    passowrd?: string
}

type PersonalInfoFormProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

type Category = {
    name?: string
    label?: string
}

const saudiArabiaStates = [
    { label: 'الرياض', value: 'Riyadh' },
    { label: 'جدة', value: 'jeddah' },
    { label: 'مكة', value: 'Makkah' },
    { label: 'المدينة المنورة', value: 'Madinah' },
    { label: 'المنطقة الشرقية', value: 'Eastern Province' },
    { label: 'القصيم', value: 'Qassim' },
    { label: 'حائل', value: 'Hail' },
    { label: 'تبوك', value: 'Tabuk' },
    { label: 'الجوف', value: 'Al-Jouf' },
    { label: 'عسير', value: 'Asir' },
    { label: 'جازان', value: 'Jazan' },
    { label: 'نجران', value: 'Najran' },
    { label: 'الباحة', value: 'Bahah' },
    { label: 'الحدود الشمالية', value: 'Northern Borders' },
]

const PersonalInfoForm = (props: PersonalInfoFormProps) => {
    const { touched, errors } = props
    const dispatch = useAppDispatch()

    const selectedSaloon = useAppSelector(
        (state) => state.projectSaloonDetails.data.profileData.saloon._id,
    )
    const [categories, setCategories] = useState([])

    useEffect(() => {
        let responseData = dispatch(
            getCategoryList({ saloonId: selectedSaloon }),
        )
        responseData.then((data) => {
            const updatedCategories = data.payload.map((cat: Category) => {
                return {
                    ...cat,
                    label: cat.name,
                    value: cat.name,
                }
            })
            setCategories(updatedCategories)
        })
    }, [])

    return (
        <>
            {/* <FormItem
                invalid={errors.logo && touched.logo}
                errorMessage={errors.logo}
            >
                <Field name="logo">
                    {({ field, form }: FieldProps) => {
                        const avatarProps = field.value && !isImageChanged
                            ? { src: field.value }
                            : field.value && isImageChanged ? {src: URL.createObjectURL(field.value)}
                            : {}
                        return (
                            <div className="flex justify-center">
                                <Upload
                                    className="cursor-pointer"
                                    showList={false}
                                    uploadLimit={1}
                                    onChange={(files) =>
                                        {
                                            setIsImageChanged(true)
                                            form.setFieldValue(
                                            field.name,
                                            files[0]
                                        )
                                    }
                                    }

                                >
                                    <img 
                                        {...avatarProps} 
                                        className="border-2 border-white dark:border-gray-800 shadow-lg"
                                    />
                                </Upload>
                            </div>
                        )
                    }}
                </Field>
            </FormItem> */}
            <FormItem
                invalid={errors.logo && touched.logo}
                errorMessage={errors.logo}
            >
                <Field name="logo">
                    {({ field, form }: FieldProps) => {
                        return (
                            <div>
                                <Upload
                                    draggable
                                    uploadLimit={1}
                                    onChange={(files) => {
                                        form.setFieldValue(field.name, files[0])
                                    }}
                                >
                                    <div className="my-10 text-center">
                                        <div className="text-6xl mb-4 flex justify-center">
                                            <FcImageFile />
                                        </div>
                                        <p className="font-semibold">
                                            <span className="text-gray-800 dark:text-white">
                                                Drop your image here, or{' '}
                                            </span>
                                            <span className="text-blue-500">
                                                browse
                                            </span>
                                        </p>
                                        <p className="mt-1 opacity-60 dark:text-white">
                                            Support: jpeg, png, gif
                                        </p>
                                    </div>
                                </Upload>
                            </div>
                        )
                    }}
                </Field>
            </FormItem>
            <FormItem
                label="الاسم"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Name"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
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
                    placeholder="phone number"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>
            <FormItem label="الأصناف">
                <Field name="categories">
                    {({ field, form }: FieldProps) => {
                        let newValue = field.value.map((cat: any) => {
                            return { label: cat.name, ...cat }
                        })
                        return (
                            <Select
                                isMulti
                                placeholder="اختر الأصناف"
                                options={categories}
                                defaultValue={newValue}
                                onChange={(options) =>
                                    form.setFieldValue(field.name, options)
                                }
                            />
                        )
                    }}
                </Field>
            </FormItem>
            <FormItem
                label="العنوان"
                invalid={errors.address && touched.address}
                errorMessage={errors.address}
            >
                <Field name="address">
                    {({ field, form }: FieldProps) => {
                        return (
                            <Select
                                placeholder="اختر المنطقة"
                                defaultValue={[
                                    saudiArabiaStates.filter(
                                        (add) => add.value === field.value,
                                    )[0],
                                ]}
                                options={saudiArabiaStates}
                                onChange={(options) =>
                                    form.setFieldValue(
                                        field.name,
                                        options.value,
                                    )
                                }
                            />
                        )
                    }}
                </Field>
            </FormItem>
            {/* <FormItem
                label="البريد الإلكتروني"
                invalid={errors.email && touched.email}
                errorMessage={errors.email}
            >
                <Field
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    component={Input}
                    prefix={<HiMail className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="الدور"
                invalid={errors.role && touched.role}
                errorMessage={errors.role}
            >
                <Field name="role">
                {({ field, form }: FieldProps) => {
                    return <Select 
                    options={options}
                    size="sm"
                    className="min-w-[130px]"
                    onChange={(e) => {
                        form.setFieldValue(
                            field.name,
                            e?.value
                        )
                    }}
                />
                }}
                </Field>
                
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
                    placeholder="Phone"
                    component={Input}
                    prefix={<HiPhone className="text-xl" />}
                />
            </FormItem> */}
        </>
    )
}

export default PersonalInfoForm
