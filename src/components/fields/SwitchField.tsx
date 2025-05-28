import { FormControlLabel, Switch as MuiSwitch } from "@mui/material"
import React from "react"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { ISwitchField } from "../../types"

interface SwitchFieldProps<T extends FieldValues> {
  field: ISwitchField<Path<T>>
  formControl: UseFormReturn<T>
}

export const SwitchField = <T extends FieldValues>({
  field,
  formControl,
}: SwitchFieldProps<T>) => {
  const { control } = formControl

  return (
    <Controller
      name={field.name as Path<T>}
      control={control}
      rules={{ required: field.required }}
      render={({ field: controlField, fieldState: { error } }) => (
        <FormControlLabel
          control={
            <MuiSwitch
              {...controlField}
              checked={!!controlField.value}
              onChange={(e) => controlField.onChange(e.target.checked)}
              {...field.otherProps}
            />
          }
          label={field.label}
        />
      )}
    />
  )
}
