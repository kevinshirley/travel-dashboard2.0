import React from "react";
import Link from 'next/link';
import nookies from "nookies";
import { firebaseAdmin } from "../firebaseAdmin";
import firebaseClient from 'firebase/app';
import initFirebase from 'src/lib/auth/initFirebase';
initFirebase();

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    // console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;
    console.log({ token });

    // the user is authenticated!
    // FETCH STUFF HERE

    return {
      props: { message: `Welcome! Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      redirect: {
        permanent: false,
        destination: "/sign-in",
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {},
    };
  }
};

const AuthenticatedPage = (
  props
) => (
  <div>
    <Link href="/">
      <a>Back Home</a>
    </Link>
    <p>{props.message}</p>
    <button
      onClick={async () => {
        await firebaseClient.auth().signOut();
        window.location.href = "/";
      }}
    >
      Sign out
    </button>
  </div>
);

export default AuthenticatedPage;
