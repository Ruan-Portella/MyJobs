"use client";

import Image from "next/image";
import style from "../styles/login.module.css";
import Form from "react-bootstrap/Form";
import loginImage from "../images/jobHuntLogin.svg";
import { useRouter } from 'next/navigation';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

interface ISignUpData {
  email: string;
  password: string;
  remember: boolean;
}

interface IValidateFields {
  email: boolean;
  password: boolean;
}

interface IHandleChange {
  name: string;
  value: boolean | string;
}

export default function Home() {
  const [signUpData, setSignUpData] = useState<ISignUpData>({
    email: "",
    password: "",
    remember: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [validatedFields, setValidateFields] = useState<IValidateFields>({ email: false, password: false });
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setLoading(true);
    setError('');

    await axios
      .post("http://localhost:3001/", {
        email: signUpData.email,
        password: signUpData.password,
        remember: signUpData.remember,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.name);
        router.push("http://localhost:3000/user");
      })
      .catch((error) => {
        if (error.response.data.message === 'Wrong password') {
          setError('Senha ou Usuário incorretos');
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
      });
    };
    validateFields();
  }, [signUpData]);

  return (
    <main>
      <Container fluid>
        <Row className={style.loginContent}>
          <Col className={style.loginBanner}>
            <Image
              className={style.image}
              src={loginImage}
              priority
              alt="jobHunt Login Image"
            ></Image>
            <a href="https://storyset.com/job" target="_blank">Job illustrations by Storyset</a>
          </Col>
          <Col className={style.loginForm}>
            
            <h1>Login</h1>

            <Form onSubmit={handleSubmit}>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={signUpData.email}
                    isValid={validatedFields.email}
                    isInvalid={!validatedFields.email}
                    onChange={({ target }) =>
                      handleChange({name: "email", value: target.value})
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
                      handleChange({name: "password", value: target.value})
                    }
                    placeholder="Password"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Manter Conectado"
                    id="checkbox-remember"
                    onClick={() =>
                      handleChange({name: "remember", value: !signUpData.remember})
                    }
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
                  disabled={ loading || !validatedFields.email || !validatedFields.password }
                >
                  {loading ? (
                    <Spinner animation="border" variant="light" size="sm" />
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </Row>

              <Row>
                <Form.Text className="text-muted">
                    Não tem uma conta? <a href="/signUp" >Inscrever-se</a>
                </Form.Text>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
