"use client";

import Image from "next/image";
import Swal from 'sweetalert2';
import style from "../../styles/signUp.module.css";
import Form from "react-bootstrap/Form";
import SignUpImage from "../../images/Signup.svg";
import { useRouter } from 'next/navigation';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";


const HOST = process.env.NEXT_PUBLIC_API_HOST || "localhost:3001";
const PROTOCOL = process.env.NEXT_PUBLIC_API_PROTOCOL || "http";

interface ISignUpData {
  email: string;
  password: string;
  fullName: string;
}

interface IValidateFields {
  email: boolean;
  password: boolean;
  fullName: boolean;
}

interface IHandleChange {
  name: string;
  value: boolean | string;
}

export default function SignUp() {
  const [signUpData, setSignUpData] = useState<ISignUpData>({
    email: "",
    password: "",
    fullName: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [validatedFields, setValidateFields] = useState<IValidateFields>({ email: false, password: false, fullName: false });
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setLoading(true);
    setError('');

    await axios
      .post(`${PROTOCOL}://${HOST}/signUp`, {
        email: signUpData.email,
        password: signUpData.password,
        fullName: signUpData.fullName,
      })
      .then((response) => {
        if (response.status === 201) {
          Swal.fire({
            title: 'Usuário Criado!',
            text: 'Deseja ir para a página de login?',
            icon: 'success',
            allowOutsideClick: false,
            showDenyButton: true,
            denyButtonText: 'Não',
            confirmButtonText: 'Sim',
          }).then((result) => {
            if (result.isConfirmed) {
              router.push('/');
            }
          });
        }
      })
      .catch((error) => {
        if (error.response.data.message === 'Validation error') {
          setError('Email já cadastrado');
        }
        if (error.response.data.message === 'You have to sign in with Google') {
          setError('Você já tem um conta pelo Google, tente logar com o Google');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (data: IHandleChange) => {
    setSignUpData({
      ...signUpData,
      [data.name]: data.value,
    });
  };

  useEffect(() => {
    const validateFields = () => {
      const regex = /\S+@\S+\.\S+/;
      setValidateFields({
        password: signUpData.password.length >= 8,
        email: regex.test(signUpData.email),
        fullName: signUpData.fullName.length >= 8,
      });
    };
    validateFields();
  }, [signUpData]);

  return (
    <main>
      <Container fluid>
        <Row className={style.signUpContent}>
          <Col className={style.signUpBanner}>
            <Image
              className={style.image}
              src={SignUpImage}
              priority
              alt="jobHunt Login Image"
            ></Image>
            <a href="https://storyset.com/job" target="_blank">Job illustrations by Storyset</a>
          </Col>
          <Col className={style.signUpForm}>

            <h1>Criar sua conta</h1>

            <Form onSubmit={handleSubmit}>

              <Row>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    value={signUpData.fullName}
                    isValid={validatedFields.fullName}
                    isInvalid={!validatedFields.fullName}
                    onChange={({ target }) =>
                      handleChange({ name: "fullName", value: target.value })
                    }
                    placeholder="Enter Name"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={signUpData.email}
                    isValid={validatedFields.email}
                    isInvalid={!validatedFields.email}
                    onChange={({ target }) =>
                      handleChange({ name: "email", value: target.value })
                    }
                    placeholder="Enter email"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={signUpData.password}
                    isValid={validatedFields.password}
                    isInvalid={!validatedFields.password}
                    onChange={({ target }) =>
                      handleChange({ name: "password", value: target.value })
                    }
                    placeholder="Password"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Text>
                  {error && <p className={style.error}>{error}</p>}
                </Form.Text>
              </Row>

              <Row>
                <Button
                  type="submit"
                  className={style.buttonForm}
                  disabled={loading || !validatedFields.email || !validatedFields.password}
                >
                  {loading ? (
                    <Spinner animation="border" variant="light" size="sm" />
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
              </Row>

              <Row>
                <Form.Text className="text-muted">
                  Já tem uma conta? <a href="/" >Entrar</a>
                </Form.Text>
              </Row>

            </Form>
          </Col>
        </Row>
  
      </Container>
    </main>
  );
}
