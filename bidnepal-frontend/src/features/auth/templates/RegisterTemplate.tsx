"use client"

import OAuthButton from "@/shared/components/molecules/OAuthButton/OAuthButton.component";
import RegisterForm from "../components/RegisterForm";
import Text from "@/shared/components/atoms/Text";
import GoogleIcon from "@/assets/google-icon.svg"
import Divider from "@/shared/components/atoms/Divider";
import { useRef } from "react";

const RegisterTemplate = () => {
   const authLockRef = useRef(false);

   const onGoogleLogin = () => {
    if(authLockRef.current)
      return;

    authLockRef.current = true
    window.location.href = "http://localhost:5000/api/auth/google"
  }

  return (
    <section className="flex justify-center px-5 py-16 md:px-16">
      <div className="bg-card w-[90vw] max-w-150 rounded-xl py-8 px-6">
        <div className="mb-4">
          <Text variant="heading">Create account</Text>
          <Text variant="muted">Join thousands of bidders on BidNepal</Text>
        </div>

        <div className="my-6">
          <OAuthButton onClick={onGoogleLogin} lock={authLockRef.current} provider="google" icon="/icons/google-icon.svg" />
        </div>

        <div className="flex my-6 items-center gap-2">
          <Divider />
          <Text variant="muted" className="text-sm">or</Text>
          <Divider />
        </div>

        <RegisterForm authLockRef={authLockRef}/>

      </div>
    </section>
  )
}

export default RegisterTemplate;