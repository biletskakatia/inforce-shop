import css from './ConfirmModal.module.css';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <p>{message || 'Are you sure you want to delete this item?'}</p>

                <div className={css.buttons}>
                    <button onClick={onConfirm} className={css.confirm}>Confirm</button>
                    <button onClick={onCancel} className={css.cancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default ConfirmModal;