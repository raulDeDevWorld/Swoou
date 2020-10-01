import React, { useState, useMemo, useContext} from 'react'

const UserContext = React.createContext()

export function UserProvider ({ children }) {

	const [user, setUser] = useState(undefined)
	const [userData, setUserData] = useState(null)

	function setUserProfile (userProfile) {
		setUser(userProfile)
	}

	const value = useMemo(()=>{
		return ({
			user,
			userData,
			setUserProfile,
			setUserData,
		})
	}, [user])

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