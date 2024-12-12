import { forwardRef } from 'react'
import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import {
    HiOutlineUser,
} from 'react-icons/hi'
import { FormContainer, FormItem } from '@/components/ui/Form'
import { Form, Formik, FormikProps } from 'formik'
import dayjs from 'dayjs'
import { Field, FieldProps } from 'formik'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'

export type Category = {
    _id?: string
    name: string
    description: string
    image: string
}

export type FormModel = Category

export type FormikRef = FormikProps<FormModel>

export type CategoryProps = Partial<Category>

type CustomerFormProps = {
    category: CategoryProps
    onFormSubmit: (values: FormModel) => void
}

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    description: Yup.string()
        .required('الرجاء إدخال تفاصيل الصنف'),
    name: Yup.string().required('الرجاء إدخال الاسم'),
    image: Yup.string().required('الرجاء إرفاق صورة الصنف'),
})

const EditCategoryForm = forwardRef<FormikRef, CustomerFormProps>(
    (props, ref) => {
        const { onFormSubmit, category } = props

        return (
            <Formik<FormModel>
                innerRef={ref}
                initialValues={{
                    name: category.name || '',
                    description: category.description || '',
                    image: category.image || '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    onFormSubmit?.(values)
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
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="اسم الصنف"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="التفاصيل"
                                invalid={
                                    errors.description && touched.description
                                }
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
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        )
    },
)

EditCategoryForm.displayName = 'EditCategoryForm'

export default EditCategoryForm
