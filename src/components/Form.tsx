"use client";

import { useForm, UseFormRegister, FieldErrors, SubmitHandler } from "react-hook-form";
import formJson from "@/config/formConfig.json";
import { FieldConfig } from "@/types/form";
import { Text } from "./fields/Text";
import { Number } from "./fields/Number";
import { Select } from "./fields/Select";
import styles from "./Form.module.css";
import Swal from "sweetalert2";

type FormValues = {
  [key: string]: string | number | boolean;
};

const getFieldComponent = (
  field: FieldConfig,
  register: UseFormRegister<FormValues>,
  errors: FieldErrors<FormValues>
) => {
  switch (field.type) {
    case "text":
    case "email":
      return <Text key={field.name} field={field} register={register} errors={errors} />;
    case "number":
      return <Number key={field.name} field={field} register={register} errors={errors} />;
    case "selectable":
      return <Select key={field.name} field={field} register={register} errors={errors} />;
    default:
      return null;
  }
};

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm<FormValues>();

  //nota 
  //Después de guardar los datos, se llama a la función reset() para limpiar los valores del formulario
  
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    try {
      // Obtener los datos previamente guardados en localStorage
      const storedData = localStorage.getItem("formData");
      const parsedData = storedData ? JSON.parse(storedData) : [];

      // Agregar los nuevos datos al array existente
      parsedData.push(data);

      // Guardar el array actualizado en localStorage
      localStorage.setItem("formData", JSON.stringify(parsedData));

      // Mostrar mensaje de éxito con SweetAlert
      Swal.fire({
        title: "¡Formulario guardado!",
        text: "Tu información fue guardada correctamente en el almacenamiento local.",
        icon: "success",
        confirmButtonColor: "#512da8",
        confirmButtonText: "OK",
      });

      // Limpiar el formulario
      reset(); // Restablecer los valores del formulario
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al guardar el formulario. Por favor, intenta nuevamente.",
        icon: "error",
        confirmButtonColor: "#d32f2f",
      });
    }

    console.log("Datos guardados:", data);
  };

  const onError = (formErrors: FieldErrors<FormValues>) => {
    Swal.fire({
      title: "Error",
      text: "Hay campos obligatorios vacíos o con errores. Por favor, revisá el formulario.",
      icon: "error",
      confirmButtonColor: "#d32f2f",
    });

    console.log("Errores:", formErrors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.formContainer}>
      <h2 className={styles.title}>{formJson.formTitle}</h2>

      {formJson.fields.map((field: FieldConfig) =>
        getFieldComponent(field, register, errors)
      )}

      <button type="submit" className={styles.submitButton}>
        Enviar
      </button>
    </form>
  );
}

