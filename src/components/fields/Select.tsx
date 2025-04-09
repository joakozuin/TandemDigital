// fields/Select.tsx
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

export const Select = ({ field, register, errors }: Props) => (
  <div className={styles.inputGroup}>
    <label className={styles.label} htmlFor={field.name}>
      {field.label}
    </label>
    <select
      id={field.name}
      {...register(field.name, getValidationRules(field.validations || []))} 
      defaultValue={field.default}
      className={styles.select}
    >
      <option value="">Seleccione una opción</option>
      {field.options?.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
    {errors[field.name] && (
      <p className={styles.error}>{errors[field.name]?.message as string}</p>
    )}
  </div>
);
