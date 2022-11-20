import './Auth.css'

import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Submit from '../../components/Submit';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { login, reset } from "../../slices/authSlice";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    };

    dispatch(login(user));
  }

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitule">Faça o login para ver o que há de novo.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="E-mail" />
        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Senha" />
        <Submit loading={loading} error={error} value="Entrar"/>
      </form>
      <p>Não tem uma conta? <Link to="/register">Clique aqui</Link></p>
    </div>
  )
}

export default Login