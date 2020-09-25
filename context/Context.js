import React, { useState, useMemo, useContext} from 'react'

const UserContext = React.createContext()

export function UserProvider ({ children }) {

	const [user, setUser] = useState(null)

	function setUserProfile (userProfile) {
		setUser(userProfile)
		console.log(userProfile)
	}

	const value = useMemo(()=>{
		return ({
			user,
			setUserProfile,
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