import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { ClassNameValue } from "tailwind-merge";
import { Label } from "../ui/label";
import ErrorMessage from "../ui/error-message";

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>;
    name: Path<IForm>;
    label?: string;
    wrapperClassName?: ClassNameValue;
    hideError?: boolean;
    required?: boolean;
    length?: number;
    pattern?: RegExp;
}

export default function FormInput<IForm extends FieldValues>({
    methods,
    name,
    label,
    wrapperClassName,
    className,
    type = "text",
    hideError = false,
    required = false,
    length,
    pattern,
    ...props
}: IProps<IForm> & React.InputHTMLAttributes<HTMLInputElement>) {
    const {
        register,
        formState: { errors, disabled },
    } = methods;

    const reg = register(name, {
        required: required && {
            value: true,
            message: `${label} is required`,
        },
        minLength: props.minLength && {
            value: props.minLength,
            message: `${label} must be at least ${props.minLength} characters`,
        },
        maxLength: props.maxLength && {
            value: props.maxLength,
            message: `${label} must be at most ${props.maxLength} characters`,
        },
        ...(length && {
            minLength: {
                value: length,
                message: `${label} must be exactly ${length} characters`,
            },
            maxLength: {
                value: length,
                message: `${label} must be exactly ${length} characters`,
            },
        }),
        pattern: pattern
            ? {
                  value: pattern,
                  message: `${label} is not valid`,
              }
            : type === "email"
              ? {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: `${label} is not a valid email`,
                }
              : undefined,
    });

    return (
        <fieldset
            className={cn("flex flex-col gap-2 w-full", wrapperClassName)}
        >
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(
                        errors[name] && "text-destructive",
                        "cursor-pointer"
                    )}
                >
                    {label}
                </Label>
            )}
            <Input
                type={type}
                {...reg}
                {...props}
                id={name}
                disabled={props.disabled || disabled}
                placeholder={props.placeholder || label}
                className={className}
                fullWidth
            />
            {!hideError && errors[name]?.message && (
                <ErrorMessage className="-mt-1">
                    {errors[name]?.message as string}
                </ErrorMessage>
            )}
        </fieldset>
    );
}
