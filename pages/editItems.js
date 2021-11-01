import React, { useContext } from "react";
import { globalContext } from "../components/globalContext";
import styles from "../styles/Home.module.css";
import Auth from "../components/auth";

const EditItems = () => {
  const {
    uid,
    editId,
    title,
    setTitle,
    content,
    setContent,
    category,
    setCategory,
    value,
    setValue,
     updateItem,
  } = useContext(globalContext);
  console.log(uid)
  return (
   
    <Auth>
      <div className={styles.main}>
        <h1>商品編集ページ</h1>
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
        <button onClick={updateItem}>更新</button>
      </div>
    </Auth>
  );
};

export default EditItems;
