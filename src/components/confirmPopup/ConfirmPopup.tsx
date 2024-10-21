import styles from "./confirmPopup.module.css";

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmPopup({ message, onConfirm, onCancel }: Props) {
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
