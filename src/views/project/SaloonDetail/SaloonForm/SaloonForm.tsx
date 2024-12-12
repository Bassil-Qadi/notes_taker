import { forwardRef } from 'react'
import Tabs from '@/components/ui/Tabs'
import { FormContainer } from '@/components/ui/Form'
import { Form, Formik, FormikProps } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import SocialLinkForm from './SocialLinkForm'

type BaseSaloonInfo = {
    name: string
    logo: string
    address: string
    categories: []
    phone: string
    facebook: string
    snapchat: string
    tiktok: string
    instagram: string
}

export type Saloon = BaseSaloonInfo 

export type FormModel = Saloon

export type FormikRef = FormikProps<FormModel>

export type SaloonProps = Partial<
BaseSaloonInfo 
>

type SaloonFormProps = {
    saloon: SaloonProps,
    onFormSubmit: (values: FormModel) => void
}

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    // email: Yup.string().email('Invalid email').required('Email Required'),
    name: Yup.string().required('User Name Required'),
    // logo: Yup.string(),
    address: Yup.string()
    // phone: Yup.string().matches(
    //     /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
    //     'Phone number is not valid'
    // ),
    // role: Yup.string().required("Role is Required"),
})

const { TabNav, TabList, TabContent } = Tabs

const SaloonForm = forwardRef<FormikRef, SaloonFormProps>((props, ref) => {
    const { saloon, onFormSubmit } = props

    return (
        <Formik<FormModel>
            innerRef={ref}
            initialValues={{
                name: saloon.name || '',
                logo: saloon.logo || '',
                address: saloon.address || '',
                phone: saloon.phone || '',
                categories: saloon.categories || [],
                facebook: saloon.facebook || '',
                snapchat: saloon.snapchat || '',
                tiktok: saloon.tiktok || '',
                instagram: saloon.instagram || ''

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
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                    المعلومات الشخصية
                                </TabNav>
                                <TabNav value="social">التواصل الاجتماعي</TabNav>
                            </TabList>
                            <div className="p-6">
                                <TabContent value="personalInfo">
                                    <PersonalInfoForm
                                        touched={touched}
                                        errors={errors}
                                    />
                                </TabContent>
                                <TabContent value="social">
                                    <SocialLinkForm
                                        touched={touched}
                                        errors={errors}
                                    />
                                </TabContent>
                            </div>
                        </Tabs>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

SaloonForm.displayName = 'SaloonForm'

export default SaloonForm
