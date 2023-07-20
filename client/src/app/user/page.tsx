'use client';

import Header from "@/components/Header";
import styles from '@/styles/dashboard.module.css';
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import {  Badge, Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Swal from "sweetalert2";
import '@/styles/table.css';

const HOST = process.env.NEXT_PUBLIC_API_HOST || "localhost:3001";
const PROTOCOL = process.env.NEXT_PUBLIC_API_PROTOCOL || "http";

interface Job {
  companyName: string;
  jobLink: string;
  createdAt: string;
  jobStatus: string;
}

export default function DashBoard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    };
    const getUser = async () => {
      await axios.get(`${PROTOCOL}://${HOST}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
        .then((res) => {
          setJobs(res.data);
          setFilteredJobs(res.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            router.push('/');
          }
        });
    };

    getUser();

  }, [router]);

  const deleteJob = async (jobLink: string) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, quero deletar!',
      cancelButtonText: 'Não, quero cancelar!',
      reverseButtons: true
    })
      .then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem('token');
          axios.delete(`${PROTOCOL}://${HOST}/user`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            data: {
              jobLink: jobLink,
            }
          })
            .then(() => {
              const removedJob = jobs.filter((job: any) => job.jobLink !== jobLink);
              if (removedJob) {
                setJobs(removedJob);
                setFilteredJobs(removedJob);
              } else {
                setJobs([]);
                setFilteredJobs([]);
              }
            }).catch((err) => {
              console.log(err);
            });

          Swal.fire(
            'Deletado!',
            'O job foi deletado com sucesso.',
            'success'
          );
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelado!',
            'Seu job foi salvo :)',
            'error'
          );
        }
      });
  };

  const createJob = async () => {
    Swal.fire({
      title: 'Create a new job',
      html: `
      <input id="companyName" class="swal2-input" placeholder="Company Name" autofocus>
      <input id="jobLink" class="swal2-input" placeholder="Job Link">
    `,
      showCancelButton: true,
      confirmButtonText: 'Criar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem('token');
          const companyName = document.getElementById('companyName') as HTMLInputElement;
          const jobLink = document.getElementById('jobLink') as HTMLInputElement;

          if (companyName.value && jobLink.value) {

            await axios.post(`${PROTOCOL}://${HOST}/user`, {
              companyName: companyName.value,
              jobLink: jobLink.value,
            }, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            })
              .then((res) => {
                if (res.status === 201) {
                  const newJob = {
                    companyName: companyName.value,
                    jobLink: jobLink.value,
                    createdAt: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()} `,
                    jobStatus: 'active',
                  };

                  setJobs([...jobs, newJob]);
                  setFilteredJobs([...jobs, newJob]);
                  Swal.fire(
                    'Job Criado',
                    'Parabéns',
                    'success'
                  );
                }
              })
              .catch((err) => {
                Swal.fire(
                  'Falhou!',
                  `O job não foi criado: ${err.response.data.message}`,
                  'error'
                );
              }
              );
          }
          else {
            Swal.fire(
              'Falhou!',
              'Você não preencheu todos os campos',
              'error'
            );
          }
        }
      });;
  };

  const updateJob = async (jobLink: string, jobStatus: string, CompanyName: string) => {
    Swal.fire({
      title: 'Update a new job',
      html: `
      <input id="newCompanyName" class="swal2-input"  placeholder="Company Name">
      <input id="newJobLink" class="swal2-input" placeholder="Job Link">
      <select id="newJobStatus" class="swal2-select" placeholder="Job Link">
        <option value="active">active</option>
        <option value="rejected">rejected</option>
      </select>
    `,
      showCancelButton: true,
      confirmButtonText: 'Save Changes',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      showLoaderOnConfirm: true,
      didOpen: () => {
        const newCompanyName = document.getElementById('newCompanyName') as HTMLInputElement;
        const newJobLink = document.getElementById('newJobLink') as HTMLInputElement;
        const newJobStatus = document.getElementById('newJobStatus') as HTMLInputElement;
        newCompanyName.value = CompanyName;
        newJobLink.value = jobLink;
        newJobStatus.value = jobStatus;
      },
    })
      .then(async (result) => {
        const token = localStorage.getItem('token');
        const newCompanyName = document.getElementById('newCompanyName') as HTMLInputElement;
        const newJobLink = document.getElementById('newJobLink') as HTMLInputElement;
        const newJobStatus = document.getElementById('newJobStatus') as HTMLInputElement;

        if (result.isConfirmed) {
          if (newCompanyName && newJobLink && newJobStatus) {
            await axios.put(`${PROTOCOL}://${HOST}/user`, {
              newCompanyName: newCompanyName.value,
              jobLink: jobLink,
              newJobLink: newJobLink.value,
              newJobStatus: newJobStatus.value,
            }, {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            })
              .then((res) => {
                if (res.status === 200) {

                  jobs.filter((job: any) => {
                    if (job.jobLink === jobLink) {
                      job.companyName = newCompanyName.value;
                      job.jobLink = newJobLink.value;
                      job.jobStatus = newJobStatus.value;
                    }
                  });

                  setJobs([...jobs]);
                  setFilteredJobs([...jobs]);
                  Swal.fire(
                    'Job Editado',
                    'Parabéns',
                    'success'
                  );
                }
              })
              .catch((err) => {
                console.log(err);

                Swal.fire(
                  'Falhou!',
                  `O job não foi editado: ${err.response.data.message}`,
                  'error'
                );
              }
              );
          }
        } else if (!result.isDismissed) {
          Swal.fire(
            'Falhou!',
            'Você não preencheu todos os campos',
            'error'
          );
        }
      });
  };

  const filterJobs = (value: string) => {
    const filteredJobs = jobs.filter((job: any) => job.companyName
      .toLowerCase().includes(value.toLowerCase()));
    setFilteredJobs(filteredJobs);
  };

  return (
    <main className={styles.main}>
      <Header />
      <Container fluid className={styles.container}>
        <Row className={styles.userInput}>
          <Col className={styles.inputGroup}>
            <InputGroup size="sm" className={styles.input} >
              <Form.Control
                onChange={(e) => filterJobs(e.target.value)}
                className={styles.formControl}
                placeholder="Filter by Company Name"
                aria-label="Filter"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
          <Col className={styles.button}>
            <Button variant="primary" type="submit" onClick={() => createJob()}>
              <IoMdAdd size={20} /> Add a new job
            </Button>
          </Col>
        </Row>
        <Row className={styles.userInfo}>
          <Col className={styles.userInfoText}>
            <Badge className={styles.userInfoBadge} pill bg="primary">{filteredJobs.length} jobs salvos</Badge>
          </Col>
          <Col className={styles.userInfoText}>
            <Badge className={styles.userInfoBadge} pill bg="success">{filteredJobs.filter((job: any) => job.jobStatus === 'active').length} jobs ativos</Badge>
          </Col>
          <Col className={styles.userInfoText}>
            <Badge className={styles.userInfoBadge} pill bg="danger"> {filteredJobs.filter((job: any) => job.jobStatus === 'rejected').length} jobs rejeitados</Badge>
          </Col>
        </Row>
        <Row className={styles.dashBoardRow}>
          <Col className={styles.dashBoardCol}>
            <div className={styles.dashBoardTable}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Company Name</th>
                    <th>Job Link</th>
                    <th>Date Saved</th>
                    <th>Status</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filteredJobs.map((job: any, index: number) => {
                      return (
                        <tr key={job.jobLink}>
                          <td data-title='#'>{index + 1}</td>
                          <td data-title='Company Name'>{job.companyName}</td>
                          <td data-title='Job Link'><Link href={`${job.jobLink}`} target="_blank">{job.jobLink}</Link></td>
                          <td data-title='Created At'>{job.createdAt}</td>
                          <td data-title='Job Status'>{job.jobStatus}</td>
                          <td data-title='Operations'>
                            <div className={styles.thOperations}>
                              <BiEdit size={27} className={styles.editBtn}  onClick={() => updateJob(job.jobLink, job.jobStatus, job.companyName)} />
                              |
                              <BiTrashAlt size={27} className={styles.deleteBtn} onClick={() => deleteJob(job.jobLink)} />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}