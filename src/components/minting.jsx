import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ethers } from "ethers";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../App.css";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
// adding abi directly to the frontend
// import Proposalabi from "../../smartcontract/artifacts/contracts/proposal.sol/Proposal.json"
import ABI from '../ABI.json';

export function Minting() {
    const contractAddress = "0x3fCA50C872Ef5CC727fF3a6C7055ceb77fD1fA85";
    const [signer, setSigner] = useState(null);
    const [provider, setProvider] = useState();
    const [yes, setYes] = useState(0);
    const [no, setNo] = useState(0);
    const [curProposal, setCurProposal] = useState("");
    const [curdisc, setcurdisc] = useState("");
    const [curtimeperiod, settimeperiod] = useState("1800");
    const [avilableprop, setTotalprop] = useState([]);

    async function ConnectAccount() {
        let initProvider;
        if (window.ethereum == null) {
            console.log("MetaMask not installed; using read-only defaults")
            initProvider = ethers.getDefaultProvider()
            setProvider(initProvider)
        } else {
            initProvider = new ethers.BrowserProvider(window.ethereum)
            const initSigner = await initProvider.getSigner();
            setSigner(initSigner);
            setProvider(initProvider)
        }
    }

        async function Createprop() {
            const contract = new ethers.Contract(contractAddress, ABI, signer)
            const tx = await contract.createproposal(curProposal, curdisc, curtimeperiod);
            tx.wait()
        }

        async function totalproposal() {
            const contract = new ethers.Contract(contractAddress, ABI, provider);
            const proposal = await contract.totalpostedproposal();
            setTotalprop(proposal);
        }

        useEffect(() => {
            ConnectAccount();
        },[])

        useEffect(() => {
            if (provider) {
                totalproposal();
            }},[provider]);

        return (
            <>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href="#home">DAo.</Navbar.Brand>
                    </Container>
                </Navbar>
                <Container className="mt-4">
                    {
                        signer ? (signer.address) : (
                            <Button onClick={ConnectAccount}></Button>
                        )
                    }
                </Container>
                <Container className='firstcont'>
                    <Row>
                        <Col>
                            <Form name="form">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Proposal</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setCurProposal(e.target.value)} />
                                    <Form.Label>discription</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setcurdisc(e.target.value)} />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                            <Button className="button" onClick={Createprop}>Create-Proposal</Button>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Button variant="danger" onClick={totalproposal}>postedproposal</Button>
                </Container>
                <Container className='seccond'>
                    {avilableprop.map((item, i) => (
                        <Row key={i} className='mt-3'>
                            <Col >
                                <Card>
                                    <Card.Body>
                                        <Col id="proposal">
                                         {item}
                                        </Col>
                                        <Row>
                                            <Col>
                                                <Button variant="outline-success" onClick={() => setYes(yes + 1)}>YES</Button>
                                            </Col>
                                            <Col>
                                                <div id="yes">{yes}</div>
                                            </Col>
                                            <Col>
                                                <Button variant="outline-danger" onClick={() => setNo(no + 1)}>NO</Button>
                                            </Col>
                                            <Col>
                                                <div id="no">{no}</div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                  ))}
                </Container>
            </>
        )
    }


