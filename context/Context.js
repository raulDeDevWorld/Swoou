import React, { useState, useMemo, useContext} from 'react'

const UserContext = React.createContext()

export function UserProvider ({ children }) {

	const [user, setUser] = useState(undefined)
	const [userDB, setUserDB] = useState('loading')
	const [avatar, setAvatar] = useState(null)
	const [id, setId] = useState(null)
	const [progress, setProgress] = useState([])

	function setUserProfile (userProfile) {
		setUser(userProfile)
	}
	function setUserData (userDatabase) {
		setUserDB(userDatabase)
	}
	function setUserAvatar (userAvatar) {
		setAvatar(userAvatar)
	}
	function setTeacherId (uid) {
		setId(uid)
	}
	function setStudentsProgress (obj) {
		setProgress(obj)
	}
	const value = useMemo(()=>{
		return ({
			user,
			userDB,
			avatar,
			id,
			progress,
			setUserProfile,
			setUserData,
			setUserAvatar,
			setTeacherId,
			setStudentsProgress,
		})
	}, [avatar, user, userDB, id])

	return (
		<UserContext.Provider value={value} >
			{ children }
		</UserContext.Provider>
	)
} 

export function useUser () {
	const context = useContext(UserContext)
	if(!context){
		throw new Error('error')
	}
	return context
}