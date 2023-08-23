import { zodResolver } from "@hookform/resolvers/zod"
import { Container, Typography } from "@mui/material"
import { CustomForm, ICustomField } from "../../src/CustomForm.tsx"
import { useForm } from "react-hook-form"
import { z } from "zod"

const BasicForm = () => {
  const formControl = useForm()

  const fieldsGroups: ICustomField[][] = [
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
      },
    ],
  ]

  const handleSubmit = (data: unknown) => {
    console.log({ success: data })
  }

  return (
    <CustomForm
      fieldsGroups={fieldsGroups}
      onSubmit={formControl.handleSubmit(handleSubmit)}
      formControl={formControl}
    />
  )
}

const Fields = z.object({
  username: z.string(),
  age: z.string(),
})

type FieldTypes = z.infer<typeof Fields>

function FormWithZod() {
  const formControl = useForm<FieldTypes>({
    resolver: zodResolver(Fields),
  })

  const fieldsGroups: ICustomField<FieldTypes>[][] = [
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
  ]

  const onSubmit = (data: FieldTypes) => {
    console.log({ success: data })
  }

  return (
    <CustomForm
      fieldsGroups={fieldsGroups}
      onSubmit={formControl.handleSubmit(onSubmit, (fail) =>
        console.log({ fail })
      )}
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
