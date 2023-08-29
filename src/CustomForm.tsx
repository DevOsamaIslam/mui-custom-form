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
import React from "react"
import { Controller, FieldValues, Path } from "react-hook-form"
import { ICustomField, ICustomForm } from "./types"

export const CustomForm = <T extends FieldValues>({
  fieldsGroups,
  onSubmit,
  formControl,
  submitButton = true,
  resetButton,
  actionButtonsPlacement,
  otherProps,
}: ICustomForm<T>) => {
  const { control, setValue, reset, register } = formControl

  const renderField = (field: ICustomField<string>) => {
    switch (field.type) {
      case "text":
      case "number":
        return (
          <Controller
            name={field.name as Path<T>}
            control={control}
            rules={{ required: field.required }}
            render={({ field: controlField, fieldState: { error } }) => (
              <TextField
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
      case "single-select":
      case "multi-select":
        return (
          <Controller
            name={field.name as Path<T>}
            control={control}
            render={({ field: controlField, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <InputLabel required={field.required}>{field.label}</InputLabel>
                <Select
                  label={field.label}
                  {...controlField}
                  value={
                    controlField.value ||
                    (field.type === "multi-select" ? [] : "")
                  }
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
            name={field.name as Path<T>}
            control={control}
            render={({ field: controlField, fieldState: { error } }) => (
              <DatePicker
                {...controlField}
                value={controlField.value || null}
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
                  setValue(field.name as any, fileValue as any)
                }}
              />
            </Button>
          </>
        )
      default:
        return null
    }
  }

  const submitButtonProps =
    submitButton && submitButton !== true ? submitButton : {}
  const resetButtonProps =
    resetButton && resetButton !== true ? resetButton : {}

  return (
    <Stack
      component="form"
      onSubmit={formControl.handleSubmit(onSubmit[0], onSubmit[1])}
      noValidate
      {...otherProps}
      spacing={3}>
      <Grid container spacing={1}>
        {fieldsGroups.map((fields, rowIndex) => (
          <Grid container item key={rowIndex} spacing={2}>
            {fields.map((field, fieldIndex) => (
              <Grid item key={fieldIndex} xs={field.span || true}>
                {renderField(field as ICustomField<string>)}
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" justifyContent={actionButtonsPlacement}>
        {resetButton && (
          <Button
            type="reset"
            variant="contained"
            onClick={() => reset()}
            {...resetButtonProps}>
            Reset
          </Button>
        )}
        {submitButton && (
          <Button type="submit" variant="contained" {...submitButtonProps}>
            Submit
          </Button>
        )}
      </Stack>
    </Stack>
  )
}
