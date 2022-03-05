import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  linkWithPopup,
  sendSignInLinkToEmail,
  signInWithCustomToken,
} from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID,
};

const fireApp = initializeApp(firebaseConfig);
export const auth = getAuth();

export const CustomTokenService = async (signer, walletAddress) => {
  const functions = getFunctions(fireApp);
  const getWalletNonce = httpsCallable(functions, 'getWalletNonce');
  const verifySignedMessage = httpsCallable(functions, 'verifySignedMessage');

  const walletUserDataResponse = async () => {
    try {
      const result = await getWalletNonce({
        address: walletAddress,
      });
      //@ts-ignore
      return result.data.nonce;
    } catch (err) {
      console.log(err);
    }
  };
  try {
    const walletUserData = await walletUserDataResponse();
    const sig = await signer.signMessage(walletUserData);
    //@ts-ignore
    const getCustomToken = await (await verifySignedMessage({ address: walletAddress, signature: sig })).data.token;
    try {
      const response = await signInWithCustomToken(auth, getCustomToken);
      return response.user;
    } catch (err) {}
  } catch (err) {
    console.log(err);
  }
};

const AuthURL =
  process.env.NODE_ENV === 'production' ? 'https://walletbook.netlify.app/account' : 'http://localhost:3000/account';

export const handleAddEmailAddress = async (address) => {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: AuthURL,
    // url: 'https://walletbook.netlify.app/account',
    handleCodeInApp: true,
  };
  sendSignInLinkToEmail(auth, address, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', address);
      alert('Check your inbox for an email confirmation');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
};

const handleAddGoogleAccount = (provider) => {
  linkWithPopup(auth.currentUser, provider)
    .then((result) => {
      // Accounts successfully linked.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user, credential);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      // ...
    });
};

export default fireApp;
