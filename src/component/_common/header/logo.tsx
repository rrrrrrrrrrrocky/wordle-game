import { cn } from "@/script/util/ui-utils";

interface Props {
  className?: string;
}
const Logo = ({ className }: Props) => {
  return (
    <div className={cn("size-9 bg-logo bg-contain bg-no-repeat", className)} />
  );
};

export default Logo;
