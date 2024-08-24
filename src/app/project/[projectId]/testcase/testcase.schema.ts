import * as yup from 'yup';

export const createTestcaseSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    specId: yup.string().required('Spec is required'),
});