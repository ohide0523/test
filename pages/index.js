import React, { useContext,useEffect,useState} from "react";
import {useRouter} from "next/router"
import Link from "next/link";
import { globalContext } from "../components/globalContext";
import styles from "../styles/Home.module.css";



export default function Home() {
  const { logout } = useContext(globalContext);
  
  return (
    
      <div className={styles.main}>
        <h1>TOPページ</h1>
        <button onClick={logout}>ログアウト</button>
        <Link href="/top">
          <a>TOPページへ</a>
        </Link>
      </div>
   
  );
}
