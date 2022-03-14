import { IProps } from './props.model';

export interface IFieldConfigProps extends IProps {
  name: string,
  label: string,
  errors: any,
  touched: any
}