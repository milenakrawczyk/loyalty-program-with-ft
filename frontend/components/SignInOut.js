import SignOutButton from './SignOutButton';
import SignIn from './SignIn';

const SignInOut = ({ isSignedIn, wallet }) => {
  return (
    <>
      {isSignedIn ? (
        <SignOutButton className="btn btn-primary" accountId={wallet.accountId} onClick={() => wallet.signOut()} />
      ) : (
        <SignIn wallet={wallet} />
      )}
    </>
  );
};

export default SignInOut;
