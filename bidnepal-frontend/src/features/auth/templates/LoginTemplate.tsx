"use client"

import OAuthButton from "@/shared/components/ui/molecules/OAuthButton/OAuthButton.component";
import RegisterForm from "../components/RegisterForm";
import Text from "@/shared/components/ui/atoms/Text/Text.component";
import Divider from "@/shared/components/ui/atoms/Divider/Divider.component";
import LoginForm from "../components/LoginForm";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { showNotification } from "@/features/toast/toast.thunk";

const LoginTemplate = () => {
  const authLockRef = useRef(false);
  const dispatch = useAppDispatch();
  const router= useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const reason = searchParams.get('reason');
  const redirect = searchParams.get('next') || '/';

  const onGoogleLogin = () => {
    if(authLockRef.current)
      return;

    authLockRef.current = true
    window.location.href = `http://localhost:5000/api/auth/google?redirect=${redirect}`
  }

   useEffect(() => {
          if(!reason) return;
          
          if (reason === 'logged_out')
              dispatch(showNotification({type: 'success',message: 'Logged Out Succesfully'}));
          else if (reason === 'login_required')
              dispatch(showNotification({type: 'info',message: 'Please login to continue'}));
          else if (reason === 'session_expired')
              dispatch(showNotification({type: 'info', message: 'Your session has expired. Please login again'}));
          
          else if(reason === 'registration_complete')
              dispatch(showNotification({ type: "success", message: "Registered Succesfully, You can now log in with email or Google." }))

          params.delete('reason');
          router.replace(`/login?${params.toString()}`);
      }, [reason,params,dispatch,router])
  

  return (
    <section className="flex justify-center px-5 py-16 md:px-16">
      <div className="bg-card w-[90vw] max-w-125 rounded-xl py-8 px-6">
        <div className="mb-4">
          <Text variant="heading">Welcome Back</Text>
          <Text variant="muted">Sign in to your BidNepal account</Text>
        </div>

        <div className="my-6">
          <OAuthButton onClick={onGoogleLogin} lock={authLockRef.current} provider="google" icon="/icons/google-icon.svg" />
        </div>

        <div className="flex my-6 items-center gap-2">
          <Divider />
          <Text variant="muted" className="text-sm">or</Text>
          <Divider />
        </div>

        <LoginForm authLockRef={authLockRef} />

      </div>
    </section>
  )
}

export default LoginTemplate;