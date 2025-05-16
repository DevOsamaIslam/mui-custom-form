// CustomForm.tsx
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Switch as MuiSwitch,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  TextFieldProps,
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
  layout,
  otherProps,
}: ICustomForm<T>) => {
  const { control, setValue, reset } = formControl

  const renderField = (field: ICustomField<string>) => {
    switch (field.type) {
      case "text":
      case "number":
      case "password":
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

      case "textarea":
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
                type="text"
                fullWidth
                required={field.required}
                multiline
                rows={field.otherProps?.rows || 4}
                error={!!error}
                helperText={error?.message}
                onChange={controlField.onChange}
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
            rules={{ required: field.required }}
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
            rules={{ required: field.required }}
            render={({ field: controlField, fieldState: { error } }) => (
              <DatePicker
                {...controlField}
                value={controlField.value || null}
                {...field.otherProps}
                label={field.label}
                onChange={(date) => controlField.onChange(date)}
                renderInput={(params: TextFieldProps) => (
                  <TextField
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

      case "file":
        return (
          <FormControl fullWidth error={!!field.required}>
            <FormLabel component="legend" required={field.required}>
              {field.label}
            </FormLabel>
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const fileValue =
                    e.target.files && e.target.files.length > 0
                      ? e.target.files
                      : undefined
                  setValue(field.name as any, fileValue as any)
                }}
                {...field.otherProps}
              />
            </Button>
          </FormControl>
        )

      case "switch":
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

      case "checkbox-group":
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

      case "radio-group":
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

      case "custom":
        if (field.component) {
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
        return null

      default:
        return null
    }
  }

  const submitButtonProps =
    submitButton && submitButton !== true ? submitButton : {}
  const resetButtonProps =
    resetButton && resetButton !== true ? resetButton : {}

  // Function to calculate spans dynamically
  const calculateSpan = (fields: ICustomField<any>[]) => {
    const totalDefinedSpan = fields.reduce(
      (acc, field) => acc + (field.span || 0),
      0
    )
    const autoSpanFields = fields.filter((field) => !field.span).length
    const remainingSpan = 12 - totalDefinedSpan
    const calculatedSpan =
      autoSpanFields > 0 ? Math.floor(remainingSpan / autoSpanFields) : 12

    return { calculatedSpan, autoSpanFields }
  }

  return (
    <Stack
      component="form"
      onSubmit={formControl.handleSubmit(onSubmit[0], onSubmit[1])}
      noValidate
      direction={layout}
      {...otherProps}
      spacing={3}>
      {fieldsGroups.map((fields, rowIndex) => {
        const { calculatedSpan, autoSpanFields } = calculateSpan(fields)

        return (
          <Grid container key={rowIndex} spacing={2}>
            {fields.map((field, fieldIndex) => (
              <Grid
                key={fieldIndex}
                size={
                  field.span
                    ? field.span
                    : autoSpanFields > 0
                    ? calculatedSpan
                    : 12
                }>
                {renderField(field as ICustomField<string>)}
              </Grid>
            ))}
          </Grid>
        )
      })}
      <Stack
        direction="row"
        justifyContent={actionButtonsPlacement || "flex-end"}
        spacing={2}>
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
