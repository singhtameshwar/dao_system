import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../App.css";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
// import Proposalabi from "../../smartcontract/artifacts/contracts/proposal.sol/Proposal.json"
import ABI from '../ABI.json';

export function Minting() {
    const contractAddress = "0x5f7fF3F0cf063ECDde5897060D39a0ffb0b988F5";
    const [signer, setSigner] = useState(null);
    const [provider, setProvider] = useState();
    const [yes, setYes] = useState(0);
    const [no, setNo] = useState(0);
    const [proposal, setProposal] = useState([]);
    const [curProposal, setCurProposal] = useState("");
    const [curdisc, setcurdisc] = useState("");
    const [curtimeperiod, settimeperiod] = useState("1800");

    async function connectAccount() {
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
    async function createprop(){
        const contract=new ethers.Contract(contractAddress,ABI,signer)
        const tx = await contract.createproposal(curProposal, curdisc, curtimeperiod);
        console.log(tx);
        tx.wait()
    }
    async function totalproposal(){
        const contract=new ethers.Contract(contractAddress,ABI,provider);
        const proposals=await contract.totalpostedproposal();
        console.log(proposals);
    }


    useEffect(() => {
        connectAccount();
    }, [])

    // useEffect(()=>{
    //     postedprop();
    // })

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">DAo.</Navbar.Brand>
                </Container>
            </Navbar>
            <Container className="mt-4">
            {
             signer?(signer.address):(
                <Button onClick={connectAccount}></Button>
                )
               }
            </Container>
            <Container className='firstcont'>
                <Row>
                    <Col>
                        <Form name="form">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Proposal</Form.Label>
                                <Form.Control type="text" onChange={(e) => setCurProposal(e.target.value)}/>
                                <Form.Label>discription</Form.Label>
                                <Form.Control type="text" onChange={(e) => setcurdisc(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Button className="button" onClick={createprop}>Create-Proposal</Button>
                    </Col>
                </Row>
            </Container>
            <Container>
            <Button  variant="danger" onClick={totalproposal}>postedproposal</Button>{' '}
            </Container>
            <Container className='seccont'>
                {proposal.map((item, i) => (
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
        </>)
}



