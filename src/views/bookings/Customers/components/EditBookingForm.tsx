import { useState, useEffect } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import dayjs from 'dayjs'
import {
    Field,
    Form,
    Formik,
    FieldProps,
} from 'formik'
import {
    useAppDispatch,
    useAppSelector,
    putBooking,
    getBookings
} from '../store'

import { getSaloonServices } from '@/views/project/CategoryList/store'

import * as Yup from 'yup'

type FormModel = {
    bookingTime: string
    serviceIds: []
}

const validationSchema = Yup.object().shape({
    bookingTime: Yup.string().required('الرجاء إدحال وقت الخدمة'),
    serviceIds: Yup.string().required('الرجاء اختيار الخدمات'),
})

const EditBookingForm = ({ setEditDialogOpen }: any) => {
    const dispatch = useAppDispatch()

    const selectedBooking = useAppSelector(
        (state) => state.bookings.data.selectedBooking,
    )

    const selectedSaloonId = useAppSelector(
        state => state.bookings.data.filterData.selectedSaloon
    )

    const [services, setServices] = useState([])

    const onSubmit = (
        formValue: FormModel,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        setSubmitting(true)

        const { bookingTime, serviceIds } =
            formValue

        let newServices = serviceIds?.map((service: any) => service._id)

        let responseData = dispatch(putBooking({ bookingTime, serviceIds: newServices, saloonId: selectedSaloonId, userId: selectedBooking.userId, bookingId: selectedBooking._id }))
        responseData.then((data) => {
            if (data.payload) {
                toast.push(
                    <Notification title={'Successfully Modified'} type="success">
                        تم تعديل تفاصيل الحجز بنجاح
                    </Notification>,
                )
                dispatch(getBookings({ saloonId: selectedSaloonId }))
                setEditDialogOpen(false)
            }
        })
    }

    useEffect(() => {
        const updatedServices = selectedBooking?.serviceIds?.map((service: any) => {
            return {
                ...service,
                label: service.name,
                value: service.name,
            }
        })
        setServices(updatedServices)
    }, [selectedBooking])

    return (
        <Formik
            initialValues={{
                bookingTime: dayjs(selectedBooking.bookingTime).format('YYYY-MM-DD') || '',
                serviceIds: selectedBooking.serviceIds || services,
            }}
            // validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values, setSubmitting)
            }}
        >
            {({ touched, errors, values }) => (
                <Form>
                    <FormContainer>
                        <FormItem
                            label="وقت الحجز"
                            invalid={errors.bookingTime && touched.bookingTime}
                            errorMessage={errors.bookingTime}
                        >
                            <Field
                                type="date"
                                autoComplete="off"
                                name="bookingTime"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem label="الخدمات">
                            <Field name="serviceIds">
                                {({ field, form }: FieldProps) => {
                                    let newValue = field?.value?.map((service: any) => {
                                        return { label: service.name, ...service }
                                    })
                                    return (
                                        <Select
                                            isMulti
                                            placeholder="اختر الخدمات"
                                            options={services}
                                            defaultValue={newValue}
                                            onChange={(options) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    options,
                                                )
                                            }
                                        />
                                    )
                                }}
                            </Field>
                        </FormItem>
                        <Button block variant="solid" type="submit">
                            حفظ
                        </Button>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default EditBookingForm
