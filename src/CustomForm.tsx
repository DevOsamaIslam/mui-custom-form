import { Button, Grid, Stack } from "@mui/material"
import React from "react"
import { FieldValues, Path } from "react-hook-form"
import { ICustomField, ICustomForm } from "./types"

// Import modularized field components
import { TextField } from "./components/fields/TextField"
import { TextareaField } from "./components/fields/TextareaField"
import { SelectField } from "./components/fields/SelectField"
import { DateField } from "./components/fields/DateField"
import { FileField } from "./components/fields/FileField"
import { SwitchField } from "./components/fields/SwitchField"
import { CheckboxGroupField } from "./components/fields/CheckboxGroupField"
import { RadioGroupField } from "./components/fields/RadioGroupField"
import { CustomField as CustomComponentField } from "./components/fields/CustomField"

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
  const { control, reset } = formControl

  const renderField = (field: ICustomField<Path<T>>) => {
    switch (field.type) {
      case "text":
      case "number":
      case "password":
        return <TextField field={field} formControl={formControl} />
      case "textarea":
        return <TextareaField field={field} formControl={formControl} />
      case "single-select":
      case "multi-select":
        return <SelectField field={field} formControl={formControl} />
      case "date":
        return <DateField field={field} formControl={formControl} />
      case "file":
        return <FileField field={field} formControl={formControl} />
      case "switch":
        return <SwitchField field={field} formControl={formControl} />
      case "checkbox-group":
        return <CheckboxGroupField field={field} formControl={formControl} />
      case "radio-group":
        return <RadioGroupField field={field} formControl={formControl} />
      case "custom":
        return <CustomComponentField field={field} formControl={formControl} />
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
                {renderField(field as ICustomField<Path<T>>)}
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

export default CustomForm
