import { useState, useEffect } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Field, Form, Formik, FieldProps } from 'formik'
import { getSaloonsList } from '../../ProjectList/store'
import {
    // putProject,
    addCategory,
    getCategoryList,
    useAppDispatch,
    useAppSelector,
} from '../store'
import { toggleNewCategoryDialog } from '../../SaloonDetail/store'
import * as Yup from 'yup'

type FormModel = {
    name: string
}

const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').required('الرجاء إدحال الاسم'),
    // description: Yup.string().required('الرجاء إدخال التفاصيل')
})

const NewCategoryForm = ({ saloonId, fetchData }: any) => {
    const dispatch = useAppDispatch()

    // const [saloonsList, setSaloonsList] = useState([])
    const currentUserId = useAppSelector((state) => state.auth.user.id)

    // useEffect(() => {
    //     fetchSaloonsList()
    // }, [])

    // const fetchSaloonsList = async () => {
    //     let response = dispatch(getSaloonsList())
    //     response.then(data => {
    //         const updatedSaloons = data.payload.filter((saloon: any) => saloon?.createdBy?.id === currentUserId).map((saloon: any) => {
    //             return {
    //                 ...saloon,
    //                 label: saloon.name,
    //                 value: saloon.name,
    //             }
    //         })
    //         setSaloonsList(updatedSaloons)
    //     })
    // }

    const onSubmit = (
        formValue: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)

        const { name } = formValue

        let response = dispatch(addCategory({ name, createdBy: currentUserId, saloonId }))
        response.then(data => {
            if(data.payload.responseType === 'Success') {
                dispatch(toggleNewCategoryDialog(false))
                fetchData()
            }
        })
       
    }

    return (
        <Formik
            initialValues={{
                name: '',
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
                            label="الاسم"
                            invalid={errors.name && touched.name}
                            errorMessage={errors.name}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="name"
                                placeholder="ادخل اسم الصنف"
                                component={Input}
                            />
                        </FormItem>
                        <Button block variant="solid" type="submit">
                            إرسال
                        </Button>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default NewCategoryForm
