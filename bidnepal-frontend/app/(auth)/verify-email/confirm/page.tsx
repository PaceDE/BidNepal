import { authApi } from '@/features/auth/api/auth.api.server';
import EmailVerificationTemplate from '@/features/auth/templates/EmailVerificationTemplate';
import { ApiError } from '@/shared/lib/api/error';
import { redirect } from 'next/navigation'

export const dynamic = "force-dynamic"; 

const page = async ({ searchParams }: { searchParams: Promise<{ token?: string }> }) => {
    const {token} = await searchParams;

    if (!token)
        redirect('/login');

    try {
        await authApi.verifyEmailConfirmation(token);
        return <EmailVerificationTemplate success={true} />
    

    } catch (error) {
        const isApiError = error instanceof ApiError;
        const message = isApiError ? error.message : undefined;
        
        return <EmailVerificationTemplate success={false} message={isApiError ? message : undefined} />
        
    }
}

export default page
