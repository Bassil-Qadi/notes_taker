import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import { FormItem } from '@/components/ui/Form'
import { HiUserCircle, HiOutlineUser, HiOutlineTable } from 'react-icons/hi'
import { Field, FieldProps, FormikErrors, FormikTouched } from 'formik'
import { FcImageFile } from 'react-icons/fc'

type FormFieldsName = {
    image: string
    name: string
    job: string
}

type PersonalInfoFormProps = {
    mode?: string
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const PersonalInfoForm = (props: PersonalInfoFormProps) => {
    const { touched, errors, mode } = props

    return (
        <>
            <FormItem
                label="الصورة الشخصية"
                invalid={errors.image && touched.image}
                errorMessage={errors.image}
            >
                <Field name="image">
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
                    placeholder="ادخل اسم الموظف"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="الوظيفة"
                invalid={errors.job && touched.job}
                errorMessage={errors.job}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="job"
                    placeholder="ادخل الوظيفة"
                    component={Input}
                    prefix={<HiOutlineTable className="text-xl" />}
                />
            </FormItem>
        </>
    )
}

export default PersonalInfoForm
