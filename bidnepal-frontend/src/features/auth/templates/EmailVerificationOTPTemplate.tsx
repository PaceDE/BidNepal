"use client";

import Otp from "@/shared/components/ui/molecules/Otp/Otp.component";
import TextButton from "@/shared/components/ui/atoms/TextButton/TextButton.component";
import { useEffect, useRef, useState } from "react";
import Button from "@/shared/components/ui/atoms/Button/Button.component";
import Text from "@/shared/components/ui/atoms/Text/Text.component";
import {
    useSendEmailVerificationOtp,
    useVerifyEmailOtp,
} from "../api/auth.hooks";
import { emailOTPSchema } from "../validations/emailOtpSchema";
import ErrorPage from "@/shared/components/ui/organisms/ErrorPage/ErrorPage.component";
import { formatTime } from "@/shared/utils/time";
import useTimer from "@/shared/hooks/useTimer";

const EmailVerificationOTPTemplate = ({
    length = 8,
}: {
    length?: number;
}) => {
    const { mutateAsync: sendOtp, isPending: isSending, isError, } = useSendEmailVerificationOtp();
    const hasInitialized = useRef(false);

    const { mutate: submitOtp, isPending: isSubmitting, } = useVerifyEmailOtp();

    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

    const [validationError, setValidationError] = useState<any | null>(null);

    const [expiresAt, setExpiresAt] = useState<number | null>(null);

    const remainingTime = useTimer(expiresAt);
    console.log(isSending);


    useEffect(() => {
        const sendInitialOtp = async () => {
            try {
                const data = await sendOtp();
                if (data?.expiresIn) {
                    setExpiresAt(Date.now() + data.expiresIn * 60 * 1000);
                }
            } catch { }
        };
        sendInitialOtp();
    }, []);

    const handleSubmit = () => {
        setValidationError(null);

        const otpValue = otp.join("");

        const validation = emailOTPSchema.safeParse(otpValue);

        if (!validation.success) {
            setValidationError(validation.error.issues[0].message);
            return;
        }

        submitOtp(otpValue);
    };

    const handleResend = async () => {
        try {
            const data = await sendOtp();

            // if (data?.expiresIn) {
            //     setExpiresAt(Date.now() + data.expiresIn * 60 * 1000);
            // }
        } catch (error) {
            setExpiresAt(null);
        }
    };

    if (isError) {
        return (
            <ErrorPage
                title="Unable to send verification code"
                message="Please try again later."
                primaryAction={{
                    label: "Retry",
                    onClick: handleResend,
                }}
                secondaryAction={{
                    label: "Back to home",
                    href: "/",
                }}
            />
        );
    }

    return (
        <div className="mt-8 flex flex-col justify-center items-center gap-6 text-center">
            <div className="max-w-md rounded-3xl bg-card p-6 shadow-sm border border-border-secondary">
                <p className="text-sm font-medium text-secondary mb-2">
                    Email verification
                </p>

                <h2 className="text-primary text-xl font-semibold mb-3">
                    Check your email
                </h2>

                <p className="text-secondary text-sm leading-6">
                    A one-time verification code has been sent to your email address. Please check your inbox and enter the code below to complete verification.
                </p>

                <div className="mt-6 flex flex-col justify-center">
                    <Otp
                        otp={otp}
                        setOtp={setOtp}
                        length={length}
                    />

                    {validationError && (
                        <Text variant="error" className="mt-2">
                            {validationError}
                        </Text>
                    )}
                </div>

                <div className="flex flex-col gap-3 mt-3">
                    <div>
                        <Text variant="muted" component="span">
                            Didn't receive an email?{" "}
                        </Text>

                        <TextButton
                            onClick={handleResend}
                            disabled={isSending}
                            color="theme"
                            className="text-sm disabled:text-gray-500"
                        >
                            {isSending ? "Resending..." : "Resend"}
                        </TextButton>

                        {expiresAt && (
                            <Text variant="muted">
                                {remainingTime <= 0 ? " Expired " : (
                                    `Expires in ${formatTime(remainingTime)}`
                                )}
                            </Text>
                        )}
                    </div>

                    <div>
                        <Button
                            onClick={handleSubmit}
                            type="submit"
                            disabled={isSending || isSubmitting}
                            className="text-sm font-semibold disabled:bg-gray-300"
                        >
                            {isSubmitting ? "Verifying..." : "Submit code"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationOTPTemplate;