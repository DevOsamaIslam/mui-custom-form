import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material"
import React from "react"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { IRadioGroupField } from "../../types"

interface RadioGroupFieldProps<T extends FieldValues> {
  field: IRadioGroupField<Path<T>>
  formControl: UseFormReturn<T>
}

export const RadioGroupField = <T extends FieldValues>({
  field,
  formControl,
}: RadioGroupFieldProps<T>) => {
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
          <RadioGroup
            {...controlField}
            value={controlField.value || ""}
            onChange={(e) => controlField.onChange(e.target.value)}
            row={field.otherProps?.row || false}>
            {field.list?.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio {...field.otherProps} />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}
