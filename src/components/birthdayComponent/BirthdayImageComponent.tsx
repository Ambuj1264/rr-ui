import React from "react";
import { BASE_URL_FOR_RESTAPI } from "../../envirement";

interface BirthdayImageComponentProps {
  imgSrc: string;
  title: string;
  description: string;
}

const BirthdayImageComponent: React.FC<BirthdayImageComponentProps> = ({
  imgSrc,
  title,
  description,
}) => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
  return (
    <div>
      <div className="birthday_body">
        {imgSrc ? (
          <img
            src={`${BASE_URL_FOR_RESTAPI}/upload/${imgSrc}`}
            className="img-fluid"
            alt="Birthday Pic"
          />
        ) : (
          ""
        )}

        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default BirthdayImageComponent;
