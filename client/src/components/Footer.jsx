import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineCopyrightCircle,
  AiOutlineTwitter,
} from "react-icons/ai";

export const Footer = () => {
  const user = useSelector((state) => state.user);

  return (
    <Container>
      <div className="margin">
        <section className="media">
          <div className="about">
            <h3 className="title">Supermarket Shop</h3>
            <ul>
              <StyledLink to="/sobreNosotros" target="_top">
                sobre nosotros
              </StyledLink>
              <StyledLink to='/contacto' target="_top">contacto</StyledLink>

              {user.role.trim() === "" ? (
                <StyledLink to="/auth" target="_top">
                  mi cuenta
                </StyledLink>
              ) : (user.provider === 'local' ? (
                <StyledLink to="/micuenta" target="_top">
                  mi cuenta
                </StyledLink>
              ) : (true))}
            </ul>
          </div>
          <div className="help">
            <h3 className="title">ayuda</h3>
            <ul>
              <StyledLink to="/preguntas" target="_top">
                Preguntas frecuentes
              </StyledLink>
              <StyledLink to="/privacidad" target="_top">
                Privacidad
              </StyledLink>
              <StyledLink to="/terminosycondiciones" target="_top">
                Terminos & condiciones
              </StyledLink>
            </ul>
          </div>
        
        </section>
        <hr />
        <section className="copy">
          <h4>
            <span>Supermarket Shop</span> {<AiOutlineCopyrightCircle />} 2023
          </h4>
        </section>
      </div>
    </Container>
  );
};

const Container = styled.footer`
  width: 100vw;
  height: 200px;
  background-color: #111;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  hr {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.4);
  }
  .margin {
    width: 80%;
    margin: 0 auto;
    .media {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      .about,
      .help,
      .social {
        width: 33.33%;
        height: 100%;
        color: #fff;
        text-transform: capitalize;
        ul {
          list-style: none;
          text-transform: capitalize;
          li {
            font-weight: 300;
          }
        }
      }
      .about {
        display: flex;
        flex-direction: column;
        margin-top: 100px;
        gap: 10px;
        ul {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          gap: 10px;
        }
      }
      .help {
        display: flex;
        flex-direction: column;
        margin-top: 100px;
        gap: 10px;
        ul {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          gap: 10px;
        }
      }
      .social {
        display: flex;
        flex-direction: column;
        margin-top: 100px;
        gap: 10px;
        ul {
          width: 100%;
          display: flex;
          gap: 10px;
          li {
            font-size: 2rem;
          }
        }
      }
    }
    .copy {
      width: 100%;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 30px;
      h4 {
        font-size: 0.8rem;
        color: #fff;
        letter-spacing: 1px;
        font-weight: 300;
        span {
          font-weight: 600;
        }
      }
    }
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bolder;
  font-size: 15px;
  color: #faf9f9;
`;
