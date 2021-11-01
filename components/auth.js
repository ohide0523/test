import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Auth = ({ children }) => {

  const router = useRouter();

  //Cookieのチェック（これをいろいろ認証タイプにより変更）
  const signedIn = Cookies.get("signedIn");
  
//signedInがtrueじゃなければ/loginへ
// if (signedIn !== "true") router.replace("/login");

  return children;
};

export default Auth;
