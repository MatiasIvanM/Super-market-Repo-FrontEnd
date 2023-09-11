export default function validate(data) {
    let errors = {}

    const onlyNumbers = /^[0-9]*$/
    const onlyLettersAndSpaces = /^[A-Za-z\s]*$/
    const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/
    const password = /(?=.*[0-9])/ //al menos 1 numero

    if (!onlyLettersAndSpaces.test(data.name)) {
        errors = { ...errors, name: 'El nombre solo debe tener letras y espacios' }
    } else if (data.name.length > 40 || data.name.length < 1) {
        errors = { ...errors, name: 'El nombre debe contener entre 1 y 40 caracteres' }
    } else {
        errors = { ...errors, name: "" }
    }

    if (!email.test(data.email) || data.email.length < 1) {
        errors = { ...errors, email: 'Mail inválido' }
    } else if (data.email.length > 40 || data.email.length < 1) {
        errors = { ...errors, email: 'El mail debe contener entre 1 y 40 caracteres' }
    } else {
        errors = { ...errors, email: "" }
    }

    if (data.address.length < 1) {
        errors = { ...errors, address: 'Dirección inválida' }
    } else if (data.address.length > 40 || data.address.length < 1) {
        errors = { ...errors, address: 'La dirección debe contener 1 y 40 caracteres' }
    } else {
        errors = { ...errors, address: "" }
    }

    if (!onlyNumbers.test(data.phone) || data.phone.length < 1) {
        errors = { ...errors, phone: 'Teléfono inválido' }
    } else if (data.phone.length > 13 || data.phone.length < 1) {
        errors = { ...errors, phone: 'El teléfono debe contener entre 1 y 13 caracteres' }
    } else {
        errors = { ...errors, phone: "" }
    }

    if (!password.test(data.password) || data.password.length < 1) {
        errors = { ...errors, password: 'Contraseña inválida' }
    } else if (data.password.length > 20 || data.password.length < 8) {
        errors = { ...errors, password: 'La contraseña debe contener entre 8 y 20 caracteres' }
    } else {
        errors = { ...errors, password: "" }
    }

    return errors
}