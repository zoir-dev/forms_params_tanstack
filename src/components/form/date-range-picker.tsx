import { Controller, Path, UseFormReturn, FieldValues } from "react-hook-form";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";
import ErrorMessage from "../ui/error-message";
import { DateRangePicker } from "../ui/date-range-picker";
import { CalendarProps } from "../ui/calendar";

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>;
    name: Path<IForm>;
    label?: string;
    wrapperClassName?: ClassNameValue;
    hideError?: boolean;
    disabled?: boolean;
    format?: string;
    required?: boolean;
}

export default function FormDateRangePicker<IForm extends FieldValues>({
    methods,
    name,
    label,
    hideError = false,
    disabled,
    format = "dd/MM/yyyy",
    wrapperClassName,
    required = false,
    ...calendarProps
}: IProps<IForm> & CalendarProps) {
    const {
        formState: { errors },
    } = methods;

    return (
        <fieldset className={cn("flex flex-col gap-2", wrapperClassName)}>
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
                }}
                render={({ field }) => (
                    <DateRangePicker
                        date={field.value}
                        setDate={field.onChange}
                        format={format}
                        placeholder={label}
                        disabled={field.disabled || disabled}
                        className="w-full"
                        {...calendarProps}
                    />
                )}
            />
            {!hideError && errors[name] && (
                <ErrorMessage className="-mt-1">
                    {errors[name].message as string}
                </ErrorMessage>
            )}
        </fieldset>
    );
}
