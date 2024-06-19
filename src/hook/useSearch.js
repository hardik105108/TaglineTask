import { useState } from 'react'

const useSearch = (data) => {

    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = (e) => setSearchTerm(e.target.value)
    const searchData = data.filter(item => item?.name.toLowerCase().includes(searchTerm.toLowerCase()))
    return { handleSearch, searchData }
}



export default useSearch