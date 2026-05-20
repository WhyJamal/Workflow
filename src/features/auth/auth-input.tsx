import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface AuthInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  hasIcon?: boolean;
}

export default function AuthInput<T extends FieldValues>({
  register,
  name,
  placeholder,
  type = "text",
  autoComplete,
  hasIcon = false,
}: AuthInputProps<T>) {
  return (
    <Input
      {...register(name)}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={`
        w-full pr-4 py-6 border border-gray-300 dark:border-zinc-700 dark:bg-input/30 dark:text-zinc-50 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14a800] focus:border-transparent transition
        ${hasIcon ? "pl-10" : "pl-5"}
      `}
    />
  );
}