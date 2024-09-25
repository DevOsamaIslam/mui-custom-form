# 📝 CustomForm

`CustomForm` is a versatile React form component designed to simplify your form-building journey. Powered by MUI components and the flexibility of `react-hook-form`, this package offers an intuitive way to create dynamic and responsive forms with a wide range of field types and customization options.

## 📚 Table of Contents

- [🛠 Installation](#installation)
- [✨ Features](#features)
- [🚀 Usage](#usage)
  - [🔧 Props](#props)
    - [CustomForm Component](#customform-component)
    - [CustomField Configuration](#customfield-configuration)
  - [🧩 Custom Components](#custom-components)
- [📖 Examples](#examples)
  - [Basic Form](#basic-form)
  - [Form with Zod Validation](#form-with-zod-validation)
  - [Comprehensive Example with All Field Types](#comprehensive-example-with-all-field-types)
- [🤝 Contribution](#contribution)
- [📜 License](#license)

## 🛠 Installation

```bash
npm install mui-custom-form
```

## ✨ Features

- 🎛 **Dynamic Field Types**: Supports a wide range of field types including `text`, `number`, `password`, `textarea`, `date`, `file`, `switch`, `checkbox-group`, `radio-group`, and `custom` components.
- 🎨 **MUI Integration**: Seamlessly integrates with Material-UI components for a consistent and polished UI.
- 📱 **Responsive Design**: Utilizes MUI's grid system to ensure forms are responsive and well-organized across different screen sizes.
- 🛠 **Customizable Input Props**: Allows passing additional properties to input fields for enhanced customization.
- 🧩 **Custom Components**: Enables integration of custom components that adhere to the `value` and `onChange` interface, providing maximum flexibility.
- 🔄 **Form Control Integration**: Leverages `react-hook-form` for efficient form state management and validation.
- 🧰 **Validation Support**: Supports schema-based validation with Zod.

## 🚀 Usage

### 🔧 Props

#### CustomForm Component

| Name                     | Description                                                        | Is Required? |
| ------------------------ | ------------------------------------------------------------------ | ------------ |
| `fieldsGroups`           | 2D array representing groups of fields in the form.                | **Yes**      |
| `onSubmit`               | Tuple containing functions for form submission and error handling. | **Yes**      |
| `formControl`            | Control object from `react-hook-form`.                             | **Yes**      |
| `submitButton`           | Boolean or `ButtonProps` to toggle and customize the submit button.| **No**       |
| `resetButton`            | Boolean or `ButtonProps` to toggle and customize the reset button. | **No**       |
| `actionButtonsPlacement` | CSS property for button placement (e.g., `flex-end`, `center`).    | **No**       |
| `otherProps`             | Any additional props to pass down to the form component.           | **No**       |

#### CustomField Configuration

| Name         | Description                                 | Is Required?     |
| ------------ | ------------------------------------------- | ---------------- |
| `label`      | The display label of the field.             | **Yes**          |
| `name`       | The name attribute of the field.            | **Yes**          |
| `type`       | The type of the field.                      | **Yes**          |
| `list`       | An array of options for select type fields. | *Conditional*    |
| `required`   | Is the field mandatory?                     | **No**           |
| `otherProps` | Any additional props.                       | **No**           |
| `span`       | Grid span for the field (1-12).             | **No**           |
| `component`  | Custom React component for the field.       | *Conditional*    |

> **Notes**: 
> - The `list` prop is **required** when the `type` is `single-select`, `multi-select`, `checkbox-group`, or `radio-group`.
> - The `component` prop is **required** when the `type` is `custom`.

### 🧩 Custom Components

To integrate custom components into your forms, ensure they adhere to the `CustomComponentProps` interface, which requires `value` and `onChange` props.

```typescript
export interface CustomComponentProps {
  value: any;
  onChange: (value: any) => void;
  [key: string]: any; // Allow additional props
}
```

**Example of a Custom Component:**

```tsx
// CustomComponents.tsx
import React from "react";
import { TextField } from "@mui/material";
import { CustomComponentProps } from "./types";

export const CustomTextComponent: React.FC<CustomComponentProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <TextField
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      fullWidth
    />
  );
};
```

## 📖 Examples

### Basic Form

A simple form demonstrating basic field types like `text` and `date`.

```tsx
// BasicForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { CustomForm } from "mui-custom-form";
import { IFieldGroup } from "mui-custom-form/types";

const BasicForm = () => {
  const formControl = useForm<{ username: string; birthdate: string }>();

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
        label: "Birthdate",
        name: "birthdate",
        type: "date",
        required: true,
        span: 6,
      },
    ],
  ];

  const handleSubmit = (data: { username: string; birthdate: string }) => {
    console.log({ success: data });
  };

  const submitError = (errors: any) => {
    console.log({ error: errors });
  };

  return (
    <CustomForm
      fieldsGroups={fieldsGroups}
      onSubmit={[handleSubmit, submitError]}
      formControl={formControl}
    />
  );
};

export default BasicForm;
```

### Form with Zod Validation

A form demonstrating advanced field types and schema-based validation using Zod.

```tsx
// FormWithZod.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomForm } from "mui-custom-form";
import { IFieldGroup } from "mui-custom-form/types";

const GENDERS = ["Male", "Female", "Other"] as const;
const HOBBIES = ["Coding", "Collections", "Hiking"] as const;

const Fields = z.object({
  username: z.string().min(1, "Username is required"),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(16, "Minimum age is 16")
    .max(80, "Maximum age is 80"),
  gender: z.enum(GENDERS, { required_error: "Gender is required" }),
  hobbies: z
    .array(z.enum(HOBBIES), { required_error: "Hobbies are required" })
    .nonempty("Please choose at least one hobby"),
  birthDate: z.date({ required_error: "Birthdate is required" }),
  file: z.instanceof(File).optional(),
});

type FieldTypes = z.infer<typeof Fields>;

const FormWithZod = () => {
  const formControl = useForm<FieldTypes>({
    resolver: zodResolver(Fields),
    defaultValues: {
      hobbies: [],
    },
  });

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
        label: "Age",
        name: "age",
        type: "number",
        required: true,
        otherProps: { min: 16, max: 80 },
        span: 6,
      },
    ],
    [
      {
        label: "Gender",
        name: "gender",
        type: "radio-group",
        list: GENDERS.map((gender) => ({ label: gender, value: gender })),
        required: true,
        otherProps: { row: true },
        span: 6,
      },
      {
        label: "Hobbies",
        name: "hobbies",
        type: "checkbox-group",
        list: HOBBIES.map((hobby) => ({ label: hobby, value: hobby })),
        required: true,
        span: 6,
      },
    ],
    [
      {
        label: "Birthdate",
        name: "birthDate",
        type: "date",
        required: true,
        span: 6,
      },
      {
        label: "Upload Image",
        name: "file",
        type: "file",
        required: false,
        span: 6,
      },
    ],
  ];

  const onSubmit = (data: FieldTypes) => {
    console.log({ success: data });
  };

  const submitError = (errors: any) => {
    console.log({ errors });
  };

  return (
    <CustomForm
      fieldsGroups={fieldsGroups}
      onSubmit={[onSubmit, submitError]}
      formControl={formControl}
    />
  );
};

export default FormWithZod;
```

### Comprehensive Example with All Field Types

An extensive example showcasing all supported field types, customizable input props, and custom components.

```tsx
// ComprehensiveForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container, Typography, ButtonProps } from "@mui/material";
import { CustomForm } from "mui-custom-form";
import { IFieldGroup } from "mui-custom-form/types";
import {
  CustomTextComponent,
  DateRangePickerComponent,
} from "./CustomComponents"; // Ensure correct import path

const GENDERS = ["Male", "Female", "Other"] as const;
const HOBBIES = ["Coding", "Collections", "Hiking"] as const;

const Fields = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  bio: z.string().optional(),
  subscribe: z.boolean().optional(),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(16, "Minimum age is 16")
    .max(80, "Maximum age is 80"),
  gender: z.enum(GENDERS, { required_error: "Gender is required" }),
  hobbies: z
    .array(z.enum(HOBBIES), { required_error: "Hobbies are required" })
    .nonempty("Please choose at least one hobby"),
  birthDate: z.date({ required_error: "Birthdate is required" }),
  file: z.instanceof(File).optional(),
  customField: z.string().optional(),
  eventDates: z
    .tuple([z.date().nullable(), z.date().nullable()])
    .optional(),
});

type FieldTypes = z.infer<typeof Fields>;

const ComprehensiveForm = () => {
  const formControl = useForm<FieldTypes>({
    resolver: zodResolver(Fields),
    defaultValues: {
      subscribe: false,
      hobbies: [],
      eventDates: [null, null],
    },
  });

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
        label: "Birthdate",
        name: "birthDate",
        type: "date",
        required: true,
        span: 6,
      },
    ],
    [
      {
        label: "Event Dates",
        name: "eventDates",
        type: "custom",
        component: DateRangePickerComponent,
        required: false,
        span: 6,
      },
      {
        label: "Upload Image",
        name: "file",
        type: "file",
        required: false,
        span: 6,
      },
    ],
    [
      {
        label: "Custom Text Field",
        name: "customField",
        type: "custom",
        component: CustomTextComponent,
        required: false,
        otherProps: { placeholder: "Custom input here" },
        span: 12,
      },
    ],
  ];

  const onSubmit = (data: FieldTypes) => {
    console.log({ success: data });
  };

  const submitError = (errors: any) => {
    console.log({ errors });
  };

  const submitButtonProps: ButtonProps = {
    variant: "contained",
    color: "primary",
  };

  const resetButtonProps: ButtonProps = {
    variant: "outlined",
    color: "secondary",
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Comprehensive Form
      </Typography>
      <CustomForm
        fieldsGroups={fieldsGroups}
        onSubmit={[onSubmit, submitError]}
        formControl={formControl}
        submitButton={submitButtonProps}
        resetButton={resetButtonProps}
        actionButtonsPlacement="flex-end"
        otherProps={{ spacing: 2 }}
      />
    </Container>
  );
};

export default ComprehensiveForm;
```

## 🤝 Contribution

Your contributions are always welcome! Whether it's reporting bugs, suggesting features, or submitting pull requests, we appreciate your support in making `CustomForm` better for everyone.

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m "Add YourFeature"
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/YourFeature
   ```
5. **Open a Pull Request**

Please ensure your code follows the project's coding standards and includes relevant tests where applicable.

## 📜 License

This project is licensed under the [MIT license](https://github.com/DevOsamaIslam/mui-custom-form/blob/master/LICENSE).

---

If you have any questions or need further assistance, feel free to reach out or open an issue in the repository!

---

## 🤝 Contribution

Your contributions are always welcome!
