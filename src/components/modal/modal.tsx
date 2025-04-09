"use client";
import styles from "./Modal.module.css";
import { FieldConfig } from "@/types/form";

// Tipo para los datos guardados en localStorage
type FormData = {
  [key: string]: string | number | boolean;
};

// Props del componente Modal
interface ModalProps {
  isOpen: boolean; // Controla si el modal está abierto
  onClose: () => void; // Función para cerrar el modal
  data: FormData[]; // Datos guardados en localStorage
  fields: FieldConfig[]; // Configuración de los campos del formulario
}

export const Modal = ({ isOpen, onClose, data, fields }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.title}>Productos Guardados</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              {fields.map((field) => (
                <th key={field.name}>{field.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {fields.map((field) => (
                  <td key={field.name}>{item[field.name]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose} className={styles.closeButton}>
          Cerrar
        </button>
      </div>
    </div>
  );
};