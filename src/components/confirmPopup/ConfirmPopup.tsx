import { ConfirmPopupProps } from "../../types";
import styles from "./confirmPopup.module.css";

function ConfirmPopup({ message, onConfirm, onCancel }: ConfirmPopupProps) {
  return (
    <div className={styles.confirmPopup}>
      <div className={styles.container}>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPopup;
