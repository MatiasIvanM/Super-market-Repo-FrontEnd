import React from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { AppendBTN } from "../utils/ComponentsStyle";

export const Pagination = ({ totalPages, page, onPrev, onNext }) => {
  return (
    <Container>
      {page > 1 && (
        <AppendBTN onClick={onPrev} alter="false">
          <AiOutlineLeft />
        </AppendBTN>
      )}
      <h4>
        {page} de {totalPages}
      </h4>
      {page !== totalPages && (
        <AppendBTN onClick={onNext} alter="false">
          <AiOutlineRight />
        </AppendBTN>
      )}
    </Container>
  );
  I;
};

const Container = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
