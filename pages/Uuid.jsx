import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'
import { generateUUID } from '../utils/uuidGenerator.js'
import { useState, useEffect } from 'react'


function Uuid () {
    const [codes, setCodes] = useState([])

    function generate () {
        const one = generateUUID()
        const two = generateUUID()
        const three = generateUUID()
        const four = generateUUID()
        const five = generateUUID()
        const six = generateUUID()
        const seven = generateUUID()
        const eight = generateUUID()
        const nine = generateUUID()
        const ten = generateUUID()
        const array = [one, two, three, four, five, six, seven, eight, nine, ten]
        setCodes(array)
 
    }
    console.log(codes)
    useEffect(() => {
        generate()
    }, []);
    return (
    <>
        {codes.map((item, i)=> <div style={{textDecoration: 'none'}} key={i}>{item}</div>)}
        
    </>
    )
}

export default WithAuth(Uuid)