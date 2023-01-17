const SignIn = ({ wallet }) => {
  return (
    <button className="btn btn-primary" onClick={() => wallet.signIn()}>
      Sign in with NEAR
    </button>
  );
};

export default SignIn;
