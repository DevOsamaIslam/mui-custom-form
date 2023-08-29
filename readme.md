# 📝 CustomForm

`CustomForm` is a versatile React form component designed to simplify your form-building journey. Powered by MUI components and the flexibility of `react-hook-form`, this package offers an intuitive way to create dynamic and responsive forms.

## 📚 Table of Contents

- [🛠 Installation](#installation)
- [✨ Features](#features)
- [🚀 Usage](#usage)
  - [🔧 Props](#props)
- [📖 Examples](#examples)
- [🤝 Contribution](#contribution)
- [📜 License](#license)

## 🛠 Installation

```bash
npm install mui-custom-form
```

📦 **Dependencies**:

- `@mui/material`
- `@mui/x-date-pickers`
- `react-hook-form`

## ✨ Features

- 🎛 **Dynamic Field Types**
- 🎨 **MUI Integration**
- 📱 **Responsive Design**

## 🚀 Usage

### 🔧 Props

#### CustomForm Component

| Name                     | Description                                                        | Is Required? |
| ------------------------ | ------------------------------------------------------------------ | ------------ |
| `fieldsGroups`           | 2D array representing groups of fields in the form.                | Yes          |
| `onSubmit`               | Array containing functions for form submission and error handling. | Yes          |
| `formControl`            | Control object from `react-hook-form`.                             | Yes          |
| `submitButton`           | Boolean to toggle the visibility of the submit button.             | No           |
| `resetButton`            | Boolean to toggle the visibility of the reset button.              | No           |
| `actionButtonsPlacement` | CSS property for button placement.                                 | No           |
| `otherProps`             | Any additional props to pass down to the form component.           | No           |

#### CustomField 2D Array

| Name         | Description                                 | Is Required? |
| ------------ | ------------------------------------------- | ------------ |
| `label`      | The display label of the field.             | Yes          |
| `name`       | The name attribute of the field.            | Yes          |
| `type`       | The type of the field.                      | Yes          |
| `list`       | An array of options for select type fields. | Conditional  |
| `required`   | Is the field mandatory?                     | No           |
| `otherProps` | Any additional props.                       | No           |
| `span`       | Grid span for the field.                    | No           |

#### \* `list` prop is required when the type is `single-select` or `multi-select`.

---

## 📖 Examples

### Basic Form

```ts
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
```

### Form with Zod Validation

```ts
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

const FormWithZod = () => {
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
```

---

## 🤝 Contribution

Your contributions are always welcome!
