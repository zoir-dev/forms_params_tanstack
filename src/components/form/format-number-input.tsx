import {
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import ErrorMessage from "../ui/error-message";
import { Label } from "../ui/label";

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>;
    name: Path<IForm>;
    label?: string;
    formatOptions?: Intl.NumberFormatOptions;
    wrapperClassName?: string;
    thousandSeparator?: string;
    decimalSeparator?: string;
    hideError?: boolean;
    format?: string;
    optional?: boolean;
    pattern?: RegExp | string;
    length?: number;
}

export default function FormFormatNumberInput<IForm extends FieldValues>({
    methods,
    name,
    label,
    wrapperClassName,
    className,
    formatOptions,
    hideError = false,
    format = "",
    optional = false,
    pattern,
    length,
    ...props
}: IProps<IForm> & PatternFormatProps) {
    const realFormat =
        (format || "") === "phone" ? "+998 ## ### ## ##" : format;
    const realLength = (format || "") === "phone" ? 9 : length;
    const {
        field: { onChange, ref, value, ...field },
        fieldState,
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
                          message: `${label} must be at least ${props.min}`,
                      }
                    : undefined,
            max:
                props.max !== undefined
                    ? {
                          value: props.max,
                          message: `${label} must be at most ${props.max}`,
                      }
                    : undefined,
            minLength:
                props.minLength !== undefined
                    ? {
                          value: props.minLength,
                          message: `${label} must be at least ${props.minLength} characters`,
                      }
                    : undefined,
            maxLength:
                props.maxLength !== undefined
                    ? {
                          value: props.maxLength,
                          message: `${label} must be at most ${props.maxLength} characters`,
                      }
                    : undefined,
            ...(realLength && {
                minLength: {
                    value: realLength,
                    message: `${label} must be exactly ${realLength} characters`,
                },
                maxLength: {
                    value: realLength,
                    message: `${label} must be exactly ${realLength} characters`,
                },
            }),
            pattern: pattern
                ? {
                      value: pattern as RegExp,
                      message: `${label} is not in the correct format`,
                  }
                : undefined,
        },
    });

    return (
        <fieldset
            className={cn("flex gap-2 flex-col w-full", wrapperClassName)}
        >
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(
                        !!methods.control._formState.errors?.[name] &&
                            "text-destructive",
                        "cursor-pointer"
                    )}
                >
                    {label}
                </Label>
            )}
            <label className="relative flex items-center">
                <PatternFormat
                    format={realFormat}
                    id={name}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                        methods.control._formState.errors?.[name] &&
                            !label &&
                            "border-destructive focus:border-border !ring-destructive"
                    )}
                    onValueChange={(val) => {
                        onChange(val.value);
                    }}
                    getInputRef={ref}
                    {...field}
                    {...props}
                    placeholder={props.placeholder || label}
                    disabled={field.disabled || props.disabled}
                />
            </label>
            {fieldState.error && !hideError && (
                <ErrorMessage>{fieldState.error?.message}</ErrorMessage>
            )}
        </fieldset>
    );
}
