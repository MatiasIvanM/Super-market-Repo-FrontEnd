import styles from './Overlay.module.css'
import React from 'react';

export default function Overlay() {
    return (
        <div>
            <svg
                viewBox='0 0 100 100'
                className={styles.svg}>
                <path d="M 0 0 L 0 100 L 60 0" />
            </svg>
            <img
                src={`${process.env.PUBLIC_URL}/cart.png`}
                alt="Imagen en blanco"
                className={styles.cart}
                
            />
        </div >
    )
}

