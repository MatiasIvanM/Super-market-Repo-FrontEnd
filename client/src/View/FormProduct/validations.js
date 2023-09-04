//Aun no esta implementado, validation basic
export const validateName = (name) => {
    if (!name) {
      return 'El campo nombre es requerido';
    }
    if (name.length > 10) {
      return 'El campo nombre no puede tener más de 10 caracteres';
    }
    return ''; // Retorna una cadena vacía si la validación es exitosa
  };
  
  export const validatePrice = (price) => {
    if (!price) {
      return 'El campo Price es requerido';
    }
    return ''; // Retorna una cadena vacía si la validación es exitosa
  };
  
  export const validateDescription = (description) => {
    if (!description) {
      return 'El campo Description es requerido';
    }
    return ''; // Retorna una cadena vacía si la validación es exitosa
  };
  
  export const validateImage = (image) => {
    if (!image) {
      return 'El campo Image es requerido';
    }
    if (!/^https?:\/\/\S+$/.test(image)) {
      return 'URL de imagen no válida';
    }
    return ''; // Retorna una cadena vacía si la validación es exitosa
  };
  
  export const validateStock = (stock) => {
    if (!stock) {
      return 'El campo stock es requerido';
    }
    return ''; // Retorna una cadena vacía si la validación es exitosa
  };
  
  export const validateBrand = (brand) => {
    if (!brand) {
      return 'El campo brand es requerido';
    }
    return ''; // Retorna una cadena vacía si la validación es exitosa
  };
  
  export const validateExpirationDate = (expirationDate) => {
    if (!expirationDate) {
      return 'El campo Expiration date es requerido';
    }
    return ''; // Retorna una cadena vacía si la validación es exitosa
  };
  
  export const validateCategories = (categories) => {
    if (!categories) {
      return 'El campo Categories es requerido';
    }
    return ''; // Retorna una cadena vacía si la validación es exitosa
  };
