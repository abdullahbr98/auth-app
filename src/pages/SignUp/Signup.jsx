import React, { useState } from "react";
import AccountClass from "../../classes/AccountClass.js";
import { Link } from "react-router-dom";
import "./signup.css";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
} from "mdb-react-ui-kit";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signUpSubmit = async () => {
        let accountInformation = new AccountClass(email, password);
        let accounts = localStorage.getItem("accounts");
        if (accounts) {
            let parsedValue = await JSON.parse(accounts);

            if (parsedValue.length >= 1) {
                parsedValue[parsedValue.length] = accountInformation;
                let stringifyValue = JSON.stringify(parsedValue);
                localStorage.setItem("accounts", stringifyValue);
                console.log(parsedValue);
            }
        } else {
            let accountArray = [];
            accountArray[0] = accountInformation;
            let stringifyValue = await JSON.stringify(accountArray);
            localStorage.setItem("accounts", stringifyValue);
        }
        console.log(accountInformation);
        window.location.replace("/login");
    };
    return (
        <MDBContainer fluid>
            <MDBRow className="d-flex justify-content-center align-items-center h-100">
                <MDBCol col="12">
                    <MDBCard
                        className="bg-dark text-white my-5 mx-auto"
                        style={{ borderRadius: "1rem", maxWidth: "400px" }}
                    >
                        <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                            <h2 className="fw-bold mb-2 text-uppercase">
                                Sign Up
                            </h2>
                            <p className="text-white-50 mb-5">
                                Please Sign Up your Account
                            </p>

                            <MDBInput
                                wrapperClass="mb-4 mx-5 w-100"
                                labelClass="text-white"
                                label="Email address"
                                id="formControlLg"
                                type="email"
                                size="lg"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <MDBInput
                                wrapperClass="mb-4 mx-5 w-100"
                                labelClass="text-white"
                                label="Password"
                                id="formControlLgl"
                                type="password"
                                size="lg"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />

                            <p className="small mb-3 pb-lg-2">
                                <Link className="text-white-50" href="#!">
                                    Forgot password?
                                </Link>
                            </p>
                            <MDBBtn
                                outline
                                className="mx-2 px-5"
                                color="white"
                                size="lg"
                                onClick={() => {
                                    signUpSubmit();
                                }}
                            >
                                Sign Up
                            </MDBBtn>

                            <div className="d-flex flex-row mt-3 mb-5">
                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="m-3"
                                    style={{ color: "white" }}
                                >
                                    <MDBIcon fab icon="facebook-f" size="lg" />
                                </MDBBtn>

                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="m-3"
                                    style={{ color: "white" }}
                                >
                                    <MDBIcon fab icon="twitter" size="lg" />
                                </MDBBtn>

                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="m-3"
                                    style={{ color: "white" }}
                                >
                                    <MDBIcon fab icon="google" size="lg" />
                                </MDBBtn>
                            </div>

                            <div>
                                <p className="mb-0">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="text-white-50 fw-bold"
                                    >
                                        Log In
                                    </Link>
                                </p>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default SignUp;
