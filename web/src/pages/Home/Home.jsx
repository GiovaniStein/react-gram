import './Home.css'

import LikeContainer from '../../components/LikeContainer';
import PhotoItem from '../../components/PhotoItem';
import { Link } from "react-router-dom";

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPhotos, like, resetMessage } from '../../slices/photoSlice';

const Home = () => {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(getPhotos())
  }, [dispatch]);

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
    <div id="home">
      {photos && photos.map((photo) => (
        <div key={photo._id}>
          <PhotoItem photo={photo} />
          <LikeContainer photo={photo} user={user} handleLike={handleLike} />
          <Link className='btn' to={`/photos/${photo._id}`}>Ver mais</Link>
        </div>
      ))}
      {photos && photos.lenght === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas, {" "}
          <Link to={`/users/${user._id}`}>clique aqui</Link>
        </h2>
      )}
    </div>
  )
}

export default Home