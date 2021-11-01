import React, { useContext } from "react";
import styles from "../styles/Home.module.css";
import { globalContext } from "../components/globalContext";

const editProfile = () => {
  
  const {
    sex,setSex,
    setName,
    name,
    password,
    setPassword,
    mail,
    setMail,
    updateProfile,
    uploadFile,
    setUploadFile,
    uploadPhoto,
  } = useContext(globalContext);
  return (
    <div className={styles.main}>
      <h1>プロフィール編集ページ</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>
          <input type="file" onChange={(e)=>uploadPhoto(e)}/>
        </label>
        <label>
          名前:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          メール:
          <input
            type="email"
            value={mail}
            placeholder="メールアドレスを入力"
            onChange={(e) => setMail(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          パスワード:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>

      <div>
        <select value={sex} onChange={e=>setSex(e.target.value)}>
          <option>性別を選択してください</option>
          <option value="Men">男性</option>
          <option value="Women">女性</option>
        </select>
      </div>
      <div>
        <button onClick={updateProfile}>変更する</button>
      </div>
    </div>
  );
};

export default editProfile;
