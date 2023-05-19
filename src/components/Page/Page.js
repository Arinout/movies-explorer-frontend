import './Page.css';
import Header from '../Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Page () {
  const currentLocation = useLocation();
  const footerRoutesArr = ['/', '/movies', '/saved-movies'];
  const handleElementRouteCheck = (routesArr) =>
    routesArr.some((route) => route === currentLocation.pathname);

  return(
    <div className='page'>
      <Header/>
      <Outlet />
      {handleElementRouteCheck(footerRoutesArr) && <Footer />}
    </div>
  );
}

export default Page;