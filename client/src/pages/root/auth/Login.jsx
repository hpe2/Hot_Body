import { useNavigate } from "react-router-dom";
import "../../../style/auth.css";
import { useState } from "react";
import { useSignIn } from "../../../Queries/queriesAndMutations";
import { useUserContext } from "../../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { mutateAsync: login } = useSignIn();
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const { checkAuthUser } = useUserContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = {
      userId,
      password,
    };
    const res = await login(userData);
    console.log(res);
    if (res.status === 200) {
      alert("로그인 되셨습니다.");
      setUserId("");
      setPassword("");
      checkAuthUser();
      navigate("/");
    } else {
      alert("로그인에 실패하셨습니다.");
    }
  };

  return (
    <div className="LoginContainer">
      <div className="loginLeftSection"></div>

      <div className="loginRightSection">
        <ul className="authLinks">
          <li className="authMenuActive">로그인</li>
          <li onClick={() => navigate("/signup")}>회원가입</li>
        </ul>

        <form className="loginForm" onSubmit={handleLogin}>
          <input
            type="userId"
            placeholder="유저 아이디"
            className="userIdInput userIdIcon"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pwdInput pwdIcon"
          />
          <button type="submit" id="btn">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;