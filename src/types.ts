import { ButtonProps, StackProps } from "@mui/material"
import { CSSProperties } from "react"
import {
  FieldPath,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form"

type SelectTypes = "single-select" | "multi-select"
type BaseTypes =
  | "text"
  | "number"
  | "date"
  | "file"
  | "password"
  | "textarea"
  | "switch"
  | "checkbox-group"
  | "radio-group"
  | "custom"

export interface ISelectField {
  type: SelectTypes
  list: TOption[]
}

export interface IOtherField {
  type: BaseTypes
  list?: TOption[]
  // For custom components, specify the component
  component?: React.ComponentType<CustomComponentProps>
}

export type ICustomField<T extends string> = {
  label: string
  name: T
  required?: boolean
  otherProps?: any
  span?: number
} & (
  | {
      type: SelectTypes
      list: TOption[]
    }
  | {
      type: BaseTypes
      list?: TOption[]
      component?: React.ComponentType<CustomComponentProps>
    }
)

export type TOption<T = any> = {
  icon?: React.ReactNode
  label: string
  value: T
}

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
