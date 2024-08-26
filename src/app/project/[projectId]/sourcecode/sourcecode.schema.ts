import * as yup from 'yup';

export const addComponentSchema = yup.object().shape({
    componentName: yup.string().required(),
    dependencies: yup.array().of(yup.string().required()),
    design: yup.mixed(),
    content: yup.string().required(),
});

export const addUnitTestSchema = yup.object().shape({
    testRunner: yup.string().required(),
    instructions: yup.string(),
    testUtility: yup.string(),
    configFiles: yup.array().of(yup.string().required())
})