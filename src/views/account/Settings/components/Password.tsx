import classNames from 'classnames'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import isLastChild from '@/utils/isLastChild'
import { apiResetPassword } from '@/services/AuthService'
import {
    HiOutlineDesktopComputer,
    HiOutlineDeviceMobile,
    HiOutlineDeviceTablet,
} from 'react-icons/hi'
import dayjs from 'dayjs'
import * as Yup from 'yup'
import { useAppSelector } from '@/store'

type LoginHistory = {
    type: string
    deviceName: string
    time: number
    location: string
}

type PasswordFormModel = {
    password: string
    newPassword: string
    confirmNewPassword: string
}

const LoginHistoryIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'Desktop':
            return <HiOutlineDesktopComputer />
        case 'Mobile':
            return <HiOutlineDeviceMobile />
        case 'Tablet':
            return <HiOutlineDeviceTablet />
        default:
            return <HiOutlineDesktopComputer />
    }
}

const validationSchema = Yup.object().shape({
    password: Yup.string().required('كلمة المرور مطلوبة'),
    newPassword: Yup.string()
        .required('ادخل كلمة المرور الجديدة'),
    confirmNewPassword: Yup.string().oneOf(
        [Yup.ref('newPassword'), ''],
        'الكلمات غير متطابقة'
    ),
})

const Password = ({ data }: { data?: LoginHistory[] }) => {

    const userId = useAppSelector(
        state => state.auth.user.id
    )

    const onFormSubmit = async (
        values: PasswordFormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        let { password, confirmNewPassword } = values
        try {
            let resp = await apiResetPassword({ password: password, confirmPassword: confirmNewPassword, userId })
            if(resp.data) {
                setSubmitting(false)
                toast.push(<Notification title={'Password updated'} type="success" />, {
                    placement: 'top-center',
                })
            }
        } catch(errors) {
            setSubmitting(false)
        }
        // console.log('values', values)
    }

    return (
        <>
            <Formik
                initialValues={{
                    password: '',
                    newPassword: '',
                    confirmNewPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onFormSubmit(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ touched, errors, isSubmitting, resetForm }) => {
                    const validatorProps = { touched, errors }
                    return (
                        <Form>
                            <FormContainer>
                                <FormDesription
                                    title="كلمة المرور"
                                    desc="أدخل كلمة المرور الحالية والجديدة لإعادة تعيين كلمة المرور الخاصة بك"
                                />
                                <FormRow
                                    name="password"
                                    label="كلمة المرور الحالية"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="password"
                                        autoComplete="off"
                                        name="password"
                                        placeholder="أدخل كلمة المرور الحالية"
                                        component={Input}
                                    />
                                </FormRow>
                                <FormRow
                                    name="newPassword"
                                    label="كلمة المرور الجديدة"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="password"
                                        autoComplete="off"
                                        name="newPassword"
                                        placeholder="أدخل كلمة المرور الجديدة"
                                        component={Input}
                                    />
                                </FormRow>
                                <FormRow
                                    name="confirmNewPassword"
                                    label="تأكيد كلمة المرور"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="password"
                                        autoComplete="off"
                                        name="confirmNewPassword"
                                        placeholder="تأكيد كلمة المرور"
                                        component={Input}
                                    />
                                </FormRow>
                                <div className="mt-4 ltr:text-right">
                                    <Button
                                        variant="solid"
                                        loading={isSubmitting}
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? 'جاري التحديث...'
                                            : 'تحديث كلمة المرور'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
            {/* <div className="mt-6">
                <FormDesription
                    title="Where you're signed in"
                    desc="You're signed in to your account on these devices."
                />
                {data && (
                    <div className="rounded-lg border border-gray-200 dark:border-gray-600 mt-6">
                        {data.map((log, index) => (
                            <div
                                key={log.deviceName}
                                className={classNames(
                                    'flex items-center px-4 py-6',
                                    !isLastChild(data, index) &&
                                        'border-b border-gray-200 dark:border-gray-600'
                                )}
                            >
                                <div className="flex items-center">
                                    <div className="text-3xl">
                                        <LoginHistoryIcon type={log.type} />
                                    </div>
                                    <div className="ml-3 rtl:mr-3">
                                        <div className="flex items-center">
                                            <div className="text-gray-900 dark:text-gray-100 font-semibold">
                                                {log.deviceName}
                                            </div>
                                            {index === 0 && (
                                                <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 rounded-md border-0 mx-2">
                                                    <span className="capitalize">
                                                        {' '}
                                                        Current{' '}
                                                    </span>
                                                </Tag>
                                            )}
                                        </div>
                                        <span>
                                            {log.location} •{' '}
                                            {dayjs
                                                .unix(log.time)
                                                .format('DD-MMM-YYYY, hh:mm A')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div> */}
        </>
    )
}

export default Password
