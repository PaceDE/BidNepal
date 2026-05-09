import OAuthButton from "@/shared/components/molecules/OAuthButton/OAuthButton.component";
import RegisterForm from "../components/RegisterForm";
import Text from "@/shared/components/atoms/Text";
import Divider from "@/shared/components/atoms/Divider";
import LoginForm from "../components/LoginForm";

const LoginTemplate = () => {
  return (
    <section className="flex justify-center px-5 py-16 md:px-16">
      <div className="bg-card w-[90vw] max-w-125 rounded-xl py-8 px-6">
        <div className="mb-4">
          <Text variant="heading">Welcome Back</Text>
          <Text variant="muted">Sign in to your BidNepal account</Text>
        </div>

        <div className="my-6">
          <OAuthButton provider="google" icon="/icons/google-icon.svg" />
        </div>


        <div className="flex my-6 items-center gap-2">
          <Divider />
          <Text variant="muted" className="text-sm">or</Text>
          <Divider />
        </div>

        <LoginForm />

      </div>
    </section>
  )
}

export default LoginTemplate;