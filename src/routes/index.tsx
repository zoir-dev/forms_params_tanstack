import FormAudioRecord from "@/components/form/audio-record";
import FormCheckbox from "@/components/form/checkbox";
import FormCombobox from "@/components/form/combobox";
import FormDateMultiPicker from "@/components/form/date-multi-picker";
import FormDatePicker from "@/components/form/date-picker";
import FormDateRangePicker from "@/components/form/date-range-picker";
import FormFormatNumberInput from "@/components/form/format-number-input";
import FormImagePicker from "@/components/form/image-picker";
import FormInput from "@/components/form/input";
import FormMonthPicker from "@/components/form/month-picker";
import FormMultiCombobox from "@/components/form/multi-combobox";
import FormNumberInput from "@/components/form/number-input";
import FormRadioGroup from "@/components/form/radio-group";
import FormSelect from "@/components/form/select";
import FormSlider from "@/components/form/slider";
import FormTextarea from "@/components/form/textarea";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/")({
    component: HomeComponent,
});

function HomeComponent() {
    const form = useForm<Form>();

    async function onSubmit(data: Form) {
        console.log(data);
    }

    return (
        <div className="w-full max-w-lg mx-auto pt-20">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
                noValidate
            >
                <FormImagePicker
                    methods={form}
                    name="photo"
                    label="Image"
                    className="w-16 h-16 rounded-md object-cover"
                />
                <FormInput methods={form} name="name" label="Name" />
                <FormTextarea
                    methods={form}
                    name="description"
                    label="Description"
                />
                <FormNumberInput methods={form} name="age" label="Age" />
                <FormFormatNumberInput
                    methods={form}
                    name="phone_number"
                    format="phone"
                    label="Phone number"
                />
                <FormCheckbox
                    methods={form}
                    name="is_active"
                    label="Is active"
                />
                <FormDatePicker
                    methods={form}
                    name="birth_date"
                    label="Birth date"
                    captionLayout="dropdown-buttons"
                />
                <FormDatePicker
                    methods={form}
                    name="plan_date"
                    label="Plan date"
                />
                <FormDateRangePicker
                    methods={form}
                    name="date_range"
                    label="Date range"
                    captionLayout="dropdown-buttons"
                />
                <FormDateMultiPicker
                    methods={form}
                    name="dates"
                    label="Dates"
                    captionLayout="dropdown-buttons"
                />
                <FormSelect
                    methods={form}
                    name="gender"
                    options={[
                        { name: "Male", id: 1 },
                        { name: "Female", id: 2 },
                    ]}
                    label="Gender"
                />
                <FormCombobox
                    methods={form}
                    name="color"
                    options={colors}
                    label="Color"
                />
                <FormMultiCombobox
                    methods={form}
                    name="multi_colors"
                    label="Colors"
                    options={colors}
                />
                <FormMonthPicker
                    methods={form}
                    name="month"
                    label="Pick a month"
                />
                <FormSlider
                    methods={form}
                    name="lang_val"
                    label="Language level"
                    step={1}
                    min={1}
                    max={5}
                />
                <FormRadioGroup
                    options={colors}
                    methods={form}
                    name="color-radio"
                    label="Color"
                />

                <FormAudioRecord
                    methods={form}
                    name="comment"
                    name2="audio"
                    label="Comment"
                    required
                />
                <Button>Submit</Button>
            </form>
        </div>
    );
}

interface Form {
    name: string;
    description: string;
    photo: File | string;
    age: number;
    phone_number: string;
    is_active: boolean;
    birth_date: string;
    plan_date: string;
    date_range: {
        from: string;
        to: string;
    };
    dates: string[];
    gender: string;
    color: string;
    multi_colors: string[];
    month: string;
    lang_val: number;
    "color-radio": string;
    audio: File | string;
    comment: string;
}
const colors = [
    {
        name: "Red",
        id: 1,
    },
    {
        name: "Blue",
        id: 2,
    },
    {
        name: "Green",
        id: 3,
    },
];
