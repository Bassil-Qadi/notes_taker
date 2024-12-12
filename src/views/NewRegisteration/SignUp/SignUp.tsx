import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">تجربة استثنائية لإدارة احترافية في انتظارك</h3>
                <p>مستعد لتجربة إدارة فريدة تزيد أرباحك ؟</p>
            </div>
            <SignUpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
