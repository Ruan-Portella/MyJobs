import Link from "next/link";
import style from '../styles/header.module.css';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import loginImage from "../images/jobHuntLogin.svg";
import { BiLogOut, BiHomeAlt2 } from 'react-icons/bi';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function Header() {
  const [user, setUser] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(user);
    } else {
      setUser('Bem vindo!');
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <Container fluid className={style.headerContainer}>
      <Row className={style.headerNav}>
        <Col className={style.headerProfile}>
          <Image src={loginImage} alt="logo" width={48} />
          <h5>{user}</h5>     
        </Col>
        <Col className={style.HeaderLink}>
          <Link href='/user' className={style.HeaderIcon}>
            <BiHomeAlt2 size={20} color="black" />
            <strong className={style.dashBoardIcon}>DashBoard</strong>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className={style.HeaderLogout}>
          <Button variant='link' onClick={() => logout()} className={style.HeaderIcon}>
            <BiLogOut size={20} />
                Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
}