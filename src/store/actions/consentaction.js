export const createConsent = (project, history) => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  dispatch({ type: "CREATE_PROJECT_LOAD" });

  const firestore = getFirestore();
  const profile = getState().firebase.profile;
  const authorId = getState().firebase.auth.uid;
  firestore
    .collection("projects")
    .add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId,
      createdAt: new Date(),
    })
    .then((p) => {
      dispatch({
        type: "CREATE_CONSENT_SUCCESS",
        payload: { id: p.id, ...project },
      });
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: "CREATE_CONSENT_ERROR", payload: err });
    });
};

export const getConsents = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("projects")
      .get()
      .then((result) => {
        let data = [];
        result.docs.forEach((doc) => {
          data.push(doc.data());
        });
        //console.log("DATA----->", data)÷
        dispatch({ type: "GET_CONSENTS", payload: data });
      })
      .catch((err) => {
        console.log("Error found---->", err);
      });
  };
};

export const updateTermsAndCondition = (isAccepted, userId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.collection("super_visors").doc(userId);
    user.update({
      doTermsAndConditionsAccepted: isAccepted,
      hasSelectedTermsAndConditions: true,
    });
    let superVisorAuth =
      JSON.parse(localStorage.getItem("superVisorAuth")) || [];
    superVisorAuth[0].doTermsAndConditionsAccepted = isAccepted;
    superVisorAuth[0].hasSelectedTermsAndConditions = true;
    localStorage.setItem("superVisorAuth", JSON.stringify(superVisorAuth));
  };
};
