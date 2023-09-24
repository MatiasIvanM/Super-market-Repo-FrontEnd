//

import React from "react";
import { useRecordContext, Button, useDataProvider } from "react-admin";

const ToggleAvailableButton = () => {
  const dataProvider = useDataProvider(); //useDataProvider para obtener dataProvider
  const record = useRecordContext();
  //   console.log("🚀 ~ file: ToggleAvailableButton.js:9 ~ ToggleAvailableButton ~ record:", record)

  if (!record) {
    return null; // Evita errores si record es indefinido
  }

  const handleToggleAvailable = async () => {
    try {
      const currentValue = record.available;
      console.log(
        // "🚀 ~ file: ToggleAvailableButton.js:24 ~ handleToggleAvailable ~ currentValue:",
        currentValue
      );

      await dataProvider.update("product", {
        id: record.id,
        data: {
          available: !currentValue,
          name: record.name,
          price: record.price,
          description: record.description,
          image: record.image,
          stock: record.stock,
          brand: record.brand,
          expirationdate: record.expirationdate,
        },
      });

      console.log("ToggleAvailableButton - Toggled successfully");
    } catch (error) {
      console.error("Error al cambiar la disponibilidad:", error);
    }
  };

  return (
    <Button
      label={record.available ? "Disponible" : "Sin existencias"}
      onClick={handleToggleAvailable}
      style={{
        color: record.available ? "green" : "red",
        fontWeight: "bold",
      }}
    />
  );
};

export default ToggleAvailableButton;
