import { useAuth0 } from "@auth0/auth0-react"

export default function Profile() {
    const { logout, isAuthenticated } = useAuth0()

    function handleLogout() {
        isAuthenticated && logout()
        localStorage.clear()
    }

    return (
        <>
            <h1>{`Usuario: ${JSON.parse(localStorage.getItem('customer')).name}`}</h1>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}