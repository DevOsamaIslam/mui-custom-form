import { FormControl, FormHelperText, FormLabel } from "@mui/material"
import React from "react"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { ICustomComponentField } from "../../types"

interface CustomFieldProps<T extends FieldValues> {
  field: ICustomComponentField<Path<T>>
  formControl: UseFormReturn<T>
}

export const CustomField = <T extends FieldValues>({
  field,
  formControl,
}: CustomFieldProps<T>) => {
  const { control } = formControl
  const CustomComponent = field.component

  return (
    <Controller
      name={field.name as Path<T>}
      control={control}
      rules={{ required: field.required }}
      render={({ field: controlField, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <FormLabel component="legend" required={field.required}>
            {field.label}
          </FormLabel>
          <CustomComponent
            value={controlField.value}
            onChange={controlField.onChange}
            {...field.otherProps}
          />
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}
