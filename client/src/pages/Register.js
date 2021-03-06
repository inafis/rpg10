import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Button, Label, Input, Alert, Row, Col, Container } from 'reactstrap';
import { registerUser } from '../actions/userActions';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

function Register(props) {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [err, setError] = useState('');
    const history = useHistory();

    useEffect(()=>{
        if(props.isLoggedIn){
            history.push("/dashboard");
        }else{
            setError(props.message)
        }
    },[props]);

    const handleSubmit = evt => {
        evt.preventDefault();
        // console.log(user);
        props.dispatch(registerUser(user))
    }
    const handleInputChange = event => {
        let val = event.target.value;
        let name = event.target.name;
        setUser({ ...user, [name]: val })
    }
    return (
        <Container style={{"margin-top":"50px"}}>
             <Row>
                <Col xs={{ size: 6, offset: 3 }} sm={{ size: 5, offset: 3 }} md={{ size: 4, offset: 4 }}>
                    <Form onSubmit={handleSubmit}>
                        {err ? <Alert color="danger">{err}</Alert> : ""}
                        <FormGroup row>
                            <Label for="firstName">Firstname</Label>
                            <Input type="firstName" name="firstName" id="firstName" value={user.firstName} onChange={e => handleInputChange(e)}></Input>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="lastName">Lastname</Label>
                            <Input type="lastName" name="lastName" id="lastName" value={user.lastName} onChange={e => handleInputChange(e)}></Input>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="example@live.com" value={user.email} onChange={e => handleInputChange(e)}></Input>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="xfE2s@!" value={user.password} onChange={e => handleInputChange(e)}></Input>
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => {
    const user = state.userState || {};
    return user;
  }
    
export default connect(mapStateToProps)(Register);
