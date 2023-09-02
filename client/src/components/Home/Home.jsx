import Nav from 'react-bootstrap/Nav';
import styles from './Home.module.css'
import CardProducto from '../CardProducto/CardProducto'

const products = [
	{
		"id": "26c981eb-3522-4955-b6bc-45c22bf181cf",
		"name": "Gaseosa",
		"price": 227,
		"description": "500mlSinAzucar",
		"image": "https://www.realonline.com.py/media/catalog/product/cache/15227f334d686c2b2a7b4195f8ac0289/7/8/7840058000019.jpg",
		"stock": 100,
		"brand": "CocaCola",
		"expirationdate": "2023-12-20T03:00:00.000Z",
		"categories": "Bebidas"
	},
	{
		"id": "7ea39465-aae6-4f5c-9931-50e749bd895e",
		"name": "Agua Saborizada",
		"price": 412,
		"description": "2.25 litros Sabor Pomelo",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/249162-800-auto?v=638181572330330000&width=800&height=auto&aspect=true",
		"stock": 100,
		"brand": "Levité",
		"expirationdate": "2023-12-20T03:00:00.000Z",
		"categories": "Bebidas"
	},
	{
		"id": "2d25067d-80f3-4f89-bc61-6b037c0f2f0d",
		"name": "Vino Tinto",
		"price": 1.099,
		"description": "Malbec trapiche 750ml",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/253505-800-auto?v=638211303958930000&width=800&height=auto&aspect=true",
		"stock": 100,
		"brand": "Origen",
		"expirationdate": "2050-12-20T03:00:00.000Z",
		"categories": "Bebidas"
	},
	{
		"id": "adfb5700-b650-4348-a706-63d5e5e8661e",
		"name": "Agua Mineral",
		"price": 116,
		"description": "Agua mineral con gas 1.5 litros",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/257217-800-auto?v=638255448810930000&width=800&height=auto&aspect=true",
		"stock": 100,
		"brand": "Eco de los Andes",
		"expirationdate": "2050-12-20T03:00:00.000Z",
		"categories": "Bebidas"
	},
	{
		"id": "ef844b9b-f81d-4b4c-8e9f-31d118d70a6c",
		"name": "Cerveza",
		"price": 515,
		"description": "Ipa 473 ml",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/255198-800-auto?v=638230485958200000&width=800&height=auto&aspect=true",
		"stock": 150,
		"brand": "Quilmes",
		"expirationdate": "2024-12-20T03:00:00.000Z",
		"categories": "Bebidas"
	},
	{
		"id": "92f6b6a4-3667-46ba-a69b-c3f0f3f9bb85",
		"name": "Aceite de Girasol",
		"price": 568,
		"description": "Aceite 1.5 litros",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/254949-800-auto?v=638230480635400000&width=800&height=auto&aspect=true",
		"stock": 500,
		"brand": "Cañuelas",
		"expirationdate": "2023-11-25T03:00:00.000Z",
		"categories": "Aceites y Aderezos"
	},
	{
		"id": "6f27a956-a5a0-47b5-bec0-1afcd6027606",
		"name": "Sal Fina",
		"price": 210,
		"description": "Celusal 500gr",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/184595-800-auto?v=637427546564070000&width=800&height=auto&aspect=true",
		"stock": 300,
		"brand": "Celusal",
		"expirationdate": "2023-11-25T03:00:00.000Z",
		"categories": "Aceites y Aderezos"
	},
	{
		"id": "3ef88a3b-5f3a-4626-b700-9adace920176",
		"name": "Kepchup",
		"price": 345,
		"description": "DoyPack 250gr",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/194288-800-auto?v=637528642837700000&width=800&height=auto&aspect=true",
		"stock": 350,
		"brand": "Hellmanns",
		"expirationdate": "2023-11-25T03:00:00.000Z",
		"categories": "Aceites y Aderezos"
	},
	{
		"id": "3adcfb60-c11e-4ab2-b208-3858f1de7414",
		"name": "Mayonesa",
		"price": 390,
		"description": "Mayonesa 500ml",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/255623-800-auto?v=638235663680400000&width=800&height=auto&aspect=true",
		"stock": 200,
		"brand": "Natura",
		"expirationdate": "2023-12-18T03:00:00.000Z",
		"categories": "Aceites y Aderezos"
	},
	{
		"id": "9c07963d-0433-46d5-b67e-62e407dc609a",
		"name": "Vinagre",
		"price": 345,
		"description": "Vinagre de alcohol 1Litro",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/216513-800-auto?v=637722290139600000&width=800&height=auto&aspect=true",
		"stock": 280,
		"brand": "Menoyo",
		"expirationdate": "2026-11-25T03:00:00.000Z",
		"categories": "Aceites y Aderezos"
	},
	{
		"id": "4616adb8-390a-4419-b645-945eb79c262d",
		"name": "Arroz",
		"price": 147,
		"description": "Grano Selecto Largo Fino 500 Gr.",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/257760-800-auto?v=638260705949400000&width=800&height=auto&aspect=true",
		"stock": 500,
		"brand": "Molinos Ala",
		"expirationdate": "2030-11-25T03:00:00.000Z",
		"categories": "Arroz y Legumbres"
	},
	{
		"id": "f02825ed-2da1-4c0e-af87-7479e3f639b4",
		"name": "Maiz",
		"price": 485,
		"description": "Maiz pelado blanco  400gr",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/249699-800-auto?v=638185522292830000&width=800&height=auto&aspect=true",
		"stock": 280,
		"brand": "Egran",
		"expirationdate": "2024-01-25T03:00:00.000Z",
		"categories": "Arroz y Legumbres"
	},
	{
		"id": "058dd802-1896-4e79-afc5-8c29166a5d7c",
		"name": "Arvejas",
		"price": 668,
		"description": "Arvejas Partidas Egran 400gr",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/249694-800-auto?v=638185522187030000&width=800&height=auto&aspect=true",
		"stock": 374,
		"brand": "Egran",
		"expirationdate": "2027-12-18T03:00:00.000Z",
		"categories": "Arroz y Legumbres"
	},
	{
		"id": "86fbc29a-c212-41bd-9d5f-61fcbb00e838",
		"name": "Arroz Integral",
		"price": 329,
		"description": "Arroz Integral Gallo 500 Gr",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/259125-800-auto?v=638279758297500000&width=800&height=auto&aspect=true",
		"stock": 280,
		"brand": "Gallo",
		"expirationdate": "2026-11-25T03:00:00.000Z",
		"categories": "Arroz y Legumbres"
	},
	{
		"id": "c5339e39-ef6e-4e4a-92f8-1f84d4c42e71",
		"name": "Semillas de Chia",
		"price": 569,
		"description": "Semillas de Chía Enteras 100 Gr",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/195348-800-auto?v=637539026796370000&width=800&height=auto&aspect=true",
		"stock": 280,
		"brand": "Conosur",
		"expirationdate": "2026-01-25T03:00:00.000Z",
		"categories": "Arroz y Legumbres"
	},
	{
		"id": "8ec0ce20-8fa7-45be-92ab-7d29888eec78",
		"name": "Zanahoria",
		"price": 249,
		"description": "Zanahoria x Kg",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/238437-800-auto?v=638079188471270000&width=800&height=auto&aspect=true",
		"stock": 100,
		"brand": "Sin Marca",
		"expirationdate": "2023-12-20T03:00:00.000Z",
		"categories": "Frutas y Verduras"
	},
	{
		"id": "106122dc-39ae-451b-bfaa-d32423aaeebf",
		"name": "Zapallo",
		"price": 219,
		"description": "Zapallo x 1 Kg.",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/221046-800-auto?v=637813801798230000&width=800&height=auto&aspect=true ",
		"stock": 150,
		"brand": "Sin Marca",
		"expirationdate": "2023-09-20T04:00:00.000Z",
		"categories": "Frutas y Verduras"
	},
	{
		"id": "5f392136-f0f5-431e-a640-131eee88e840",
		"name": "Pera",
		"price": 399,
		"description": "Pera x 1 Kg",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/238428-800-auto?v=638079188283470000&width=800&height=auto&aspect=true",
		"stock": 100,
		"brand": "Sin Marca",
		"expirationdate": "2023-09-10T04:00:00.000Z",
		"categories": "Frutas y Verduras"
	},
	{
		"id": "a0b52f7d-0753-47a1-b172-091bc5cc3195",
		"name": "Banana",
		"price": 638,
		"description": "Banana x 1 Kg.",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/238425-800-auto?v=638079188208730000&width=800&height=auto&aspect=true",
		"stock": 150,
		"brand": "Sin Marca",
		"expirationdate": "2023-09-10T04:00:00.000Z",
		"categories": "Frutas y Verduras"
	},
	{
		"id": "dc0d0b45-768f-4c22-a852-b344e241600c",
		"name": "Batata",
		"price": 469,
		"description": "Batata x 1 Kg",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/238419-800-auto?v=638079188096670000&width=800&height=auto&aspect=true",
		"stock": 50,
		"brand": "Sin Marca",
		"expirationdate": "2023-09-10T04:00:00.000Z",
		"categories": "Frutas y Verduras"
	},
	{
		"id": "eed6a202-6227-475f-bc26-13384e5f7982",
		"name": "Pan Rallado",
		"price": 282,
		"description": "Pan Rallado Mamá Cocina 1 Kg.",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/230332-800-auto?v=638018673829100000&width=800&height=auto&aspect=true",
		"stock": 150,
		"brand": "Mamá Cocina",
		"expirationdate": "2023-09-01T04:00:00.000Z",
		"categories": "Panadería"
	},
	{
		"id": "55b30238-07b9-46f7-b5ee-5ed89d995c07",
		"name": "Pan Mignon",
		"price": 36,
		"description": "Pan Mignon x Un.",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/187653-800-auto?v=637427610486870000&width=800&height=auto&aspect=true",
		"stock": 35,
		"brand": "Sin Marca",
		"expirationdate": "2023-08-30T04:00:00.000Z",
		"categories": "Panadería"
	},
	{
		"id": "f7cc58e1-4bd0-4195-aad2-508ce75af824",
		"name": "Pan Flauta",
		"price": 72,
		"description": "Pan Flauta x Un.",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/187650-800-auto?v=637427610432600000&width=800&height=auto&aspect=true",
		"stock": 50,
		"brand": "Sin Marca",
		"expirationdate": "2023-09-10T04:00:00.000Z",
		"categories": "Panadería"
	},
	{
		"id": "369116be-4dfe-470a-b0d6-77fd2da7d1ff",
		"name": "Pan Rallado",
		"price": 204,
		"description": "Pan Rallado DIA 500 Gr.",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/237387-800-auto?v=638074063223630000&width=800&height=auto&aspect=true",
		"stock": 80,
		"brand": "Sin Marca",
		"expirationdate": "2023-08-30T04:00:00.000Z",
		"categories": "Panadería"
	},
	{
		"id": "3645bf61-d6a0-4345-937d-e90d167ea13d",
		"name": "Pan Multicereal",
		"price": 729,
		"description": "Pan Multicereal Familiar 650 Gr",
		"image": "https://ardiaprod.vtexassets.com/arquivos/ids/257476-800-auto?v=638259832960770000&width=800&height=auto&aspect=true",
		"stock": 85,
		"brand": "Sin Marca",
		"expirationdate": "2023-08-30T04:00:00.000Z",
		"categories": "Panadería"
	},
	{
		"id": "642dee83-fb6f-4066-a824-d7e3450d18cd",
		"name": "Producto de ejemplo",
		"price": 19.99,
		"description": "Descripción del producto",
		"image": "imagen.jpg",
		"stock": 10,
		"brand": "Marca Ejemplo",
		"expirationdate": "2023-12-31T00:00:00.000Z",
		"categories": "Categoría Ejemplo"
	}
];

export default function Home() {
    return (
        <div className={styles.container}>

            <Nav className={styles.side_bar}>
                <Nav.Item>
                    Filtrado
                </Nav.Item>
                <Nav.Item>
                    Ordenamientos
                </Nav.Item>
                <Nav.Item>
                    {/* <input type="number" placeholder='Min' style={{ width: '30%' }} />
                    <span> - </span>
                    <input type="number" placeholder='Max' style={{ width: '30%' }} /> */}
                </Nav.Item>
            </Nav>

            <div className={styles.card_container}>
                {products.map(p => (
                    <CardProducto
                        id = {p.id}
                        name = {p.name}
                        image = {p.image}
                        description={p.description}
                        price = {p.price}
                        rating='5'
                    >
                    </CardProducto>
                ))}
            </div>

        </div >
    )
}