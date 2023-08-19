## CustomForm

`CustomForm` is a versatile React form component designed to streamline the form-building process. Utilizing the power of MUI components and the flexibility of `react-hook-form`, this package offers an intuitive way to create dynamic and responsive forms.

### Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
  - [Props](#props)
- [Example](#example)
- [Contribution](#contribution)
- [License](#license)

### Installation

To add `CustomForm` to your project, use the following command:

```bash
npm install mui-custom-form
```

Ensure that you have the required peer dependencies installed:

- `@mui/material`
- `@mui/x-date-pickers`
- `react-hook-form`

### Features

- **Dynamic Field Types**: Supports text, number, single-select, multi-select, date, and file input types.
- **MUI Integration**: Seamless integration with MUI components for a consistent and professional look.
- **Responsive Design**: Adaptable grid system, ensuring your form looks great on all devices.

### Usage

#### Props

- CustomForm component

| Name           | Description                                              |
| -------------- | -------------------------------------------------------- |
| `fieldsGroups` | 2D array representing groups of fields in the form.      |
| `onSubmit`     | Function called upon form submission.                    |
| `formControl`  | Control object from `react-hook-form`.                   |
| `submitButton` | Boolean to toggle the visibility of the submit button.   |
| `otherProps`   | Any additional props to pass down to the form component. |

- CustomField 2D array

The `ICustomField` interface is used to define each field in the form. Below are its properties:

| Name         | Description                                                                               |
| ------------ | ----------------------------------------------------------------------------------------- |
| `label`      | The display label of the field.                                                           |
| `name`       | The name attribute of the field, used for form data identification.                       |
| `type`       | The type of the field, determining its behavior and appearance.                           |
| `list`       | An array of options for select type fields. Each option has a label and a value.          |
| `required`   | Indicates whether the field is mandatory or not.                                          |
| `otherProps` | Any additional props to pass to the underlying MUI component.                             |
| `span`       | A number between 1 and 12, representing the grid span for the field in MUI's grid system. |

The `list` array, has the following structure:

| Name    | Description                                                |
| ------- | ---------------------------------------------------------- |
| `icon`  | An optional icon to display alongside the option.          |
| `label` | The display label of the option.                           |
| `value` | The value of the option, used when the option is selected. |

---

### Example

Here's a simple example showcasing how to implement a `CustomForm`:

```typescript
const MyComponent = () => {
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
```

Usage with zod

```typescript
const Fields = z.object({
  username: z.string(),
  age: z.string(),
})

type FieldTypes = z.infer<typeof Fields>

function MyComponent() {
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

```

### Contribution

Your contributions are always welcome! Please create a pull request and we'll review your suggestion.

---
