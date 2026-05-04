
export const getVerifyEmailTemplate = (verificationUrl: string, expiryTime: number): string => {
    const logoUrl = "https://res.cloudinary.com/dzcmadjlq/image/upload/v1700000000/verify-email-logo.png";
    return `
    <div style="font-family: Arial, sans-serif; background:#f6f6f6; padding:20px;">
        
        <div style="margin:auto; background:white; padding:24px; border-radius:10px; text-align:center;">
            <!-- Logo -->
            <img 
                src="${logoUrl}" 
                alt="Logo" 
                style="width:120px;"
            />
            <h2>Verify your account</h2>
            <p>Thanks for signing up! Please verify your email address.</p>

            <a href="${verificationUrl}"
               style="
                display: inline-block;
                    margin-top:20px;
                    padding:12px 24px;
                    background:#4CAF50;
                    color:white;
                    text-decoration:none;
                    border-radius:6px;
                    font-weight:bold;
               ">
                Verify Email
            </a>

            <p style="font-size:12px; color:gray;">
                This link will expire in ${expiryTime} minutes.
            </p>

        </div>
    </div>
    `

}