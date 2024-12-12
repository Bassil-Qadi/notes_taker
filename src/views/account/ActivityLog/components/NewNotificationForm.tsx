import { useState, useEffect } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import Radio from '@/components/ui/Radio'
import { Field, Form, Formik, FieldProps } from 'formik'
import {
    useAppDispatch,
    toggleNewNotificationDialog,
    addSaloonNotification,
    addAllUsersNotification,
    addAllSaloonsNotification,
    getNotifications,
} from '../store'

import { getSaloonsList } from '@/views/project/ProjectList/store'

import * as Yup from 'yup'

type FormModel = {
    title: string
    message: string
    saloon?: {}
}

const validationSchema = Yup.object().shape({
    title: Yup.string().required('الرجاء إدحال الاسم'),
    message: Yup.string().required('الرجاء إدخال التفاصيل'),
})

const NewNotificationForm = () => {
    const dispatch = useAppDispatch()

    const [saloonsList, setSaloonsList] = useState([])
    const [notificationType, setNotificationType] = useState(
        'all_users_notification',
    )

    const onChange = (val: string) => {
        setNotificationType(val)
    }

    const onSubmit = (
        formValue: FormModel,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        setSubmitting(true)

        const { title, message, saloon } = formValue

        dispatch(toggleNewNotificationDialog(false))
        let responseData: any

        switch(notificationType) {
            case 'saloon_admin_notification':
                responseData = dispatch(
                    addSaloonNotification({
                        title,
                        message,
                        userId: saloon._id,
                    })
                )
                break
                case 'all_users_notification':
                    responseData = dispatch(
                        addAllUsersNotification({
                            title,
                            message,
                        })
                    )
                    break
                    case 'user_notification':
                        responseData = dispatch(
                            addAllSaloonsNotification({
                                title,
                                message,
                            })
                        )
                        break
        }

        responseData.then((data: any) => {
            if (data.payload.statusCode === 201) {
                toast.push(
                    <Notification title={'Successfully Sent'} type="success">
                        تم إرسال الإشعار بنجاح
                    </Notification>,
                )
                dispatch(getNotifications())
            }
        })
    }

    useEffect(() => {
        let responseData = dispatch(getSaloonsList())
        responseData.then((data: any) => {
            const updatedSaloons = data.payload.map((saloon: any) => {
                return {
                    ...saloon,
                    label: saloon.name,
                    value: saloon.name,
                }
            })
            setSaloonsList(updatedSaloons)
        })
    }, [])

    return (
        <Formik
            initialValues={{
                title: '',
                message: '',
                // saloon: '',
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
                                placeholder="ادخل عنوان الإشعار"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="الرسالة"
                            invalid={errors.message && touched.message}
                            errorMessage={errors.message}
                        >
                            <Field
                                textArea
                                type="text"
                                autoComplete="off"
                                name="message"
                                placeholder="ادخل محتوى الإشعار"
                                component={Input}
                            />
                        </FormItem>
                        {/* <FormItem label="قائمة الصالونات">
                            <Field name="saloon">
                                {({ field, form }: FieldProps) => {
                                    return (
                                        <Select
                                            isDisabled={
                                                notificationType !==
                                                'saloon_admin_notification'
                                            }
                                            placeholder="اختر الصالون"
                                            options={saloonsList}
                                            onChange={(option) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    option,
                                                )
                                            }}
                                        />
                                    )
                                }}
                            </Field>
                        </FormItem> */}
                        <div className="mb-4">
                            <Radio.Group
                                vertical
                                value={notificationType}
                                onChange={onChange}
                            >
                                <Radio value={'all_users_notification'}>
                                    إرسال لجميع المستخدمين
                                </Radio>
                                {/* <Radio value={'saloon_admin_notification'}>
                                    إرسال لصالون واحد فقط
                                </Radio>
                                <Radio value={'user_notification'}>
                                    إرسال لجميع الصالونات
                                </Radio> */}
                            </Radio.Group>
                        </div>
                        <Button block variant="solid" type="submit">
                            إرسال
                        </Button>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default NewNotificationForm
