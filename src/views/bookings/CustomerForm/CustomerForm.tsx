import { forwardRef } from 'react'
import Tabs from '@/components/ui/Tabs'
import { FormContainer } from '@/components/ui/Form'
import { Form, Formik, FormikProps } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import SocialLinkForm from './SocialLinkForm'
import {
    // setCustomerList,
    setUsersList,
    CreateUser,
    setCreateDrawerClose,
    useAppDispatch,
    useAppSelector,
    User
} from '../Customers/store'

type BaseCustomerInfo = {
    name: string
    job: string
    image: string,
}

export type Customer = BaseCustomerInfo 

export type FormModel = Customer

export type FormikRef = FormikProps<FormModel>

export type CustomerProps = Partial<
    BaseCustomerInfo 
>

type CustomerFormProps = {
    action?: string
    customer: CustomerProps,
    onFormSubmit: (values: FormModel) => void
}

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    name: Yup.string().required('يرجى إدخال الاسم'),
    job: Yup.string().required('يرجى إدخال الوظيفة'),
    image: Yup.string(),
})

const { TabNav, TabList, TabContent } = Tabs

const CustomerForm = forwardRef<FormikRef, CustomerFormProps>((props, ref) => {
    const { action, customer, onFormSubmit } = props
    const dispatch = useAppDispatch()

    const currentUserId = useAppSelector(
        state => state.auth.user.id
    )

    const selectedSaloon = useAppSelector(
        state => state.crmCustomers.data.filterData.selectedSaloon
    )

    const data = useAppSelector((state) => state.crmCustomers.data.usersList)

    return (
        <Formik<FormModel>
            innerRef={ref}
            initialValues={{
                name: customer.name || '',
                job: customer.job || '',
                image: customer.image || '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values)
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
                                {/* <TabNav value="social">التواصل الاجتماعي</TabNav> */}
                            </TabList>
                            <div className="p-6">
                                <TabContent value="personalInfo">
                                    <PersonalInfoForm
                                        mode={action}
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

CustomerForm.displayName = 'CustomerForm'

export default CustomerForm
