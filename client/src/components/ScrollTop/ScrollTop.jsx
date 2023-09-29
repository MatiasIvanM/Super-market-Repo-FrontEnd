import styles from './ScrollTop.module.css'
import { Button } from 'react-bootstrap'

export default function ScrollTop() {
    function handleButton() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
    return (
        <button
            onClick={handleButton}
            size='lg'
            className={styles.button}
        >↑</button>
    )
}