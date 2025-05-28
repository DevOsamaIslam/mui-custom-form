import { TextField as MuiTextField } from "@mui/material"
import React from "react"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { ICustomField } from "../../types"

interface TextareaFieldProps<T extends FieldValues> {
  field: ICustomField<Path<T>>
  formControl: UseFormReturn<T>
}

export const TextareaField = <T extends FieldValues>({
  field,
  formControl,
}: TextareaFieldProps<T>) => {
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
          type="text"
          fullWidth
          multiline
          rows={field.otherProps?.rows || 4}
          required={field.required}
          error={!!error}
          helperText={error?.message}
          onChange={controlField.onChange}
        />
      )}
    />
  )
}
