export default function Overlay() {
    return (
        <div>
            <svg
                viewBox='0 0 100 100'
                style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    fill: '#0d6efd',
                    zIndex: '-3',
                }}>
                <path d="M 0 0 L 0 100 L 60 0" />
            </svg>
        </div >
    )
}

