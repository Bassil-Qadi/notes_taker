import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">أهلاً بعودتك!</h3>
                <p>يرجى إدخال بياناتك لتسجيل الدخول</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
