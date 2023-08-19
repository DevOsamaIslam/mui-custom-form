import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { Controller } from "react-hook-form"
import { useForm } from "react-hook-form"
import React from "react"

export type $option<T = any> = {
  icon?: React.ReactNode
  label: string
  value: T
}

export interface ICustomField<T = string> {
  label: string
  name: T extends string ? string : keyof T
  type: "text" | "number" | "single-select" | "multi-select" | "date" | "file"
  list?: $option[]
  required?: boolean // This can be further refined to your validation rules
  otherProps?: any
  span?: number // A number between 1 and 12, representing MUI's grid system
}

interface ICustomForm {
  fieldsGroups: ICustomField<any>[][]
  onSubmit: ReturnType<this["formControl"]["handleSubmit"]>
  formControl: ReturnType<typeof useForm<any>>
  submitButton?: boolean
  otherProps?: any
}

export const CustomForm: React.FC<ICustomForm> = ({
  fieldsGroups,
  onSubmit,
  formControl,
  submitButton = true,
  otherProps,
}) => {
  const { control, setValue } = formControl

  const renderField = (field: ICustomField<string>) => {
    switch (field.type) {
      case "text":
      case "number":
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: controlField, fieldState: { error } }) => (
              <TextField
                {...controlField}
                {...field.otherProps}
                label={field.label}
                type={field.type}
                fullWidth
                required={field.required}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )
      case "single-select":
      case "multi-select":
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: controlField, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <InputLabel required={field.required}>{field.label}</InputLabel>
                <Select
                  {...controlField}
                  {...field.otherProps}
                  multiple={field.type === "multi-select"}>
                  {field.list?.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        )
      case "date":
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: controlField, fieldState: { error } }) => (
              <DatePicker
                {...controlField}
                {...field.otherProps}
                label={field.label}
                onChange={controlField.onChange}
                slotProps={{
                  textField: {
                    required: field.required,
                    error: !!error,
                    helperText: error?.message,
                    fullWidth: true,
                  },
                }}
              />
            )}
          />
        )
      case "file":
        return (
          <>
            <FormLabel component="legend">{field.label}</FormLabel>
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                hidden
                onChange={(e) => {
                  // Set the value to either the File instance or undefined
                  const fileValue =
                    e.target.files && e.target.files.length > 0
                      ? e.target.files[0]
                      : undefined
                  setValue(field.name, fileValue)
                }}
              />
            </Button>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={onSubmit}
      noValidate
      {...otherProps}
      spacing={3}>
      <Grid container spacing={1}>
        {fieldsGroups.map((fields, rowIndex) => (
          <Grid container item key={rowIndex} spacing={2}>
            {fields.map((field, fieldIndex) => (
              <Grid item key={fieldIndex} xs={field.span || true}>
                {renderField(field as unknown as ICustomField<string>)}
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      {submitButton && (
        <Button type="submit" variant="contained">
          Submit
        </Button>
      )}
    </Stack>
  )
}
