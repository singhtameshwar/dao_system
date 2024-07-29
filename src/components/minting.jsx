
import 'bootstrap/dist/css/bootstrap.min.css';
import { ethers } from "ethers";
import "../App.css";
import {Card, Form, Row, Col, Navbar, Button, Container} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
// adding abi directly to the frontend
// import Proposalabi from "../../smartcontract/artifacts/contracts/proposal.sol/Proposal.json"
import ABI from '../ABI.json';

export function Minting() {
    const contractAddress = "0xdeC0B13007FcC3fd8C7275cA6c006364b0a77bb9";
    const [signer, setSigner] = useState(null);
    const [provider, setProvider] = useState();
    const [curprop, setprop] = useState("");
    const [curdisc, setcurdisc] = useState("");
    const [curtimeperiod, settimeperiod] = useState("604800");
    const [avilableprop, setTotalprop] = useState([]);
    const[Yesvote, setYesvote]=useState("");
    const[Novote, setNovote]=useState("");

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
        const tx = await contract.createproposal(curprop, curdisc, curtimeperiod);
        tx.wait()
    }

    async function totalproposal() {
        const contract = new ethers.Contract(contractAddress, ABI, provider);
        const proposal = await contract.totalpostedproposal();
        setTotalprop(proposal);
    }

    async function voteProp(id, votechoice) {
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        const tx = await contract.votingProposal(id, votechoice);
         tx.wait();
    }
      

    useEffect(() => {
        ConnectAccount();
    }, [])

    useEffect(() => {
        if (provider) {
            totalproposal();
        }
    }, [provider]);

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
                                <Form.Label>proposal_Title:</Form.Label>
                                <Form.Control type="text" onChange={(e) => setprop(e.target.value)} />
                                <Form.Label>proposal_Discription:</Form.Label>
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
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Col id="proposal">
                                        title:{item.title}
                                    </Col>
                                    <Col id="proposal">
                                        description:{item.description}
                                    </Col>
                                    <Row>
                                        <Col>
                                            {/* here bigintnumber will changed into numbers id changed */}
                                            <Button variant="outline-success" onClick={() => voteProp(Number(item.id), 0)}>YES</Button>
                                        </Col>
                                        <Col>
                                            <div id="yes">{Number(item.Yesvote)}</div>
                                        </Col>
                                        <Col>
                                            <Button variant="outline-danger" onClick={() => voteProp(Number(item.id), 1)}>NO</Button>
                                        </Col>
                                        <Col>
                                            <div id="no">{Number(item.Novote)}</div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            <p>{Number(item.Yesvote) > Number(item.Novote) ? "Proposal is accepted" : "Not accepted"}</p>
                        </Col>
                    </Row>
                ))}
            </Container>
        </>
    )
}

