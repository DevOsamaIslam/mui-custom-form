import { ButtonProps } from "@mui/material"
import { CSSProperties } from "react"
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form"

type name<T> = T extends string ? string : keyof T

type SelectTypes = "single-select" | "multi-select"
type BaseTypes = "text" | "number" | "date" | "file"

export interface ISelectField {
  type: SelectTypes
  list: $option[]
}

export interface IOtherField {
  type: BaseTypes
  list?: $option[]
}

export type ICustomField<T = string> = {
  label: string
  name: name<T> | name<T>[]
  required?: true
  otherProps?: any
  span?: number
} & (
  | {
      type: SelectTypes
      list: $option[]
    }
  | {
      type: BaseTypes
    }
)

export type $option<T = any> = {
  icon?: React.ReactNode
  label: string
  value: T
}

export type IFieldGroup<T = any> = ICustomField<T>[][]

export interface ICustomForm<T extends FieldValues> {
  fieldsGroups: IFieldGroup<any>
  onSubmit: [SubmitHandler<T>, SubmitErrorHandler<T>?]
  formControl: ReturnType<typeof useForm<T>>
  actionButtonsPlacement?: CSSProperties["justifyContent"]
  submitButton?: ButtonProps | boolean
  resetButton?: ButtonProps | boolean
  otherProps?: any
}
