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
const premiumCode = firebase.database().ref('/premiumCode');
const dataTeachers = firebase.database().ref('/teachers');
const ids = firebase.database().ref('/ids')

function getData(user, setUserData){
      data.on('value', function(snapshot){  
            var b = snapshot.child(user.uid).exists();                
            if (b === true){
                  console.log(b)
                  let obj = snapshot.val() 
                  setUserData(obj[user.uid])
            } else {
                  dataTeachers.on('value', function(snapshot){  
                        var b = snapshot.child(user.uid).exists();
                        console.log(b)                
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

function getIds(id, setTeacherId, userUid, name, setUserSuccess ){
      ids.on('value', function(snapshot){  
            var b = snapshot.child(id).exists();     
            if (b === true){
                  let uidTeacher = snapshot.child(id).child('uid').val()
                  db.ref(`teachers/${uidTeacher}/students/${userUid}`).set({ 
                         name,
                  })
                  db.ref(`users/${userUid}`).update({ 
                        id,
                 })
                  setTeacherId(uidTeacher)
                  setUserSuccess(true)
            
            } else {
                  setTeacherId(false)
                  setUserSuccess(false)

            }
      })
}
function getCode(code, uid, setUserSuccess, account){
      premiumCode.once('value', function(snapshot){  
            var b = snapshot.child(code).exists();                
            if (b === true ){
                  var val = snapshot.child(code).val();
                  if(val == false) {
                        const us = account == true ? 'teachers' : 'users' 
                        db.ref(`/premiumCode/${code}`).set(true)
                        db.ref(`/${us}/${uid}/premium`).set(code)
                        setUserSuccess(true)
                  }else{
                        console.log('ya esta en uso')
                        setUserSuccess(false)
                  }
            } else {
               console.log('no exist')
               setUserSuccess(false)
            }
      })
}



function getProgress (setStudentsProgress, uid ){
      dataTeachers.on('value', function(snapshot){  
            var b = snapshot.child(`${uid}/students`).exists(); 
            if (b === true){
                  const array = []
                  snapshot.child(`${uid}/students`).forEach(function(childSnapshot) { 
                        db.ref(`/users/${childSnapshot.key}`).once('value', function(userSnapshot){
                              const valName = userSnapshot.child('aName').val()
                              const s = userSnapshot.child('s').val()
                              const r = userSnapshot.child('r').val()
                              const m = userSnapshot.child('m').val()
                              const d = userSnapshot.child('d').val()
                              const es = userSnapshot.child('es').val()
                              const er = userSnapshot.child('er').val()
                              const em = userSnapshot.child('em').val()
                              const ed = userSnapshot.child('ed').val()
                              const userUid = userSnapshot.child('uid').val()
                              const obj = {
                                    name: valName,
                                    s,
                                    r,
                                    m,
                                    d,
                                    es,
                                    er,
                                    em,
                                    ed,
                                    userUid
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
            play: 0,
            robot: 0,
            date: null,
            s: 0,
            r: 0,
            m: 0,
            d: 0,
            es: 0,
            er: 0,
            em: 0,
            ed: 0,
            uid,
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
            s: 0,
            r: 0,
            m: 0,
            d: 0,
            es: 0,
            er: 0,
            em: 0,
            ed: 0,
            uid,
      })
      db.ref(`ids/${id}`).set({
            uid,
      })

}
function setProgress (n, account, op) {
      const us = account == true ? 'teachers' : 'users' 
      const uid = auth.currentUser.uid
      switch (op){
            case 's':
                  db.ref(`${us}/${uid}`).update({s: n,})
                  break;
            case 'r':
                  db.ref(`${us}/${uid}`).update({r: n,})
                  break;
            case 'm':
                  db.ref(`${us}/${uid}`).update({m: n,})
                  break;
            case 'd':
                  db.ref(`${us}/${uid}`).update({d: n,})
            default:
                  break;

      }
}
function setErrors (n, account, op) {
      const us = account == true ? 'teachers' : 'users' 
      const uid = auth.currentUser.uid
      switch (op){
            case 's':
                  db.ref(`${us}/${uid}`).update({es: n,})
                  break;
            case 'r':
                  db.ref(`${us}/${uid}`).update({er: n,})
                  break;
            case 'm':
                  db.ref(`${us}/${uid}`).update({em: n,})
                  break;
            case 'd':
                  db.ref(`${us}/${uid}`).update({ed: n,})
            default:
                  break;

      }
}

function avatarUpdate (n, account) {
      const us = account == true ? 'teachers' : 'users' 
      const uid = auth.currentUser.uid
      db.ref(`${us}/${uid}`).update({avatar: n,})
}
function progressReset (account, s, r, m, d) {
      const us = account == true ? 'teachers' : 'users' 
      const uid = auth.currentUser.uid
      if(s == true){ db.ref(`${us}/${uid}`).update({s: 0, es: 0,}) }
      if(r == true){ db.ref(`${us}/${uid}`).update({r: 0, er: 0,}) }
      if(m == true){ db.ref(`${us}/${uid}`).update({m: 0, em: 0,}) }
      if(d == true){ db.ref(`${us}/${uid}`).update({d: 0, ed: 0,}) }

     
}

function userDelete (userUid) {
    
      const uid = auth.currentUser.uid
      db.ref(`${'/teachers'}/${uid}/students/${userUid}`).remove()
      db.ref(`${'/users'}/${userUid}`).update({id: 'Te ha eliminado'})

}
function playDificult (account, dificultObject) {
      const us = account == true ? 'teachers' : 'users' 
      const uid = auth.currentUser.uid
      if (us == 'teachers') { 
            db.ref(`${us}/${uid}/students`).once('value', function(snapshot){
                  snapshot.forEach(function(childSnapshot) {
                  console.log(childSnapshot.key)
                  db.ref(`${'/users'}/${childSnapshot.key}`).update(dificultObject)

                  });
            });
            db.ref(`${us}/${uid}`).update(dificultObject)

      }
}

export { playDificult, userDelete, auth, onAuth, withFacebook, withGoogle, handleSignOut, dataTeachers, dataUser, setDataTeachers, getIds, getProgress, getCode, avatarUpdate, progressReset, setProgress, setErrors }
