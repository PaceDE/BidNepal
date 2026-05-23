import { authApi } from "@/features/auth/api/auth.api.server";
import VerifyEmailTemplate from "@/features/auth/templates/VerifyEmailTemplate";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage(){
  const cookieStore = await cookies();
  const token = cookieStore.get("_bn_pendingverification")?.value;
  if(!token)
    return redirect("/login")
  
  const data = await authApi.getVerificationSession();
    
    return (
        <VerifyEmailTemplate data={data} />
    );
}