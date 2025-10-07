export interface ValidationRule {
    type: string;
    message: string;
    value?: number;
    pattern?: string;
    rules?: {
      noNumbers?: boolean;
    };
  }
  
  export interface FieldConfig {
    name: string;
    label: string;
    type: string;
    default: string | number;
    maxLength?: number;
    required: boolean;
    validations: ValidationRule[];
    options?: string[];
  }
  
  export interface FormConfig {
    formTitle: string;
    fields: FieldConfig[];
  }
