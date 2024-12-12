import VerifyOtpForm from './VerifyOtpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-8">
                <h3>الرجاء إدخال الكود المرسل إلى جوالك</h3>
                {/* <h3 className="mb-1">تجربة استثنائية لإدارة احترافية في انتظارك</h3> */}
                {/* <p>مستعد لتجربة إدارة فريدة تزيد أرباحك ؟</p> */}
            </div>
            <VerifyOtpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
