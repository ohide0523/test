import React, { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import Cookies from "js-cookie";

export const globalContext = createContext();

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyC3BojwYSwkkdy1i-nQirhmduMyWviTmnQ",
    authDomain: "test-60b13.firebaseapp.com",
    projectId: "test-60b13",
    storageBucket: "test-60b13.appspot.com",
    messagingSenderId: "678456315490",
    appId: "1:678456315490:web:6b134578518d742f7a0b3b",
  });
}

const db = firebase.firestore();
const storageRef = firebase.storage().ref();
const auth = firebase.auth();

// const reader = new FileReader;

const ContextProvider = ({ children }) => {
  const router = useRouter("signedIn");
  const signedIn = Cookies.get("signedIn");

  // ユーザー関連

  // 他人のユーザー（個人）
  const [anotherUser, setAnotherUser] = useState([]);
  // 他人のユーザー
  const [anotherUsers, setAnotherUsers] = useState([]);
  // 他人のユーザーitem
  const [anotherUserItems, setAnotherUserItems] = useState([]);

  // 自分のユーザー
  const [myUser, setMyUser] = useState([]);
  // ユーザーのuid
  const [uid, setUid] = useState(null);
  // ログイン用のemail
  const [email, setEmail] = useState("");

  // ログイン中のユーザー情報
  const [name, setName] = useState("");
  // メール情報(更新したりする用)
  const [mail, setMail] = useState("");
  // パスワード
  const [password, setPassword] = useState("");
  // 性別
  const [sex, setSex] = useState("");
  // プロフィール写真
  const [userImg, setUserImg] = useState("");

  // ユーザーが出品するitem
  const [items, setItems] = useState([]);
  // itemsのドキュメントに自動で生成されるIDを取得する
  const [newDoc, setNewDoc] = useState("");

  // ユーザーが出品するitem情報
  // タイトル
  const [title, setTitle] = useState("");
  // 内容
  const [content, setContent] = useState("");
  // カテゴリー
  const [category, setCategory] = useState("");
  // 価格
  const [value, setValue] = useState("");

  // 出品アイテムを編集する用のitemのidを管理
  const [editId, setEditId] = useState(null);

  //ログインの状態
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setNewDoc(
          db.collection("users").doc(user.uid).collection("items").doc().id
        );
        getAnotherUsers();

        setUid(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    if (uid == null) {
      console.log("uidはnullです");
    } else {
      const userDoc = db.collection("users").doc(uid).get();
      // 匿名のアカウントが存在しない場合に新しいアカウントを作成する
      if (!userDoc.exists) {
        db.collection("users").doc(uid).set({
          name: "匿名ユーザー",
          sex: "Men",
          id: uid,
          email: "設定されていません",
          createAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        console.log("プロフィールを上書きしました")
      }
      // アカウントが既に存在する場合
      getMyUser(uid);
    }
  }, [uid]);

  // 個人のユーザー情報の取得
  const getMyUser = () => {
    let user = [];
    db.collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        user.push({
          name: doc.data().name,
          email: doc.data().email,
          id: doc.data().id,
          img: doc.data().imgURL,
          imgID: doc.data().imgID,
          createAt: doc.data().createAt,
        });
        return setMyUser(user);
      });
  };

  // 全ユーザーの取得
  const getAnotherUsers = () => {
    let users = [];
    db.collection("users")
      .orderBy("createAt", "desc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          users.push({
            name: doc.data().name,
            email: doc.data().email,
            id: doc.data().id,
          });
        });
        console.log(users);
        setAnotherUsers(users);
      });
  };

  // 他人のユーザー情報を送る
  const sendAnotherUser = (id) => {
    console.log(id);
    let user = [];
    db.collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        user.push({
          name: doc.data().name,
          id: doc.data().id,
        });
        setAnotherUser(user);
      });
  };

  // ユーザーのプロフィールを更新
  const updateProfile = () => {
    db.collection("users")
      .doc(uid)
      .update({
        name: name,
        email: mail,
        password: password,
        sex: sex,
      })
      .then(() => {
        getMyUser(uid);
        alert("ユーザー情報を更新しました！");
        setName("");
        setMail("");
        router.replace("/top");
      });
  };

  //emailアカウント作成
  const createEmailUser = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      db.collection("users").doc(uid).set({
        name: "ユーザー",
        email: email,
        id: uid,
        sex: sex,
      });
      alert("アカウントを作成しました！");
      setEmail("");
      setPassword("");
    });
  };

  //emailログイン
  const emailLogin = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("ログインに成功しました！");
        // ログインボタンにLinkタグをつけるのではなく、このonClickイベントからtopに飛ぶようにする。
        router.push("/top");
      })
      .catch(() => {
        alert("ログインに失敗しました。。");
        router.replace("/login");
      });
  };

  // 匿名ログイン
  const anonymousLogin = async () => {
    auth.signInAnonymously().then(() => {
      alert("匿名ログインしました！");
      router.push("/top");
      console.log(uid);
    });
  };

  // ログアウト
  const logout = () => {
    auth.signOut().then(() => {
      alert("ログアウトしました");
      setIsLogin(false);
      Cookies.remove("signedIn");
      router.replace("/login");
      setEmail("");
      setName("");
    });
  };

  // メールアドレスによるユーザー確認・認証
  const validateEmail = () => {
    auth.currentUser.sendEmailVerification();
  };

  //  ユーザー削除
  const deleteUser = () => {
    db.collection("users")
      .doc(uid)
      .delete()
      .then(() => {
        alert("ユーザー情報を削除しました。。");
        router.push("/login");
      });
  };

  // パスワード変更
  const changePassword = () => {
    auth.currentUser.updatePassword(password).then(() => {
      alert("パスワードを変更しました！");
    });
  };

  // パスワード再生成
  const resetPassword = () => {
    auth.sendPasswordResetEmail(email).then(() => {
      alert("リセットするためのURLを送りました！");
    });
  };

  //firestore関連

  // 出品アイテムの追加
  const createItem = () => {
    let item = [];
    db.collection("users")
      .doc(uid)
      .collection("items")
      .doc(newDoc)
      .set({
        item: "ユーザーが出品した商品です",
        id: newDoc,
        title: title,
        content: content,
        category: category,
        value: value,
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        alert("出品に成功しました！");
        db.collection("users")
          .doc(uid)
          .collection("items")
          .get()
          .then((snapShot) => {
            snapShot.forEach((doc) => {
              item.push({
                id: doc.data().id,
                title: doc.data().title,
                content: doc.data().content,
                category: doc.data().category,
                value: doc.data().value,
                ...doc,
              });
              setItems(item);
              //文字列の整理
              setTitle("");
              setContent("");
              setCategory("");
              setValue("");
              console.log(item);
            });
          });
      });
  };

  // 全ユーザーの出品アイテム取得
  const getAnotherUsersItems = () => {
    let items = [];
    db.collectionGroup("items")
      .orderBy("createAt", "desc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          items.push({
            title: doc.data().title,
            content: doc.data().content,
            category: doc.data().category,
            value: doc.data().value,
          });
        });
      });
    return setAnotherUserItems(items);
  };

  //  出品アイテムの取得(自分)
  const getItems = () => {
    let item = [];
    db.collection("users")
      .doc(uid)
      .collection("items")
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          item.push({
            id: doc.data().id,
            title: doc.data().title,
            content: doc.data().content,
            category: doc.data().category,
            value: doc.data().value,
          });
          setItems(item);
          console.log(item);
        });
      });
  };

  // 出品アイテムを編集するためにアイテムのIDを送信
  const sendItemId = (id) => {
    setEditId(id);
    console.log(editId);
  };

  // 出品アイテムの編集(更新)
  const updateItem = () => {
    db.collection("users")
      .doc(uid)
      .collection("items")
      .doc(editId)
      .update({
        // id: newDoc, ←更新の時に自動生成IDを入れると一致しなくなるからNG
        title: title,
        content: content,
        category: category,
        value: value,
        updateAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        alert("商品の更新をしました！");
        setTitle("");
        setContent("");
        setCategory("");
        setValue("");
      });
  };

  //出品アイテムのIDを指定して取得

  //  出品アイテムの削除
  const userItemDelete = (id) => {
    db.collection("users")
      .doc(uid)
      .collection("items")
      .doc(id)
      .delete()
      .then(() => {
        getItems();
        alert("商品を削除しました。");
      });
  };

  // 写真のアップロード
  const uploadPhoto = (e) => {
    const file = e.target.files;
    let blob = new Blob(file, { type: "image/jpeg" });
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => S[n % S.length])
      .join("");

    storageRef
      .child(fileName)
      .put(blob)
      .then(() => {
        storageRef
          .child(fileName)
          .getDownloadURL()
          .then((imgURL) => {
            db.collection("users").doc(uid).update({
              imgURL: imgURL,
              imgID: fileName,
            });
            setUserImg(imgURL);
            console.log(userImg);
          });
      });
  };

  // プロフィール写真の削除
  const deletePhoto = (id) => {
    const lec = window.confirm("この写真を削除しますか？");
    if (!lec) {
      return false;
    } else {
      db.collection("users").doc(uid).update({
        imgURL: firebase.firestore.FieldValue.delete(),
        imgID: firebase.firestore.FieldValue.delete(),
      });
      return storageRef.child(id).delete();
    }
  };

  return (
    <>
      <globalContext.Provider
        value={{
          myUser,
          userImg,
          anotherUser,
          anotherUsers,
          anotherUserItems,
          items,
          title,
          setTitle,
          content,
          setContent,
          category,
          setCategory,
          value,
          setValue,
          name,
          setName,
          mail,
          setMail,
          isLogin,
          setIsLogin,
          email,
          setEmail,
          password,
          setPassword,
          sex,
          setSex,
          emailLogin,
          anonymousLogin,
          createEmailUser,
          logout,
          deleteUser,
          changePassword,
          resetPassword,
          updateProfile,
          createItem,
          sendItemId,
          updateItem,
          getItems,
          getAnotherUsers,
          userItemDelete,
          sendAnotherUser,
          uploadPhoto,
          deletePhoto,
        }}
      >
        {children}
      </globalContext.Provider>
    </>
  );
};

export default ContextProvider;
