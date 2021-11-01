import React, { useContext } from "react";
import Link from "next/link"
import { globalContext } from "../components/globalContext";
import styles from "../styles/Home.module.css";
import Auth from "../components/auth";

const item = () => {
  const {
    title,
    setTitle,
    content,
    setContent,
    category,
    setCategory,
    value,
    setValue,
    createItem,
  } = useContext(globalContext);
  return (
    <Auth>
      <div className={styles.main}>
        <h1>出品作成ページ</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトルを入力"
        />
        <textarea
          placeholder="内容を入力"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>カテゴリーを選んでください</option>
          <option value="携帯機器">携帯機器</option>
          <option value="PC関連">PC関連</option>
          <option value="フード">フード</option>
          <option value="ホビー">ホビー</option>
        </select>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="価格を入力"
        />
        <Link href="/top">
        <button onClick={createItem}>出品</button>
        </Link>
      </div>
    </Auth>
  );
};

export default item;
