import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Stack,
  Typography,
} from "@mui/material"
import { Close, InsertDriveFile } from "@mui/icons-material"
import React, { useRef } from "react"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { IFileField } from "../../types"

interface FileFieldProps<T extends FieldValues> {
  field: IFileField<Path<T>>
  formControl: UseFormReturn<T>
}

export const FileField = <T extends FieldValues>({
  field,
  formControl,
}: FileFieldProps<T>) => {
  const { control } = formControl
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <Controller
      name={field.name as Path<T>}
      control={control}
      rules={{ required: field.required }}
      render={({ field: controlField, fieldState: { error } }) => {
        const selectedFile = controlField.value?.[0] as File | undefined
        const previewUrl = selectedFile
          ? URL.createObjectURL(selectedFile)
          : null

        return (
          <FormControl fullWidth error={!!error}>
            <FormLabel component="legend" required={field.required}>
              {field.label}
            </FormLabel>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{ cursor: "pointer" }}
                {...field.otherProps}>
                {field.fileInputComponent ? (
                  typeof field.fileInputComponent === "function" ? (
                    React.createElement(field.fileInputComponent)
                  ) : (
                    field.fileInputComponent
                  )
                ) : (
                  <Button variant="contained" component="span">
                    Upload File
                  </Button>
                )}
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={(e) => {
                    const fileValue =
                      e.target.files && e.target.files.length > 0
                        ? e.target.files
                        : undefined
                    controlField.onChange(fileValue)
                  }}
                />
              </Box>

              {selectedFile && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  {selectedFile.type.startsWith("image/") && previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <InsertDriveFile sx={{ fontSize: 50 }} />
                  )}
                  <Typography variant="body2">{selectedFile.name}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => {
                      controlField.onChange(undefined)
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "" // Clear the input element
                      }
                      if (previewUrl) {
                        URL.revokeObjectURL(previewUrl) // Clean up the object URL
                      }
                    }}>
                    <Close fontSize="small" />
                  </IconButton>
                </Stack>
              )}
            </Stack>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )
      }}
    />
  )
}
