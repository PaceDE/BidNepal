"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "@/shared/components/ui/atoms/Button";
import TextButton from "@/shared/components/ui/atoms/TextButton";
import Text from "@/shared/components/ui/atoms/Text";
import { Blob } from "buffer";
import Cropper from "react-easy-crop";
import { motion, useMotionValue } from "motion/react";
import { cropImage } from "@/shared/utils/cropImage";
import { showNotification } from "@/features/toast/toast.thunk";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import ProfileImageContainer from "../components/ProfileImageContainer";
import FileUploadBox from "../components/FileUploadBox";
import { useCompleteProfile } from "../api/user.hooks";

const ProfileAddTemplate = () => {

    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.auth.user);
    console.log("test", user?.firstLogin);
    const [image, setImage] = useState<string | null>(null);
    const [zoom, setZoom] = useState(1);
    const { mutate: completeProfile, isPending: isCompletingProfile } = useCompleteProfile();

    const containerRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleSkip = () => {
        completeProfile(undefined);
    };

    const handleUpload = async () => {
        if (!image) return;
        const file = await cropImage(image, containerRef, zoom, x.get(), y.get());
        if (!file) {
            dispatch(showNotification({ message: "Something went wrong while processing the image. Please try again.", type: "error" }))
            return
        }
        const formdata = new FormData();
        formdata.append("image", file);
        completeProfile(formdata);
    };
    const handleRemove = () => {
        setImage(null);
    };

    return (
        <section className="flex gap-2 relative px-5 py-16 md:px-16 min-h-screen">

            <div className="absolute left-1/2 -translate-x-1/2 bg-card w-full max-w-md rounded-4xl py-12 px-8 shadow-sm border border-border-secondary">
                <div className="space-y-6 text-center">
                    {/* Header */}
                    <div>
                        <Text variant="heading" className="text-2xl">
                            Add Your Profile
                        </Text>
                        <Text variant="muted" className="mt-2">
                            Upload a profile photo to personalize your account
                        </Text>
                    </div>

                    {/* Avatar Upload Area */}
                    <div className="bg-surface rounded-3xl border-2 border-dashed border-border-secondary cursor-pointer hover:bg-bg transition-colors">
                        {image ? (
                            <ProfileImageContainer containerRef={containerRef} zoom={zoom} setZoom={setZoom} image={image} x={x} y={y} />

                        ) : (
                            <FileUploadBox setImage={setImage} />
                        )}


                    </div>
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 pt-4">
                        {image && (
                            <div className="flex flex-col gap-3">
                                <Button
                                    onClick={handleUpload}
                                    className="w-full py-3 rounded-2xl font-medium"
                                    disabled={isCompletingProfile}
                                >
                                    {isCompletingProfile ? "Uploading..." : "Upload Profile"}
                                </Button>
                                <Button
                                    onClick={handleRemove}
                                    className="w-full py-3 rounded-2xl font-medium"
                                    disabled={isCompletingProfile}
                                >
                                    {isCompletingProfile ? "..." : "Remove Photo"}
                                </Button>
                            </div>
                        )}
                        <TextButton
                            onClick={handleSkip}
                            color="muted"
                            className="w-full py-3 rounded-2xl"
                            disabled={isCompletingProfile}
                        >
                            {isCompletingProfile ? "Please wait..." : "Skip for now"}
                        </TextButton>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ProfileAddTemplate;
