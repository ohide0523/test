import React, { useContext, useState } from "react";
import Link from "next/link";
import { globalContext } from "../components/globalContext";
import styles from "../styles/Home.module.css";

const Login = () => {
  const [open, setOpen] = useState(false);
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailLogin,
    anonymousLogin,
    resetPassword,
  } = useContext(globalContext);

  const openInput = () => {
    setOpen(true);
  };
  return (
    <>
      <div className={styles.main}>
        <Link href="/">
          <div>homeに戻る</div>
        </Link>
        <h1>ログインページ</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button onClick={() => emailLogin(email, password)}>ログイン</button>
        <div onClick={openInput}>パスワードを忘れた方</div>
        {open && (
          <>
            <input
              type="email"
              value={email}
              placeholder="メールアドレスを入力"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={resetPassword}>送信</button>
          </>
        )}
        <div>もしくは</div>
        <Link href="/create">
          <a>新規登録</a>
        </Link>
        <div>
          <Link href="/top">
            <button onClick={() => anonymousLogin()}> 匿名ログイン</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
