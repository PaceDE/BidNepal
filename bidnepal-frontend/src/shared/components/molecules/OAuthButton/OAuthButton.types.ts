import { Blob } from "buffer";
import type { DetailedHTMLProps, ImgHTMLAttributes, SVGProps } from "react";

export interface OAuthButtonProps {
  provider: 'google' | 'facebook' | 'yahoo';
  icon: string
  onClick?: () => void;
}