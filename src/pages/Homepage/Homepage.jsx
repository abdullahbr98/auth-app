import React, { useState, useEffect } from "react";
import {
    MDBBtn,
    Container,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
} from "mdb-react-ui-kit";
export default function Homepage() {
    const logOut = () => {
        localStorage.setItem("isLoggedIn", "");
        window.location.replace("/login");
    };
    const [basicActive, setBasicActive] = useState("tab1");
    const [peopleArray, setPeopleArray] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const [acceptedFriends, setAcceptedFriends] = useState([]);
    const [loggedInAccount, setLoggedInAccount] = useState("");
    const [objectIndex, setObjectIndex] = useState(0);
    const [friends, setFriends] = useState([]);
    const [compDis, setCompDis] = useState("block");
    const [uniquePeople, setuniquePeople] = useState([]);
    const [renderFlag, setRenderFlag] = useState(true);

    const uniquePeopleGetter = () => {
        if (loggedInAccount.Friends) {
            let friendList = loggedInAccount.Friends;
            let people = [];
            console.log("peopleArray", peopleArray);
            for (let index = 0; index < peopleArray.length; index++) {
                people.push(peopleArray[index].emailAddress);
            }
            console.log("friendList:", friendList);
            console.log("people:", people);
            let uniqueElements = people.filter(
                (element) => !friendList.includes(element)
            );
            console.log("Unique Elements:", uniqueElements);
            setuniquePeople(uniqueElements);
            setTimeout(() => {
                console.log(uniquePeople);
            }, 2000);
        } else {
            let people = [];
            for (let index = 0; index < peopleArray.length; index++) {
                people.push(peopleArray[index].emailAddress);
            }
            setuniquePeople(people);
        }
    };

    const handleBasicClick = (value: string) => {
        if (value === basicActive) {
            return;
        }

        setBasicActive(value);
    };

    const AcceptFriend = (email) => {
        debugger;
        console.log("accepted", email);
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        let searcher = JSON.parse(localStorage.getItem("isLoggedIn"));
        let helperindex = -1;
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].emailAddress == searcher.emailAddress) {
                if (accounts[i].Friends) {
                    accounts[i].Friends.push(email);
                    for (let index = 0; index < accounts.length; index++) {
                        if (accounts[index].emailAddress == email) {
                            accounts[index]["Friends"].push(
                                accounts[i].emailAddress
                            );
                        }
                    }
                    helperindex = i;
                } else {
                    accounts[i]["Friends"] = [email];
                    for (let index = 0; index < accounts.length; index++) {
                        if (accounts[index].emailAddress == email) {
                            if (!accounts[index]["Friends"])
                                accounts[index]["Friends"] = [
                                    accounts[i].emailAddress,
                                ];
                            else {
                                accounts[index]["Friends"].push(
                                    accounts[i].emailAddress
                                );
                            }
                        }
                    }
                    helperindex = i;
                }
            }
        }

        for (
            let index = 0;
            index < accounts[helperindex]["FriendRequests"].length;
            index++
        ) {
            if (accounts[helperindex]["FriendRequests"][index] == email) {
                accounts[helperindex]["FriendRequests"].splice(index, 1);
            }
        }
        for (let ind = 0; ind < searcher["FriendRequests"].length; ind++) {
            if (searcher["FriendRequests"][ind] == email) {
                searcher["FriendRequests"].splice(ind, 1);
            }
        }

        accounts = JSON.stringify(accounts);
        // localStorage.setItem("isLoggedIn",searcher);
        console.log(searcher);
        localStorage.setItem("accounts", accounts);
    };

    const AddFriend = (email) => {
        console.log(email);
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        let requester = JSON.parse(localStorage.getItem("isLoggedIn"));
        requester = requester.emailAddress;
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].emailAddress == email) {
                if (accounts[i]["FriendRequests"] >= 1) {
                    accounts[i]["FriendRequests"].push(requester);
                } else {
                    accounts[i]["FriendRequests"] = [requester];
                }
            }
        }
        accounts = JSON.stringify(accounts);
        localStorage.setItem("accounts", accounts);
        console.log(accounts);
    };

    const getFriendList = () => {
        console.log("friendlist function called");
        let people = JSON.parse(localStorage.getItem("accounts"));
        let checker = JSON.parse(localStorage.getItem("isLoggedIn"));
        setFriendList(checker.FriendRequests);
    };

    const getValues = () => {
        let people = JSON.parse(localStorage.getItem("accounts"));
        let checker = JSON.parse(localStorage.getItem("isLoggedIn"));
        setFriends(checker.Friends);

        for (let i = 0; i < people.length; i++) {
            if (people[i].emailAddress == checker.emailAddress) {
                setObjectIndex(i);
            }
        }

        setLoggedInAccount(JSON.parse(localStorage.getItem("isLoggedIn")));
        checker = checker["emailAddress"];
        console.log("email:", checker);

        uniquePeopleGetter();
        setPeopleArray(people);
        setAcceptedFriends(people.Friends);
    };

    useEffect(() => {
        getValues();
        getFriendList();
        if (renderFlag) {
            uniquePeopleGetter();
            setRenderFlag(false);
        }
        console.log(uniquePeople);
    }, []);

    return (
        <>
            <div className="text-end p-2">
                <MDBBtn
                    color="secondary"
                    onClick={() => {
                        logOut();
                    }}
                >
                    Log Out
                </MDBBtn>
            </div>
            <h3 className="fw-bold mb-2 text-uppercase p-4 text-center text-white">
                Welcome {loggedInAccount.emailAddress}
            </h3>
            <div className="d-flex justify-content-center">
                <div className="text-center align-items-center">
                    <MDBTabs className="mb-3 ">
                        <MDBTabsItem>
                            <MDBTabsLink
                                onClick={() => handleBasicClick("tab1")}
                                active={basicActive === "tab1"}
                            >
                                Notifications
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink
                                onClick={() => handleBasicClick("tab2")}
                                active={basicActive === "tab2"}
                            >
                                Friend Requests
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink
                                onClick={() => handleBasicClick("tab3")}
                                active={basicActive === "tab3"}
                            >
                                Friend List
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink
                                onClick={() => handleBasicClick("tab4")}
                                active={basicActive === "tab4"}
                            >
                                People
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>

                    <MDBTabsContent className="bg-dark text-white">
                        <MDBTabsPane show={basicActive === "tab1"}>
                            {friendList?.map((objectArray, index) => {
                                return (
                                    <div className="d-flex justify-content-center p-2">
                                        {console.log(
                                            "object array",
                                            objectArray
                                        )}
                                        <div key={index}>
                                            {objectArray} sent you a friend
                                            request.
                                        </div>
                                    </div>
                                );
                            })}
                        </MDBTabsPane>
                        <MDBTabsPane show={basicActive === "tab2"}>
                            {friendList?.map((objectArray, index) => {
                                return (
                                    <div className="d-flex justify-content-between p-2">
                                        {console.log(
                                            "object array",
                                            objectArray
                                        )}
                                        <div key={index}>{objectArray}</div>
                                        <MDBBtn
                                            rounded
                                            className="me-1"
                                            color="secondary"
                                            onClick={() => {
                                                AcceptFriend(objectArray);
                                            }}
                                        >
                                            Accept
                                        </MDBBtn>
                                    </div>
                                );
                            })}
                        </MDBTabsPane>
                        <MDBTabsPane show={basicActive === "tab3"}>
                            {friends?.map((objectArray, index) => {
                                return (
                                    <div className="d-flex justify-content-center p-2">
                                        <div key={index}>{objectArray}</div>
                                    </div>
                                );
                            })}
                        </MDBTabsPane>
                        <MDBTabsPane show={basicActive === "tab4"}>
                            {uniquePeople?.map((objectArray, index) => {
                                console.log(objectArray);
                                if (
                                    loggedInAccount.emailAddress != objectArray
                                ) {
                                    return (
                                        <div className="d-flex justify-content-between p-2">
                                            <div key={index}>{objectArray}</div>
                                            <MDBBtn
                                                rounded
                                                className="me-1"
                                                color="secondary"
                                                onClick={() => {
                                                    AddFriend(objectArray);
                                                }}
                                            >
                                                Add Friend
                                            </MDBBtn>
                                        </div>
                                    );
                                }
                            })}
                        </MDBTabsPane>
                    </MDBTabsContent>
                </div>
            </div>
        </>
    );
}
