import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'
import { getToken, messaging } from '@/configs/firebase'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type SignUpFormSchema = {
    name: string
    password: string
    email: string
    phone: string
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your user name'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password')],
        'Your passwords do not match',
    ),
    phone: Yup.string().required('Please enter your phone number'),
})

const SignUpForm = (props: SignUpFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const onSignUp = async (
        values: SignUpFormSchema,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        let fcmToken
        const { name, password, email, phone } = values
        setSubmitting(true)

        // Generate FCM Token
        getToken(messaging, {
            vapidKey:
                'BHL8HjzpfV7yxr0uUrIfQo-CZGBOSO_gvI1sBE45npBZk3fZkeG0h5yk711TYekiEWaIQ3IOq_eGp2L7FMDWF1E',
        })
            .then((currentToken) => {
                if (currentToken) {
                    fcmToken = currentToken
                } else {
                    console.log(
                        'No registration token available. Request permission to generate one.',
                    )
                }
            })
            .catch((err) => {
                console.log('An error occurred while retrieving token. ', err)
            })

        const result = await signUp({ name, password, email, phone, fcmToken })

        if (result?.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    name: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    phone: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="اسم المستخدم"
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="اسم المستخدم"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="البريد الإلكتروني"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="البريد الإلكتروني"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="كلمة المرور"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="كلمة المرور"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <FormItem
                                label="تأكيد كلمةالمرور"
                                invalid={
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                }
                                errorMessage={errors.confirmPassword}
                            >
                                <Field
                                    autoComplete="off"
                                    name="confirmPassword"
                                    placeholder="تأكيد كلمةالمرور"
                                    component={PasswordInput}
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
                                    placeholder="رقم الجوال"
                                    component={Input}
                                />
                            </FormItem>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'جارٍ إنشاء الحساب'
                                    : 'إنشاء الحساب'}
                            </Button>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
