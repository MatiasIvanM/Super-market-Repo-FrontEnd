export default function validate(data) {
    let errors = {}

    const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/

    if (!email.test(data.email) || data.email.length < 1) {
        errors = { ...errors, email: 'Mail inválido' }
    } else {
        errors = { ...errors, email: "" }
    }

    if (data.password.length < 1) {
        errors = { ...errors, password: 'Casilla vacía' }
    } else {
        errors = { ...errors, password: "" }
    }

    return errors
}
