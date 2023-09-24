import styles from './Overlay.module.css'

export default function Overlay() {
    return (
        <div>
            <svg
                viewBox='0 0 100 100'
                className={styles.svg}>
                <path d="M 0 0 L 0 100 L 60 0" />
            </svg>
        </div >
    )
}

