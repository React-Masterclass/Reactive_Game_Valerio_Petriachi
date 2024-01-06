import  ApNavBar  from '../components/ApNavBar';
import  AppLayout  from '../Layout/AppLayout';
import AppFooter from '../components/AppFooter';

function Root() {
  return (

    <div>
      <div className="scanline"></div>
      <div className="container">
        <ApNavBar/>
        <AppLayout />
        <AppFooter />
      </div>
    </div>
  );
}

export default Root;