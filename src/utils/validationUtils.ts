// utils/validationUtils.ts
import { RegisterOptions } from "react-hook-form";

type ValidationRule = {
  type: string;
  message: string;
  value?: number | string;
  pattern?: string;
  rules?: { [key: string]: boolean };
};

export const getValidationRules = (validations: ValidationRule[]): RegisterOptions => {
  const rules: RegisterOptions = {};

  validations.forEach((validation) => {
    switch (validation.type) {
      case "required":
        rules.required = validation.message;
        break;
      case "minLength":
        rules.minLength = { value: validation.value as number, message: validation.message };
        break;
      case "maxLength":
        rules.maxLength = { value: validation.value as number, message: validation.message };
        break;
      case "regex":
        rules.pattern = { value: new RegExp(validation.pattern || ""), message: validation.message };
        break;
      case "complex":
        if (validation.rules?.noNumbers) {
          rules.validate = (value: string | number | boolean) => {
            const stringValue = String(value); 
            return !/\d/.test(stringValue) || validation.message; 
          };
        }
        break;
      default:
        break;
    }
  });

  return rules;
};