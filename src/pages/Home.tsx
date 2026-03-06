import MemorialForm from "../components/MemorialForm";

import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5 ">

      <div className="w-100">
        {/* <h1 className="text-center mb-4">Memorial Tribute</h1> */}

        {/* Card wrapper for Memorial Form */}

        <MemorialForm />
      </div>
    </div>
  );
};

export default Home;