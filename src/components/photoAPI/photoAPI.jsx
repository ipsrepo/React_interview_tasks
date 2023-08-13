import React, {useEffect, useMemo, useState} from 'react';

const PhotoAPI = () => {
    const [photos, setPhotos] = useState({
        isLoading: false,
        data: [],
        error: null
    });

    useEffect(async () => {
        setPhotos( {...photos, isLoading: true})
        try{
            const res = await fetch('https://jsonplaceholder.typicode.com/photos')
            if(!res.ok){
                throw new Error('error fetching Data')
            }
            setPhotos({...photos, data: await res.json()})
        } catch (err){
            setPhotos({...photos, error: err.messages})
        }

        setPhotos({...photos, isLoading: false})
    }, []);

    const tableData = useMemo(()=> <tbody>
    {photos.data.length > 0 ?
        photos.data.map(data=>(<tr key={data.id}>
            <td>{data.title}</td>
            <td><img src={data.title} alt={data.title}/></td>
        </tr>)) : <tr><td colSpan='2'>No rows found</td></tr>
    }
    </tbody>, [photos.data])




    return (
        <div>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Image</th>
                </tr>
                {tableData}
            </table>
        </div>
    );

}
export default React.memo(PhotoAPI);
