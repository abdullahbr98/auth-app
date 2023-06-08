import React, { useState } from "react";
import AccountClass from "../../classes/AccountClass.js";
import { Link } from "react-router-dom";
import "./login.css";
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
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState(false);
    const [val, setVal] = useState({
        v1: 1,
        v2: 2,
        v3: 3
    });

    const loginSubmit = async () => {

        // debugger;
        // let changeValue = 6;
        // let {v3} = val;
        // setVal({v3:"67"});
        // console.log("v1:",val);
        let newVal = {...val,v4:"411"};
        setVal(newVal);
        console.log(val);


        // debugger;
        console.log("login");
        console.log("email:", email, "password:", password);
        let accountArray = await localStorage?.getItem("accounts");
        if (accountArray !== "") {
            let parsedInfo = await JSON.parse(accountArray);

            let catcher = 0;
            if (parsedInfo !== "") {
                for (let i = 0; i < parsedInfo.length; i++) {
                    if (
                        email == parsedInfo[i].emailAddress &&
                        password == parsedInfo[i].password
                    ) {
                        console.log("logged in");
                        catcher = parsedInfo[i];
                        break;
                    }
                }
                if (catcher !== 0) {
                    console.log("catcher:", catcher);
                    let stringifyValue = JSON.stringify(catcher);
                    localStorage.setItem("isLoggedIn", stringifyValue);
                    window.location.replace("/home");
                } else {
                    console.log("wrong password");
                    seterror(true);
                }
            }
        } else {
            console.log("wrong password");
            seterror(true);
        }
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
                                Login
                            </h2>
                            <p className="text-white-50 mb-5">
                                Please enter your login and password!
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
                                id="formControlLg"
                                type="password"
                                size="lg"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            {error ? (
                                <p className="small mb-3 pb-lg-2 text-danger">
                                    Wrong password or email.
                                </p>
                            ) : null}
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
                                    loginSubmit();
                                }}
                            >
                                Login
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
                                    Don't have an account?{" "}
                                    <Link
                                        to="/signup"
                                        className="text-white-50 fw-bold"
                                    >
                                        Sign Up
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

export default Login;
