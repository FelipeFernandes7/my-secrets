import Lottie, { LottieRefCurrentProps } from "lottie-react";
import loading from "../../lotties/loading.json";
import { HTMLAttributes, useRef } from "react";

interface SpinnerProps extends HTMLAttributes<HTMLElement> {}

export function Spinner({ ...rest }: SpinnerProps) {
  const iconRef = useRef<LottieRefCurrentProps | null>(null);
  return (
    <Lottie
      lottieRef={iconRef}
      {...rest}
      animationData={loading}
      loop={true}
      autoplay={true}
    />
  );
}
