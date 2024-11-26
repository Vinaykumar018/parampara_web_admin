import { useLocation } from 'react-router-dom';

const UpdatePoojaList = () => {
  const location = useLocation();
  const { formData } = location.state || {};

  return (
    <div>
      <h1>Pooja Update List</h1>
      <div>
        {/* You can access and display the data here */}
        <p>Pooja Name: {formData?.pooja_name}</p>
        <p>Pooja Category: {formData?.pooja_category}</p>
        <p>Price with Samagri: {formData?.price_withSamagri}</p>
        {/* Render other fields as necessary */}
      </div>
    </div>
  );
};

export default UpdatePoojaList;
