import React, {
    forwardRef,
    ReactNode,
    Ref,
    useCallback,
    useImperativeHandle,
} from "react";
import {
    FieldErrors,
    FieldValues,
    FormProvider,
    useForm,
    UseFormReturn,
} from "react-hook-form";

export interface IBaseFormProps {
    children: ReactNode;
    defaultValues?: FieldValues;
    onSubmit(e: FieldValues): void;
    onError?(e: FieldValues): void;
}

export interface IBaseFormRef extends UseFormReturn<any, any> {
    submit(): void;
}

export const BaseForm = forwardRef(
    (props: IBaseFormProps, ref: Ref<IBaseFormRef>) => {
        const { children, defaultValues, onSubmit, onError } = props;

        const methods = useForm({
            defaultValues,
        });

        const onValid = useCallback(
            (data: FieldValues, event?: React.BaseSyntheticEvent) => {
                event?.preventDefault();
                event?.stopPropagation();
                onSubmit(data);
            },
            [onSubmit]
        );

        const onInvalid = useCallback(
            (
                errors: FieldErrors<FieldValues>,
                event?: React.BaseSyntheticEvent
            ) => {
                event?.preventDefault();
                event?.stopPropagation();
                onError && onError(errors);
            },
            [onError]
        );

        const handleSubmit = methods.handleSubmit(onValid, onInvalid);

        useImperativeHandle(
            ref,
            () => ({
                ...methods,
                submit() {
                    handleSubmit();
                },
            }),
            [methods, handleSubmit]
        );

        return (
            <FormProvider {...methods}>
                <form className="contents bg-inherit" onSubmit={handleSubmit}>
                    {children}
                </form>
            </FormProvider>
        );
    }
);
