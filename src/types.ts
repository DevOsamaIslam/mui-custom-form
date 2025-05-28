import { ButtonProps, StackProps } from "@mui/material"
import { CSSProperties } from "react"
import {
  FieldPath,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form"

export type TOption<T = any> = {
  icon?: React.ReactNode
  label: string
  value: T
}

type FileInputComponent = React.ReactNode | React.ElementType

// Base interface for all custom fields
export interface ICustomFieldBase<T extends string> {
  label: string
  name: T
  required?: boolean
  otherProps?: any
  span?: number
}

// Specific field interfaces
export interface ITextField<T extends string> extends ICustomFieldBase<T> {
  type: "text" | "number" | "password"
}

export interface ITextareaField<T extends string> extends ICustomFieldBase<T> {
  type: "textarea"
}

export interface ISelectField<T extends string> extends ICustomFieldBase<T> {
  type: "single-select" | "multi-select"
  list: TOption[]
}

export interface IDateField<T extends string> extends ICustomFieldBase<T> {
  type: "date"
}

export interface IFileField<T extends string> extends ICustomFieldBase<T> {
  type: "file"
  fileInputComponent?: FileInputComponent
}

export interface ISwitchField<T extends string> extends ICustomFieldBase<T> {
  type: "switch"
}

export interface ICheckboxGroupField<T extends string>
  extends ICustomFieldBase<T> {
  type: "checkbox-group"
  list: TOption[]
}

export interface IRadioGroupField<T extends string>
  extends ICustomFieldBase<T> {
  type: "radio-group"
  list: TOption[]
}

export interface ICustomComponentField<T extends string>
  extends ICustomFieldBase<T> {
  type: "custom"
  component: React.ComponentType<CustomComponentProps>
}

// Union type for all custom fields
export type ICustomField<T extends string> =
  | ITextField<T>
  | ITextareaField<T>
  | ISelectField<T>
  | IDateField<T>
  | IFileField<T>
  | ISwitchField<T>
  | ICheckboxGroupField<T>
  | IRadioGroupField<T>
  | ICustomComponentField<T>

export type IFieldGroup<TFormValues extends FieldValues = FieldValues> =
  ICustomField<FieldPath<TFormValues>>[][]

export interface ICustomForm<T extends FieldValues> {
  fieldsGroups: IFieldGroup<T>
  onSubmit: [SubmitHandler<T>, SubmitErrorHandler<T>?]
  formControl: UseFormReturn<T>
  actionButtonsPlacement?: StackProps["justifyContent"]
  submitButton?: ButtonProps | boolean
  resetButton?: ButtonProps | boolean
  layout?: StackProps["direction"]
  otherProps?: StackProps
}

// Define props that custom components must adhere to
export interface CustomComponentProps {
  value: any
  onChange: (value: any) => void
  [key: string]: any // Allow additional props
}
