// App.tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { ButtonProps, Container, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CustomForm } from "../../src/CustomForm.tsx"
import { IFieldGroup } from "../../src/types.ts"

// -------------------- BasicForm --------------------
const BasicForm = () => {
  const formControl = useForm<{
    username: string
    password: string
    bio: string
    subscribe: boolean
  }>({
    defaultValues: {
      subscribe: false,
    },
  })

  const fieldsGroups: IFieldGroup = [
    [
      {
        label: "Username",
        name: "username",
        type: "text",
        required: true,
        otherProps: { placeholder: "Enter your username" },
        span: 6,
      },
      {
        label: "Password",
        name: "password",
        type: "password",
        required: true,
        otherProps: { placeholder: "Enter your password" },
        span: 6,
      },
    ],
    [
      {
        label: "Bio",
        name: "bio",
        type: "textarea",
        required: false,
        otherProps: { rows: 5, placeholder: "Tell us about yourself" },
        span: 12,
      },
    ],
    [
      {
        label: "Subscribe to Newsletter",
        name: "subscribe",
        type: "switch",
        required: false,
        otherProps: { color: "primary" },
        span: 6,
      },
    ],
  ]

  const handleSubmit = (data: {
    username: string
    password: string
    bio: string
    subscribe: boolean
  }) => {
    console.log({ success: data })
  }

  const submitError = (data: unknown) => {
    console.log({ error: data })
  }

  const submitButtonProps: ButtonProps = {
    variant: "contained",
    color: "primary",
  }

  const resetButtonProps: ButtonProps = {
    variant: "outlined",
    color: "secondary",
  }

  return (
    <CustomForm
      fieldsGroups={fieldsGroups}
      onSubmit={[handleSubmit, submitError]}
      formControl={formControl}
      submitButton={submitButtonProps}
      resetButton={resetButtonProps}
      actionButtonsPlacement="flex-end"
      otherProps={{ spacing: 2 }}
    />
  )
}

// -------------------- FormWithZod --------------------
const GENDERS = ["Male", "Female", "Other"] as const
const HOBBIES = ["Coding", "Collections", "Hiking"] as const

const Fields = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(16, "Minimum age is 16")
    .max(80, "Maximum age is 80"),
  gender: z.enum(GENDERS, { required_error: "Gender is required" }),
  bio: z.string(),
  hobbies: z
    .array(z.enum(HOBBIES), { required_error: "Hobbies are required" })
    .nonempty("Please choose at least one hobby"),
  planDate: z.date({ required_error: "planDate is required" }),
  file: z
    .instanceof(FileList, { message: "File must be a valid file" })
    .optional(),
  customField: z.string().optional(),
  eventDates: z.tuple([z.date().nullable(), z.date().nullable()]).optional(),
  subscribe: z.boolean().optional(),
})

type FieldTypes = z.infer<typeof Fields>

function FormWithZod() {
  const formControl = useForm<FieldTypes>({
    resolver: zodResolver(Fields),
    defaultValues: {
      hobbies: [],
      eventDates: [null, null],
    },
  })

  const fieldsGroups: IFieldGroup<FieldTypes> = [
    [
      {
        label: "Username",
        name: "username",
        type: "text",
        required: true,
        otherProps: { placeholder: "Enter your username" },
        span: 6,
      },
      {
        label: "Password",
        name: "password",
        type: "password",
        required: true,
        otherProps: { placeholder: "Enter your password" },
        span: 6,
      },
    ],
    [
      {
        label: "Age",
        name: "age",
        type: "number",
        required: true,
        otherProps: { min: 16, max: 80 },
        span: 6,
      },
      {
        label: "Gender",
        name: "gender",
        type: "radio-group",
        list: GENDERS.map((gender) => ({
          label: gender,
          value: gender,
        })),
        required: true,
        otherProps: { row: true },
        span: 6,
      },
    ],
    [
      {
        label: "Hobbies",
        name: "hobbies",
        type: "checkbox-group",
        list: HOBBIES.map((hobby) => ({ label: hobby, value: hobby })),
        required: true,
        span: 6,
      },
      {
        label: "Subscribe to Newsletter",
        name: "subscribe",
        type: "switch",
        required: false,
        otherProps: { color: "primary" },
        span: 6,
      },
    ],
    [
      {
        label: "Bio",
        name: "bio",
        type: "textarea",
        required: false,
        otherProps: { rows: 5, placeholder: "Tell us about yourself" },
        span: 12,
      },
    ],
    [
      {
        label: "Plan Date",
        name: "planDate",
        type: "date",
        required: true,
      },
    ],
    [
      {
        label: "Upload Image",
        name: "file",
        type: "file",
        required: false,
      },
    ],
  ]

  const onSubmit = (data: FieldTypes) => {
    console.log({ success: data })
  }

  const submitError = (errors: unknown) => {
    console.log({ errors })
  }

  const submitButtonProps: ButtonProps = {
    variant: "contained",
    color: "primary",
  }

  const resetButtonProps: ButtonProps = {
    variant: "outlined",
    color: "secondary",
  }

  return (
    <CustomForm
      fieldsGroups={fieldsGroups}
      onSubmit={[onSubmit, submitError]}
      formControl={formControl}
      submitButton={submitButtonProps}
      resetButton={resetButtonProps}
      actionButtonsPlacement="flex-end"
      otherProps={{ spacing: 2 }}
    />
  )
}

// -------------------- Main App Component --------------------
function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Basic Form Section */}
      <Typography variant="h4" gutterBottom>
        Basic Form
      </Typography>
      <BasicForm />

      <br />
      <br />

      {/* Form With Zod Validation Section */}
      <Typography variant="h4" gutterBottom>
        Form With Zod Validation
      </Typography>
      <FormWithZod />
    </Container>
  )
}

export default App
