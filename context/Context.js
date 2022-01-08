import React, { useState, useMemo, useContext} from 'react'

const UserContext = React.createContext()

export function UserProvider ({ children }) {

	const [user, setUser] = useState(undefined)
	const [userDB, setUserDB] = useState('loading')
	const [avatar, setAvatar] = useState(null)

	function setUserProfile (userProfile) {
		setUser(userProfile)
	}
	function setUserData (userDatabase) {
		setUserDB(userDatabase)
	}
	function setUserAvatar (userAvatar) {
		setAvatar(userAvatar)
	}
	const value = useMemo(()=>{
		return ({
			user,
			userDB,
			avatar,
			setUserProfile,
			setUserData,
			setUserAvatar,
		})
	}, [avatar, user, userDB])

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