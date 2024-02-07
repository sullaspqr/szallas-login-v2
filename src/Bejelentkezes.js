import { useState } from 'react';
import { login } from "./AuthService";
import { useNavigate } from "react-router-dom";

export function Bejelentkezes() {
    const [isLoginPending, setLoginPending] = useState(false);
    const navigate = useNavigate();

    function loginFormSubmit(e) {
        e.persist();
        e.preventDefault();
        setLoginPending(true);
        login(e.target.email.value, e.target.password.value)
        .then(() => {
            setLoginPending(false);
            navigate("/osszes-szallas");
        })
        .catch((error) => {
            alert("Helytelen bejelentkezési adatok, kérjük próbáld újra! Hibajelzés: " + error);
            setLoginPending(false);
        });
    }

    if(isLoginPending) {
     return(
        <div className="center-item">
            <div className="spinner-border text-danger"></div>
        </div>
     );
    }
    return(
        <div className="container-fluid d-flex justify-content-center h-100 login-container">
            <div className="card login-card">
                <div className='card-header login-card-header'>
                    <h3>Bejelentkezés</h3>
                </div>
                <div className='card-body'>
                    <form onSubmit={loginFormSubmit}>
                        <div className='input-group form-group'>
                            <input type="email" name="email" className="form-control" placeholder="Email"/>
                        </div>
                        <div className='input-group form-group'>
                            <input type="password" name="password" className="form-control" placeholder="Jelszó"/>
                        </div>
                        <div className='form-group'>
                            <button type="submit" value="Bejelentkezés" className="btn float-right btn-warning">
                                Bejelentkezés</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
    );
}