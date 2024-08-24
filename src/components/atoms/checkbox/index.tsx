import { Checkbox as BsCheckbox, CheckboxProps } from '@mui/material';

export const Checkbox: React.FC<CheckboxProps> = (props) => {
    return <BsCheckbox {...props} />;
}