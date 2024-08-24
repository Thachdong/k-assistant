import * as yup from 'yup';

export const addComponentSchema = yup.object().shape({
    componentName: yup.string().required(),
    dependencies: yup.array().of(yup.string().required()),
    design: yup.mixed(),
    content: yup.string().required(),
});