import history from "../../history";

export const signIn = (payload) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const { email, password } = payload;
  firestore
    .collection("super_visors")
    .where("emailid", "==", email)
    .where("password", "==", password)
    .get()
    .then((res) => {
      let userInfo = [];
      res.forEach((doc) => {
        let obj = {};
        obj["id"] = doc.id;
        obj = {
          ...obj,
          ...doc.data(),
        };
        userInfo.push(obj);
      });
      console.log(userInfo);
      if (userInfo.length) {
        dispatch({ type: "LOGIN_SUCCESS_SUPER_VISOR", payload: userInfo });
        let superVisorAuth =
          JSON.parse(localStorage.getItem("superVisorAuth")) || [];
        superVisorAuth.push(userInfo[0]);
        localStorage.setItem("superVisorAuth", JSON.stringify(superVisorAuth));
        // history.push("/superVisor");
      } else {
        dispatch({
          type: "LOGIN_FAILURE_SUPER_VISOR",
          payload: "Something went wrong",
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: "LOGIN_FAILURE_SUPER_VISOR",
        payload: "Something went wrong",
      });
    });
};

export const signUp = (newUser) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((resp) => {
      return firestore
        .collection("keyrole")
        .doc(resp.user.uid)
        .set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          initials: newUser.firstName[0] + newUser.lastName[0],
        });
    })
    .then(() => {
      dispatch({ type: "SIGNUP_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "SIGNUP_ERROR", payload: err });
    });
};

export const signOut = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "SIGNOUT_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "SIGNOUT_ERROR", payload: err });
    });
};
