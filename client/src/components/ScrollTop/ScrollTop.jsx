import styles from './ScrollTop.module.css'
import { Button } from 'react-bootstrap'

export default function ScrollTop() {
    function handleButton() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
    return (
        <Button
            onClick={handleButton}
            size='lg'
            className={styles.button}
        >↑</Button>
    )
}