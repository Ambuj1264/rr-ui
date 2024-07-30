import React from 'react';
import { Link } from 'react-router-dom';
import { homePage } from "../../hooks/query/homePage"
import { useQuery } from '@apollo/client';
import Loader from '../../util/loader';
import { BASE_URL_FOR_RESTAPI } from '../../envirement';
import "../../styles/style.header.css"
const NavLogo: React.FC = () => {

  const { loading, data } = useQuery(homePage)
  if (loading) {
    return <Loader />
  }
  const logo = `${BASE_URL_FOR_RESTAPI}/upload/${data?.HomePage?.header?.imageName}`
  return (
    <div>
      {data?.HomePage?.header?.imageName && (
        <Link to="/">
          <div className="navbar_content">
            <img className='img-logo py-2' src={logo} alt="Logo" />
          </div>
        </Link>
      )}
    </div>
  );
};

export default NavLogo;
