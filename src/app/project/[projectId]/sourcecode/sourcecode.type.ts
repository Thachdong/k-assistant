export type TAddComponent = {
    componentName: string;
    content: string;
    dependencies?: string[];
    design?: File;
}

export type TCreateUnitTest = {
    testRunner: string;
    instructions?: string;
    testUtility?: string;
    configFiles?: string[];
}