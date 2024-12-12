import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">إنشاء حساب</h3>
                <p>ودعنا نبدأ مع النسخة التجريبية المجانية الخاصة بك</p>
            </div>
            <SignUpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
