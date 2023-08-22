import "./welcome.scss";

import { ProductsWheel } from "./ProductsWheel";
import React from "react";
import partyface from "../../img/party_face.png";

export const Welcome: React.FC = () => {
  return (
    <>
          <div className="studioProducts" role="region" aria-label="StudioProducts">
              <div className="productImage" aria-label="Microsoft Office Applicication">
          <ProductsWheel />
        </div>
        <div className="studioInfo">
          <img src={partyface} alt="Partying face" />
          
          <h1  className="studioInfoTxt">
            Welcome to Microsoft India's User Experience community
          </h1>
          <div className="studioInfoSubTxt">
            We're a diverse group working across devices &amp; platforms,
            product areas and operating systems; thinking about productivity,
            communications, emerging markets, storage, browsers, and more!
          </div>
          <div className="studioInfoSubTxt">
            Our mission is to empower all our users to achieve more. Consumers,
            educators, information workers and frontline workers can do more
            with Microsoft.
          </div>
        </div>
      </div>
    </>
  );
};
