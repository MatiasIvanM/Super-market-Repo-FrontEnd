import Nav from 'react-bootstrap/Nav';
import CardGroup from 'react-bootstrap/CardGroup';

export default function Home() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1vw',
            padding: '2vh 4vw 2vh 4vw',
            height: '90vh',
        }}>
            <Nav className='bg-light flex-column' style={{
                width: '15%',
                border: '0.1em grey solid',
                borderRadius: '15px',
            }}>
                <Nav.Item>
                    Filtrado
                </Nav.Item>
                <Nav.Item>
                    Ordenamientos
                </Nav.Item>
                <Nav.Item>
                    <input type="number" placeholder='Min' style={{ width: '30%' }} />
                    <span> - </span>
                    <input type="number" placeholder='Max' style={{ width: '30%' }} />
                </Nav.Item>
            </Nav>
            <CardGroup className='bg-light' style={{
                width: '85%',
                border: '0.1em grey solid',
                borderRadius: '15px',
            }} >
            </CardGroup>
        </div>
    )
}