import React, { useState, useMemo, useContext} from 'react'

const UserContext = React.createContext()

export function UserProvider ({ children }) {

    const [user, setUser] = useState(undefined)

	function setUserProfile (userProfile) {
		setUser(userProfile)
		console.log(userProfile)
	}
	function setUserProfileNull () {
		setUser(null)
	}

	const value = useMemo(()=>{
		return ({
			user,
            setUserProfile,
            setUserProfileNull
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