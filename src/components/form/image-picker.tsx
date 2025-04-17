import { Controller, FieldValues, UseFormReturn, Path } from "react-hook-form";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { ClassNameValue } from "tailwind-merge";
import SeeInView from "../ui/see-in-view";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import ErrorMessage from "../ui/error-message";

export default function FormImagePicker<IForm extends FieldValues>({
    name,
    label,
    disabled,
    methods,
    hideError = false,
    className,
    avatar,
    optional = false,
    minSize,
    maxSize,
}: ImagePickerProps<IForm>) {
    const {
        control,
        formState: { errors },
    } = methods;

    return (
        <div className="w-full flex flex-col items-center">
            <Controller
                name={name}
                control={control}
                rules={{
                    required: {
                        value: !optional,
                        message: `${label} is required`,
                    },
                    validate: {
                        fileSize: (value) => {
                            if (value) {
                                if (minSize && value.size < minSize) {
                                    return `${label} must be at least ${minSize / 1024 / 1024} MB`;
                                }
                                if (maxSize && value.size > maxSize) {
                                    return `${label} must not exceed ${maxSize / 1024 / 1024} MB`;
                                }
                            }
                            return true;
                        },
                    },
                }}
                render={({ field }) => (
                    <div className="relative">
                        {avatar ? (
                            <Avatar className={`scale-150 mb-4 ${className}`}>
                                {field.value && (
                                    <SeeInView
                                        url={
                                            typeof field.value === "string"
                                                ? field.value
                                                : field.value &&
                                                  URL.createObjectURL(
                                                      field.value
                                                  )
                                        }
                                    >
                                        <AvatarImage
                                            src={
                                                typeof field.value === "string"
                                                    ? field.value
                                                    : field.value &&
                                                      URL.createObjectURL(
                                                          field.value
                                                      )
                                            }
                                            alt="Selected Image"
                                            className="object-cover"
                                        />
                                    </SeeInView>
                                )}
                                <AvatarFallback>Img</AvatarFallback>
                            </Avatar>
                        ) : (
                            <>
                                {field.value ? (
                                    <SeeInView
                                        url={
                                            typeof field.value === "string"
                                                ? field.value
                                                : field.value &&
                                                  URL.createObjectURL(
                                                      field.value
                                                  )
                                        }
                                    >
                                        <img
                                            src={
                                                typeof field.value === "string"
                                                    ? field.value
                                                    : field.value &&
                                                      URL.createObjectURL(
                                                          field.value
                                                      )
                                            }
                                            alt="Selected Image"
                                            className={`${className}` || ""}
                                        />
                                    </SeeInView>
                                ) : (
                                    <div
                                        className={`${className} bg-secondary`}
                                    ></div>
                                )}
                            </>
                        )}
                        <input
                            type="file"
                            id={name}
                            accept="image/*"
                            disabled={disabled}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    field.onChange(file);
                                }
                            }}
                            hidden
                        />
                    </div>
                )}
            />
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(
                        !!errors?.[name] && "text-destructive",
                        "cursor-pointer pt-2"
                    )}
                >
                    {label}
                </Label>
            )}
            {!hideError && errors[name] && (
                <ErrorMessage>{errors[name]?.message as string}</ErrorMessage>
            )}
        </div>
    );
}

interface ImagePickerProps<IForm extends FieldValues> {
    name: Path<IForm>;
    label?: string;
    disabled?: boolean;
    optional?: boolean;
    methods: UseFormReturn<IForm>;
    hideError?: boolean;
    className?: ClassNameValue;
    avatar?: boolean;
    minSize?: number;
    maxSize?: number;
}
