import React, { useContext } from "react";
import Link from "next/link"
import { globalContext } from "../components/globalContext";
import styles from "../styles/Home.module.css";

const create = () => {
  const { email, setEmail, password, setPassword, createEmailUser } =
    useContext(globalContext);
  return (
    <div className={styles.main}>
      <h1>新規登録</h1>
      <label>
        メール：
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </label>
      <label>
        パスワード：
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </label>
      <Link href="/">
      <button onClick={() => createEmailUser(email, password)}>新規登録</button>
      </Link>
    </div>
  );
};

export default create;
