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

function getData(user, setUserData){
      data.on('value', function(snapshot){  
            var b = snapshot.child(user.uid).exists();                
            if (b === true){
                  let obj = snapshot.val() 
                  setUserData(obj[user.uid])
            }else{
                  setUserData(null)
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


function dataUser (aName, grade, school, avatar) {
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
      })
}


function progressUpdate (n) {
      const uid = auth.currentUser.uid
      db.ref(`users/${uid}`).update({progress: n,})
}

export { progressUpdate, auth, onAuth, withFacebook, withGoogle, handleSignOut, dataUser }
