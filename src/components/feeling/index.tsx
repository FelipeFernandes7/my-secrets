import { FeelingBtn } from "./styles";

interface FeelingProps {
  isFeelingEnabled: boolean;
  background: string;
  description: string;
  feelingState: () => void;
}
export function Feeling({
  isFeelingEnabled,
  description,
  background,
  feelingState,
}: FeelingProps) {
  return (
    <FeelingBtn
      onClick={feelingState}
      style={{
        background: isFeelingEnabled ? background : "transparent",
      }}
      type="button"
    >
      {description}
    </FeelingBtn>
  );
}
