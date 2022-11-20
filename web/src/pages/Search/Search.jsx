import './Search.css'

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '../../hooks/useQuery';

import LikeContainer from '../../components/LikeContainer';
import PhotoItem from '../../components/PhotoItem';
import { Link } from 'react-router-dom';

import { searchPhotos, like, resetMessage } from '../../slices/photoSlice';

const Search = () => {

    const query = useQuery();
    const search = query.get("q");
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { photos, loading } = useSelector(state => state.photo);

    useEffect(() => {
        dispatch(searchPhotos(search));
    }, [dispatch, search])

    const handleLike = (photo) => {
        dispatch(like(photo._id));
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000)
    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div id="search">
            <h2>Você está buscando por: {search}</h2>
            {photos && photos.map((photo) => (
                <div key={photo._id}>
                    <PhotoItem photo={photo} />
                    <LikeContainer photo={photo} user={user} handleLike={handleLike} />
                    <Link className='btn' to={`/photos/${photo._id}`}>Ver mais</Link>
                </div>
            ))}
            {photos && photos.lenght === 0 && (
                <h2 className="no-photos">
                    Não foram encontrados resultados para sua busca...
                </h2>
            )}
        </div>
    )
}

export default Search