import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Stack,
} from "@mui/material"
import React from "react"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { ICheckboxGroupField } from "../../types"

interface CheckboxGroupFieldProps<T extends FieldValues> {
  field: ICheckboxGroupField<Path<T>>
  formControl: UseFormReturn<T>
}

export const CheckboxGroupField = <T extends FieldValues>({
  field,
  formControl,
}: CheckboxGroupFieldProps<T>) => {
  const { control } = formControl

  return (
    <Controller
      name={field.name as Path<T>}
      control={control}
      rules={{ required: field.required }}
      render={({ field: controlField, fieldState: { error } }) => (
        <FormControl component="fieldset" error={!!error}>
          <FormLabel component="legend" required={field.required}>
            {field.label}
          </FormLabel>
          <Stack direction="row" spacing={2}>
            {field.list?.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={
                      controlField.value?.includes(option.value) || false
                    }
                    onChange={(e) => {
                      const checked = e.target.checked
                      const value = option.value
                      if (checked) {
                        controlField.onChange([
                          ...(controlField.value || []),
                          value,
                        ])
                      } else {
                        controlField.onChange(
                          (controlField.value || []).filter(
                            (v: any) => v !== value
                          )
                        )
                      }
                    }}
                    {...field.otherProps}
                  />
                }
                label={option.label}
              />
            ))}
          </Stack>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}
