import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'universal-cookie'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'
import { useAppSelector } from '@/store'

interface VerifyOtpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type VerifyOtpFormSchema = {
    otp: string
}

const validationSchema = Yup.object().shape({
    otp: Yup.string().required('الرجاء إدخال الكود المرسل إلى جوالك')
})

const VerifyOtpForm = (props: VerifyOtpFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props
    const cookies = new Cookies(null, { path: '/' });
    // let userPhone = useAppSelector(
    //     state => state.auth.user.phone
    // )

    const { verifyForgotPasswordOtp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const onSignUp = async (
        values: VerifyOtpFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { otp } = values
        setSubmitting(true)
        const result = await verifyForgotPasswordOtp({ otp, phone: cookies.get('phone') })

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
                    otp: '',
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
                                label="رمز التأكيد"
                                invalid={errors.otp && touched.otp}
                                errorMessage={errors.otp}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="otp"
                                    placeholder="ادخل الرمز"
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
                                    ? 'جارٍ التأكد'
                                    : 'تأكيد الحساب'}
                            </Button>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default VerifyOtpForm
