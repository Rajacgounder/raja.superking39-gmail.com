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
      .then(p => {
        dispatch({
          type: "CREATE_CONSENT_SUCCESS",
          payload: { id: p.id, ...project },
        });
        history.push("/");
      })
      .catch(err => {
        dispatch({ type: "CREATE_CONSENT_ERROR", payload: err });
      });
  };
  

  export const getConsents = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      firestore.collection('projects').get().then(result => {
        let data = [];
        result.docs.forEach(doc => {
          data.push(doc.data())
        });
        //console.log("DATA----->", data)÷
        dispatch({ type: 'GET_CONSENTS', payload: data })
      }).catch(err => {
        console.log("Error found---->", err)
      })
    }
  }