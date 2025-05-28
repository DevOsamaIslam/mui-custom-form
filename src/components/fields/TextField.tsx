import { TextField as MuiTextField } from "@mui/material"
import React from "react"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { ICustomField } from "../../types"

interface TextFieldProps<T extends FieldValues> {
  field: ICustomField<Path<T>>
  formControl: UseFormReturn<T>
}

export const TextField = <T extends FieldValues>({
  field,
  formControl,
}: TextFieldProps<T>) => {
  const { control } = formControl

  return (
    <Controller
      name={field.name as Path<T>}
      control={control}
      rules={{ required: field.required }}
      render={({ field: controlField, fieldState: { error } }) => (
        <MuiTextField
          {...controlField}
          value={controlField.value || ""}
          {...field.otherProps}
          label={field.label}
          type={field.type}
          fullWidth
          required={field.required}
          error={!!error}
          helperText={error?.message}
          onChange={(e) => {
            if (!e.target.value) return controlField.onChange(undefined)
            controlField.onChange(
              field.type === "number"
                ? parseFloat(e.target.value)
                : e.target.value
            )
          }}
        />
      )}
    />
  )
}
