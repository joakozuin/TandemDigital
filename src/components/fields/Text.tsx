// fields/Text.tsx
import { UseFormRegister, FieldErrors } from "react-hook-form";
import styles from "../Form.module.css";
import { FieldConfig } from "@/types/form";
import { getValidationRules } from "@/utils/validationUtils"; 

type FormData = {
  [key: string]: string | number | boolean;
};

interface Props {
  field: FieldConfig;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const Text = ({ field, register, errors }: Props) => (
  <div className={styles.inputGroup}>
    <label className={styles.label}>{field.label}</label>
    <input
      {...register(field.name, getValidationRules(field.validations || []))} 
      defaultValue={field.default}
      maxLength={field.maxLength}
      className={styles.input}
    />
    {errors[field.name] && (
      <p className={styles.error}>{errors[field.name]?.message as string}</p>
    )}
  </div>
);
