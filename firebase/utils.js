import firebase from 'firebase/app'
import { firebaseConfig } from './config'
import 'firebase/auth'
import 'firebase/database'

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const providerFacebook = new firebase.auth.FacebookAuthProvider();
const providerGoogle = new firebase.auth.GoogleAuthProvider();

const db = firebase.database();
const data = firebase.database().ref('/users');
const dataTeachers = firebase.database().ref('/teachers');
const ids = firebase.database().ref('/ids')

function getData(user, setUserData){
      data.on('value', function(snapshot){  
            var b = snapshot.child(user.uid).exists();                
            if (b === true){
                  let obj = snapshot.val() 
                  setUserData(obj[user.uid])
            } else {
                  dataTeachers.on('value', function(snapshot){  
                        var b = snapshot.child(user.uid).exists();                
                        if (b === true){
                              let obj = snapshot.val() 
                              setUserData(obj[user.uid])
                        } else {
                              setUserData(null)
                        }
                  })
            }
      })
}

function getIds(id, setTeacherId, userUid, name ){
      ids.on('value', function(snapshot){  
            var b = snapshot.child(id).exists();     
            if (b === true){
                  let uidTeacher = snapshot.child(id).child('uid').val()
                  db.ref(`teachers/${uidTeacher}/students/${userUid}`).set({ 
                         name,
                  })
                  setTeacherId(uidTeacher)
            } else {
                  setTeacherId(false)
            }
      })
}
function getProgress (setStudentsProgress, uid ){
      dataTeachers.on('value', function(snapshot){  
            var b = snapshot.child(`${uid}/students`).exists(); 
            if (b === true){
                  const array = []
                  snapshot.child(`${uid}/students`).forEach(function(childSnapshot) { 
                        db.ref(`/users/${childSnapshot.key}`).on('value', function(userSnapshot){
                              const valName = userSnapshot.child('aName').val()
                              const valProgress = userSnapshot.child('progress').val()
                              const valErrors = userSnapshot.child('errors').val()
                              const obj = {
                                    name: valName,
                                    progress: valProgress,
                                    errors: valErrors,
                              }
                             array.push(obj)
                          }) 
                   })
                   console.log(array)
                   setStudentsProgress(array)
              
            } else {
                  setStudentsProgress(null)
            }
      })
}
function onAuth (setUserProfile, setUserData) { 
      return auth.onAuthStateChanged(function(user) {
      if (user) {
            setUserProfile(user)
            getData(user, setUserData)
      } else {
            setUserProfile(user)
      }
    })
}
    
function withFacebook () {
      auth.signInWithPopup(providerFacebook).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
}

function withGoogle () {
      auth.signInWithPopup(providerGoogle).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
}

function handleSignOut() {
      auth.signOut().then(function() {
            // Sign-out successful.
      }).catch(function(error) {
            // An error happened.
      });     
}


function dataUser (aName, grade, school, avatar, cell, profesor) {
      const name = auth.currentUser.displayName
      const uid = auth.currentUser.uid
      console.log(name, uid)
      db.ref(`users/${uid}`).set({
            name,
            aName,
            grade,
            school,
            avatar,
            progress: 0,
            errors: 0,
            premium: false,
            cell,
            profesor,
            id: null,
      })
}
function setDataTeachers (aName, grade, school, avatar, cell, profesor) {
      const name = auth.currentUser.displayName
      const id = `${aName.split(' ')[0].toLowerCase()}${cell}`
      const uid = auth.currentUser.uid
      console.log(name, uid)
      db.ref(`teachers/${uid}`).set({
            name,
            aName,
            grade,
            school,
            avatar,
            progress: 0,
            errors: 0,
            premium: false,
            cell,
            profesor,
            id,
      })
      db.ref(`ids/${id}`).set({
            uid,
      })

}


function progressUpdate (n) {
      const uid = auth.currentUser.uid
      db.ref(`users/${uid}`).update({progress: n,})
}
function errorsUpdate (n) {
      const uid = auth.currentUser.uid
      db.ref(`users/${uid}`).update({errors: n,})
}

export { errorsUpdate, progressUpdate, auth, onAuth, withFacebook, withGoogle, handleSignOut, dataTeachers, dataUser, setDataTeachers, getIds, getProgress }
