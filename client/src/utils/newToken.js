import { useAuth0 } from "@auth0/auth0-react"

export default function newToken() {
    const { isAuthenticated, getIdTokenClaims } = useAuth0()
    if (isAuthenticated) {
        
    }
}