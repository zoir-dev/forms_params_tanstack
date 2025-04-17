import {
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Label } from "../ui/label";
import ErrorMessage from "../ui/error-message";

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>;
    name: Path<IForm>;
    label?: string;
    wrapperClassName?: string;
    thousandSeparator?: string;
    decimalSeparator?: string;
    hideError?: boolean;
    optional?: boolean;
    pattern?: RegExp | string;
}

export default function FormNumberInput<IForm extends FieldValues>({
    methods,
    name,
    label,
    wrapperClassName,
    className,
    thousandSeparator,
    decimalSeparator,
    hideError = false,
    optional = false,
    pattern,
    ...props
}: IProps<IForm> & NumericFormatProps) {
    const {
        field: { onChange, ref, value, ...field },
        fieldState: { error },
    } = useController({
        name,
        control: methods.control,
        rules: {
            required: {
                value: !optional,
                message: `${label} is required`,
            },
            min:
                props.min !== undefined
                    ? {
                          value: props.min,
                          message: `${label} must be at ${props.min}`,
                      }
                    : 0,
            max:
                props.max !== undefined
                    ? {
                          value: props.max,
                          message: `${label} must be at most ${props.max}`,
                      }
                    : Infinity,
            minLength:
                props.minLength !== undefined
                    ? {
                          value: props.minLength,
                          message: `${label} must be at least ${props.minLength} characters`,
                      }
                    : 0,
            maxLength:
                props.maxLength !== undefined
                    ? {
                          value: props.maxLength,
                          message: `${label} must be at most ${props.maxLength} characters`,
                      }
                    : Infinity,
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
            pattern: (pattern
                ? {
                      value: pattern as RegExp,
                      message: `${label} is not in the correct format`,
                  }
                : undefined) as unknown as RegExp,
        },
    });

    return (
        <fieldset
            className={cn("flex flex-col gap-2 w-full", wrapperClassName)}
        >
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(
                        error && "text-destructive",
                        "cursor-pointer"
                    )}
                >
                    {label}
                </Label>
            )}
            <label className="relative flex items-center">
                <NumericFormat
                    id={name}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                        error &&
                            !label &&
                            "border-destructive focus:border-border !ring-destructive"
                    )}
                    thousandSeparator={thousandSeparator}
                    decimalSeparator={decimalSeparator}
                    getInputRef={ref}
                    value={value}
                    {...props}
                    onValueChange={(val) => onChange(val.value)}
                    placeholder={props.placeholder || label}
                    disabled={field.disabled || props.disabled}
                />
            </label>
            {error && !hideError && (
                <ErrorMessage>{error?.message}</ErrorMessage>
            )}
        </fieldset>
    );
}
