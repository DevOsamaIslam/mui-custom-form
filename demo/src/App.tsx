import { zodResolver } from "@hookform/resolvers/zod"
import { Container, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CustomForm } from "../../src/CustomForm.tsx"
import { IFieldGroup } from "../../src/types.ts"

const BasicForm = () => {
  const formControl = useForm<{ username: string; birthdate: string }>()

  const fieldsGroups: IFieldGroup = [
    [
      {
        label: "Username",
        name: "username",
        type: "text",
        required: true,
      },
      {
        label: "Birthdate",
        name: "birthdate",
        type: "date",
        required: true,
      },
    ],
  ]

  const handleSubmit = (data: { username: string; birthdate: string }) => {
    console.log({ success: data })
  }

  const submitError = (data: unknown) => {
    console.log({ error: data })
  }

  return (
    <CustomForm
      fieldsGroups={fieldsGroups}
      onSubmit={[handleSubmit, submitError]}
      formControl={formControl}
    />
  )
}

//////////////////////SECTION

const GENDERS = ["Male", "Female"] as const
const HOBBIES = ["Coding", "Collections", "Hiking"] as const

const Fields = z.object({
  username: z.string(),
  age: z.number().min(16).max(80),
  gender: z.enum(GENDERS),
  hobbies: z.array(z.enum(HOBBIES)).nonempty("Please choose one"),
  birthDate: z.date(),
  file: z.instanceof(File).optional(),
})

type FieldTypes = z.infer<typeof Fields>

function FormWithZod() {
  const formControl = useForm<FieldTypes>({
    resolver: zodResolver(Fields),
  })

  const fieldsGroups: IFieldGroup<FieldTypes> = [
    [
      {
        label: "Username",
        name: "username",
        type: "text",
        required: true,
      },
      {
        label: "Age",
        name: "age",
        type: "number",
        required: true,
      },
    ],
    [
      {
        label: "Gender",
        name: "gender",
        type: "single-select",
        list: GENDERS.map((gender) => ({ label: gender, value: gender })),
      },
      {
        label: "Hobbies",
        name: "hobbies",
        type: "multi-select",
        list: HOBBIES.map((hobby) => ({ label: hobby, value: hobby })),
        required: true,
      },
    ],
    [
      {
        label: "Date of birth",
        name: "birthDate",
        type: "date",
      },
      {
        label: "Upload Image",
        name: "file",
        type: "file",
      },
    ],
  ]

  const onSubmit = (data: FieldTypes) => {
    console.log({ success: data })
  }

  return (
    <CustomForm
      fieldsGroups={fieldsGroups}
      onSubmit={[onSubmit]}
      formControl={formControl}
    />
  )
}

function App() {
  return (
    <Container>
      <Typography variant="h1">Basic</Typography>
      <BasicForm />
      <br />
      <br />
      <br />
      <br />
      <Typography variant="h1">With Zod</Typography>
      <FormWithZod />
    </Container>
  )
}

export default App
