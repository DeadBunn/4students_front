import React, {useContext, useState} from "react";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";


const Auth = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, Setemail] = useState('')
    const [password, SetPassword] = useState('')
    const {user} = useContext(Context)
    const history = useHistory()
    const [userLogin, SetuserLogin] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, userLogin, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            user.setRole(data.role)
            user.setBalance(data.balance)
            history.push(MAIN_ROUTE)
        } catch (e) {
            alert(e.message)
        }

    }

    return (

        <div className="validLogin">
            <div>
                <span className="firstPartOfName">4S</span><span className="secondPartOfName">tudents</span>
            </div>
            <div className="loginContainer">
                <div className="upperBox">
                    <div className="wordTest">
                        {/* <NavLink to={MAIN_ROUTE} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="49" viewBox="0 0 50 49" fill="none">
                            <path d="M25 0C38.8 0 50 10.8267 50 24.1667C50 37.5067 38.8 48.3333 25 48.3333C11.2 48.3333 0 37.5067 0 24.1667C0 10.8267 11.2 0 25 0ZM25 21.75V14.5L15 24.1667L25 33.8333V26.5833H35V21.75H25Z" fill="#3B6064"/>
                            </svg>
                                
                            </NavLink> */}
                        {isLogin ? 'Авторизация' : 'Регистрация'}
                    </div>
                </div>
                <div>
                    <input className="emailBox"
                           type="email"
                           placeholder="Введите ваш email..."
                           value={email}
                           onChange={(e) => Setemail(e.target.value)}
                    />
                    {isLogin ?
                        <></>
                        :
                        <input className="emailBox"
                               type="text"
                               placeholder="Введите логин"
                               value={userLogin}
                               onChange={(e) => SetuserLogin(e.target.value)}
                        />
                    }
                    <input className="emailBox"
                           type="password"
                           placeholder="Введите ваш пароль..."
                           value={password}
                           onChange={(e) => SetPassword(e.target.value)}
                    />
                    <button className="authButton">
                        <div
                            className="buttonWord"
                            onClick={click}
                        >{isLogin ? 'Войти' : 'Зарегистрироваться'}</div>
                    </button>
                    {isLogin ?
                        <div className="helpWord">
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                        </div>
                        :
                        <div className="helpWord">
                            Есть аккаунт <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>
                    }

                </div>
            </div>
        </div>

    );
};

export default Auth;