import { TextField as MuiTextField, TextFieldProps } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import React from "react"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { IDateField } from "../../types"

interface DateFieldProps<T extends FieldValues> {
  field: IDateField<Path<T>>
  formControl: UseFormReturn<T>
}

export const DateField = <T extends FieldValues>({
  field,
  formControl,
}: DateFieldProps<T>) => {
  const { control } = formControl

  return (
    <Controller
      name={field.name as Path<T>}
      control={control}
      rules={{ required: field.required }}
      render={({ field: controlField, fieldState: { error } }) => (
        <DatePicker
          {...controlField}
          value={controlField.value || null}
          {...field.otherProps}
          label={field.label}
          onChange={(date) => controlField.onChange(date)}
          renderInput={(params: TextFieldProps) => (
            <MuiTextField
              {...params}
              required={field.required}
              error={!!error}
              helperText={error?.message}
              fullWidth
            />
          )}
        />
      )}
    />
  )
}
