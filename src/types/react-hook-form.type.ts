import { Control, ControllerFieldState, ControllerRenderProps, FieldValues, UseFormStateReturn } from "react-hook-form";

export type TControllerProps = {
    control: Control<any, any>;
    name: string;
    render: ({ field, fieldState, formState, }: {
        field: ControllerRenderProps<FieldValues, any>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<FieldValues>;
    }) => React.ReactElement;
}