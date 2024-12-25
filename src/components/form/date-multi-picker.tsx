import { Controller, Path, UseFormReturn, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CalendarProps } from "@/components/ui/calendar";
import { ClassNameValue } from "tailwind-merge";
import ErrorMessage from "../ui/error-message";
import { Label } from "../ui/label";
import { DateMultiPicker } from "../ui/date-multi-picker";

interface FormDateMultiPickerProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>;
    name: Path<IForm>;
    placeholder?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    defaultMonth?: Date;
    label?: string;
    className?: ClassNameValue;
    hideError?: boolean;
    required?: boolean;
    format?: string;
    minSelected?: number;
}

export default function FormDateMultiPicker<IForm extends FieldValues>({
    methods,
    name,
    placeholder = "Select dates",
    fullWidth,
    disabled,
    defaultMonth,
    label,
    className,
    hideError = false,
    required = false,
    minSelected = 1,
    format = "dd/MM/yyyy",
    ...calendarProps
}: FormDateMultiPickerProps<IForm> & CalendarProps) {
    const {
        formState: { errors },
    } = methods;

    return (
        <fieldset className={cn("flex flex-col gap-2", className)}>
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(
                        !!errors?.[name] && "text-destructive",
                        "cursor-pointer"
                    )}
                >
                    {label}
                </Label>
            )}
            <Controller
                name={name}
                control={methods.control}
                rules={{
                    required: {
                        value: required,
                        message: `${label} is required`,
                    },
                    validate: {
                        minSelected: (value) => {
                            if (
                                Array.isArray(value) &&
                                value.length < minSelected
                            ) {
                                return `${label} must select at least ${minSelected} options`;
                            }
                            return true;
                        },
                    },
                }}
                render={({ field }) => (
                    <DateMultiPicker
                        dates={field.value}
                        setDates={field.onChange}
                        placeholder={placeholder}
                        disabled={field.disabled || disabled}
                        fullWidth={fullWidth}
                        defaultMonth={defaultMonth}
                        {...calendarProps}
                        format={format}
                    />
                )}
            />
            {!hideError && errors[name] && (
                <ErrorMessage className="-mt-1">
                    {errors[name]?.message as string}
                </ErrorMessage>
            )}
        </fieldset>
    );
}
