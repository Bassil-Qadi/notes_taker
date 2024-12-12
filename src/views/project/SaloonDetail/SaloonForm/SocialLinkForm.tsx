import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { BsFacebook, BsTwitter, BsPinterest, BsLinkedin, BsSnapchat, BsTiktok, BsInstagram } from 'react-icons/bs'
import { Field, FormikErrors, FormikTouched } from 'formik'

type FormFieldsName = {
    facebook: string
    snapchat: string
    tiktok: string
    instagram: string
}

type SocialLinkFormProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const SocialLinkForm = (props: SocialLinkFormProps) => {
    const { touched, errors } = props

    return (
        <>
            <FormItem
                label="رابط الفيسبوك"
                invalid={errors.facebook && touched.facebook}
                errorMessage={errors.facebook}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="facebook"
                    placeholder="URL"
                    component={Input}
                    prefix={<BsFacebook className="text-xl text-[#1773ea]" />}
                />
            </FormItem>
            <FormItem
                label="رابط السناب شات"
                invalid={errors.snapchat && touched.snapchat}
                errorMessage={errors.snapchat}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="snapchat"
                    placeholder="URL"
                    component={Input}
                    prefix={<BsSnapchat className="text-xl text-[#fde047]" />}
                />
            </FormItem>
            <FormItem
                label="رابط التيك توك"
                invalid={errors.tiktok && touched.tiktok}
                errorMessage={errors.tiktok}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="tiktok"
                    placeholder="URL"
                    component={Input}
                    prefix={<BsTiktok className="text-xl text-[#c026d3]" />}
                />
            </FormItem>
            <FormItem
                label="رابط الانستجرام"
                invalid={errors.instagram && touched.instagram}
                errorMessage={errors.instagram}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="instagram"
                    placeholder="URL"
                    component={Input}
                    prefix={<BsInstagram className="text-xl text-[#ec4899]" />}
                />
            </FormItem>
        </>
    )
}

export default SocialLinkForm
