import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\S+@\S+$/;
const AGE_REGEX = /\d/g  ;

const EditProfile = ({ user, setUser, token, url }) => {
    const userPass = localStorage.getItem("password");
    const userRef = useRef();
    const ageRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();
    const UPDATE_URL = `${url}/users/me`;
    const navigate = useNavigate();
    
    const [userName, setUserName] = useState(user.name);
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [userAge, setUserAge] = useState(user.age);
    const [validAge, setValidAge] = useState(false);
    const [ageFocus, setAgeFocus] = useState(false);

    const [email, setEmail] = useState(user.email);
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState(userPass);
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState(userPass);
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(userName));
    }, [userName]);

    useEffect(() => {
        setValidAge(AGE_REGEX.test(userAge));
    }, [userAge]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate("/profile");
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(userName);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = AGE_REGEX.test(userAge);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }

        const data = JSON.stringify({
            "name": userName,
            "age": userAge,
            "email": email,
            "password": pwd
          });
          
          const config = {
            method: 'patch',
            url: UPDATE_URL,
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            data : data
          };

        try {
            const response = await axios(config);
            setUser(response.data);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('User email Taken');
            } else {
                setErrMsg('Update Failed')
            }
            errRef.current.focus();
        }
    }

  return (<React.Fragment>
      <section className='flex flex-col w-screen h-screen items-center align-middle' >
            <div className={errMsg ? "bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mt-4" : "hidden"} role="alert">
                <p className="font-bold" aria-live="assertive">{errMsg}</p>
            </div>            
            <form className="flex flex-col bg-blue-500 shadow-md rounded px-8 pt-6 pb-6 mb-4 mt-8" onSubmit={handleSubmit}>
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                        Username:
                        <FontAwesomeIcon icon={faCheck} className={validName ? "text-teal-400 mx-4" : "hidden"} />
                        <FontAwesomeIcon icon={faTimes} className={validName || !userName ? "hidden" : "text-red-500"} />
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && userName && !validName ? "flex text-xs text-white bg-black p-2" : "hidden"}>
                        <FontAwesomeIcon className='px-2 h-[30px] w-[30px]' icon={faInfoCircle} />
                        Must begin with a letter.<br/>
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    <label className="block text-gray-700 text-sm font-bold" htmlFor="userage">
                        Age:
                        <FontAwesomeIcon icon={faCheck} className={validAge ? "text-teal-400 mx-4" : "hidden"} />
                        <FontAwesomeIcon icon={faTimes} className={validAge || !userAge ? "hidden" : "text-red-500"} />
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                        type="text"
                        id="userAge"
                        ref={ageRef}
                        autoComplete="off"
                        onChange={(e) => setUserAge(e.target.value)}
                        value={userAge}
                        required
                        aria-invalid={validAge ? "false" : "true"}
                        aria-describedby="agenote"
                        onFocus={() => setAgeFocus(true)}
                        onBlur={() => setAgeFocus(false)}
                    />
                    <p id="agenote" className={ageFocus && userAge && !validAge ? "flex text-xs text-white bg-black p-2" : "hidden"}>
                        <FontAwesomeIcon className='px-2 h-[30px] w-[30px]' icon={faInfoCircle} />
                        Any integer value.<br />
                    </p>


                    <label className="block text-gray-700 text-sm font-bold" htmlFor="email">
                        Email:
                        <FontAwesomeIcon icon={faCheck} className={validEmail ? "text-teal-400 mx-4" : "hidden"} />
                        <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hidden" : "text-red-500"} />
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                        type="text"
                        id="email"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p id="emailnote" className={emailFocus && email && !validEmail ? "flex text-xs text-white bg-black p-2" : "hidden"}>
                        <FontAwesomeIcon className='px-2 h-[30px] w-[30px]' icon={faInfoCircle} />
                        Any valid email address.<br />
                    </p>


                    <label className="block text-gray-700 text-sm font-bold" htmlFor="password">
                        Password:
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "text-teal-400 mx-4" : "hidden"} />
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hidden" : "text-red-500"} />
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "flex text-xs text-white bg-black p-2" : "hidden"}>
                        <FontAwesomeIcon className='px-2 h-[30px] w-[30px]' icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>


                        <label className="block text-gray-700 text-sm font-bold" htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "text-teal-400 mx-4" : "hidden"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hidden" : "text-red-500"} />
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "flex text-xs text-white bg-black p-2" : "hidden"}>
                            <FontAwesomeIcon className='px-2 h-[30px] w-[30px]' icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-6" disabled={!validName || !validPwd || !validMatch ? true : false}>Update</button>
                    </form>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => navigate("/profile")}>Cancel</button>
                </section>
    </React.Fragment>
  )
}

export default EditProfile