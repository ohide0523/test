import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { globalContext } from "../components/globalContext";
import Auth from "../components/auth";

const top = () => {
  const {
    myUser,
    uid,
    password,
    setPassword,
    changePassword,
    deleteUser,
    logout,
    email,
    name,
    items,
    userItemDelete,
    getItems,
    sendItemId,
    anotherUsers,
    setAnotherUsers,
    anotherUserItems,
    getAnotherUsers,
    sendAnotherUser,
    deletePhoto,
  } = useContext(globalContext);

  return (
    <Auth>
      <Link href="/">
        <div>homeに戻る</div>
      </Link>
      <div>
        <h1>あなたのページ</h1>
        <ul>
          {myUser.length > 0 &&
            myUser.map((user, index) => (
              <li key={index}>
                <img
                  src={user.img}
                  alt="プロフィール"
                  onClick={() => deletePhoto(user.imgID)}
                />
                <p>名前:{user.name}</p>
                <p>id:{user.id}</p>
                <p>メール:{user.email}</p>
              </li>
            ))}
        </ul>

        <Link href="editProfile">
          <button>プロフィールを編集する</button>
        </Link>

        <Link href="/item">
          <button>出品する</button>
        </Link>

        <button onClick={deleteUser}>ユーザー削除</button>

        <h2>ユーザー一覧</h2>
        <button onClick={getAnotherUsers}>ユーザーを表示する</button>
        <select>
          <option>ユーザーの性別を選んでください</option>
          <option>男性</option>
          <option>女性</option>
        </select>
        <ul>
          {anotherUsers.map((user, index) => (
            <li key={index}>
              <Link href="/profile">
                <p onClick={() => sendAnotherUser(user.id)}>{user.name}</p>
              </Link>
              <p>{user.email}</p>
              <p>{user.id}</p>
            </li>
          ))}
        </ul>

        <h1>あなたの出品した商品</h1>
        <button onClick={getItems}>item取得</button>
        <ul>
          {items.length > 0 &&
            items.map((userItem, index) => (
              <li key={index}>
                <p>id:{userItem.id}</p>
                <Link href="/editItems">
                  <h2 onClick={() => sendItemId(userItem.id)}>
                    {userItem.title}
                  </h2>
                </Link>
                <p>{userItem.content}</p>
                <p>{userItem.category}</p>
                <p>{userItem.value}円</p>
                <button onClick={() => userItemDelete(userItem.id)}>
                  商品を削除
                </button>
              </li>
            ))}
        </ul>

        <h1>他の人が出品した商品</h1>
        <ul>
          {anotherUserItems.length > 0 &&
            anotherUserItems.map((item,index) => {
              <li key={index}>
                <p>{item.title}</p>
                <p>{item.content}</p>
                <p>{item.category}</p>
                <p>{item.value}</p>
              </li>;
            })}
        </ul>
      </div>
      <div>
        <button onClick={logout}>ログアウト</button>
      </div>
    </Auth>
  );
};

export default top;
