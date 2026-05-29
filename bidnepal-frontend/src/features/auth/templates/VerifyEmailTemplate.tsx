"use client";

import { useState } from "react";
import { getVerificationSessionResponse } from "../auth.types";
import { useResendEmailVerification } from "../api/auth.hooks";
import { showNotification } from "@/features/toast/toast.thunk";
import { useAppDispatch } from "@/redux/hook";

export default function VerifyEmailTemplate({
  data,
}: {
  data: getVerificationSessionResponse;
}) {
  const { mutateAsync,isPending } = useResendEmailVerification();
  const dispatch = useAppDispatch();

  const handleSendEmail = async () => {
    await mutateAsync();

    dispatch(showNotification({
      type: 'success',
      message: 'Verification email resent successfully!'
    }));
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
        
        {/* Title */}
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Verify Your Email
        </h1>

        {/* Subtitle */}
        <p className="mb-6 text-center text-gray-600">
          We've sent a verification link to
        </p>

        {/* Email */}
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-[#D85A30] border border-orange-100">
            {data?.email}
          </span>
        </div>

        {/* Info */}
        <p className="mb-6 text-center text-sm text-gray-500">
          Didn't receive the email? Check your spam folder or resend it below.
        </p>

        {/* Button */}
        <button
          onClick={handleSendEmail}
          disabled={isPending}
          className="w-full rounded-xl bg-[#D85A30] py-3 text-white font-semibold transition-all hover:bg-[#c44f27] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Sending..." : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
}