export function validation(formData) {
    const errors = {};
    

    errors.name =
      formData.name.trim().length === 0 || formData.name.trim().length >= 60
        ? 'El nombre debe tener entre 1 y 60 caracteres'
        : '';
  
        errors.price =
        (formData.price.trim().length === 0 && formData.price !== '0') || parseFloat(formData.price) <= 0
          ? 'El precio debe ser un número mayor a 0'
          : '';
  
    errors.description =
      formData.description.trim().length === 0 || formData.description.trim().length >= 60
        ? 'Este campo es obligatorio'
        : '';
  
    // errors.image = !formData.image ? 'Selecciona una imagen' : '';
  
    errors.stock =
    formData.stock.trim() === ''
      ? 'El campo Stock no puede estar vacío'
      : isNaN(formData.stock) || parseInt(formData.stock) <= 0
      ? 'El stock debe ser un número mayor a 0'
      : '';
  
    errors.brand =
      formData.brand.trim() === ''
      ? 'Este campo es obligatorio'
      :  formData.brand.trim().length > 60 
        ? 'La marca debe tener menos de 60 caracteres'
        : '';
  
    errors.categories =
      formData.categories.trim().length === 0
        ? 'Las categorías no pueden estar vacías'
        : '';
  
    return errors;
  }