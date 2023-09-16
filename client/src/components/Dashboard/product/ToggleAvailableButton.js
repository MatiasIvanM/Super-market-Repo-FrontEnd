//

import React from "react";
import {
  useRecordContext,
  Button,
  useDataProvider,
} from "react-admin";


const ToggleAvailableButton = () => {
    const record = useRecordContext();
    const dataProvider = useDataProvider(); //useDataProvider para obtener dataProvider
    
    if (!record) {
      return null; // Evita errores si record es indefinido
    }
  
    const handleToggleAvailable = async () => {
      try {
        const currentValue = record.available;
        await dataProvider.update('products', {
          id: record.id,
          data: { available: !currentValue },
        });
        console.log('ToggleAvailableButton - Toggled successfully');
      } catch (error) {
        console.error('Error al cambiar la disponibilidad:', error);
      }
    };
  
    return (
      <Button label={record.available ? 'Disponible' : 'Sin existencias'} onClick={handleToggleAvailable} />
    );
  };
  
  export default ToggleAvailableButton;