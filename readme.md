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

| Name           | Description                                              |
| -------------- | -------------------------------------------------------- |
| `fieldsGroups` | 2D array representing groups of fields in the form.      |
| `onSubmit`     | Function called upon form submission.                    |
| `formControl`  | Control object from `react-hook-form`.                   |
| `submitButton` | Boolean to toggle the visibility of the submit button.   |
| `otherProps`   | Any additional props to pass down to the form component. |

### Example

Here's a simple example showcasing how to implement a `CustomForm`:

```typescript
import React from "react"
import { CustomForm } from "your-package-name"

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
    console.log(data)
  }

  return (
    <CustomForm
      fieldsGroups={fieldsGroups}
      onSubmit={formControl.handleSubmit(handleSubmit)}
      formControl={formControl}
    />
  )
}

export default MyComponent
```

Usage with zod

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
    console.log(data)
  }

  return (
    <CustomForm
      fieldsGroups={fieldsGroups}
      onSubmit={formControl.handleSubmit(handleSubmit)}
      formControl={formControl}
    />
  )
}

export default MyComponent
```

### Contribution

Your contributions are always welcome! Please create a pull request and we'll review your suggestion.

---
