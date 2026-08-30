import React, { useState } from "react";
import AnimatedVanta from "../components/backgrounds/AnimatedVanta";
import { Link } from "react-router-dom";
import ModalImage from "react-modal-image";
import Title from "../components/shared/Title";
import toast from "react-hot-toast";
import axios from "axios";
import { config, server } from "../constants/config";
import { useDispatch } from "react-redux";
import { login } from "../redux/slicer/auth";
import { BeatLoader } from "react-spinners";

function Register() {
  const [photo, setPhoto] = useState(
    "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
  );
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    username: "",
    password: "",
  });
  const [testPhoto, setTestPhoto] = useState(null)

  const dispatch = useDispatch();

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setTestPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true)
    if (
      !formData.name ||
      !formData.username ||
      !formData.password
    ) {
      toast.error("All fields are required!");
      return;
    }
    
    const formagic = new FormData();
    formagic.append('file',testPhoto);
    formagic.append('username', formData.username);
    formagic.append('name', formData.name);
    formagic.append('password', formData.password);

try {
  const {data} = await axios.post(`${server}/user/register`,formagic,config);
  dispatch(login(data.user));
  toast.success(data.message);
} catch (error) {
  toast.error(error?.response?.data?.message);
}    

  };



  return (
    <>
    <Title title="Register" description="Chat app Register" />
      <AnimatedVanta />
      <div className="flex items-center justify-center h-[calc(100dvh)] text-white relative">
        <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg w-96 z-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <div className="flex justify-center mb-4 relative w-24 m-auto ">
            {/* <img
              id="profile-pic"
              className="w-24 h-24 rounded-full object-cover"
              src={photo}
              alt="Profile"
            /> */}
            <ModalImage
        small={photo}
        large={photo} // Replace with your actual image URL
        alt="Preview Image"
        className="w-24 h-24 rounded-full object-cover"
      />
            <input
              type="file"
              id="photo-upload"
              className="hidden"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 cursor-pointer bg-gray-700 bg-opacity-80 p-1 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                <path
                  fillRule="evenodd"
                  d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          <form id="signup-form" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="name"
                placeholder="Name *"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 hidden">
              <input
                type="text"
                id="bio"
                placeholder="Bio *"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="username"
                placeholder="Username *"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                placeholder="Password *"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              id="signup-button"
              disabled={loading || !formData.username || !formData.password || !formData.name}
              className="w-full p-2 rounded bg-purple-600 disabled:bg-purple-900 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            >
              {loading ? <BeatLoader /> : "SIGN UP"}
            </button>
          </form>
          <div className="text-center mt-4">
            <p>OR</p>
          </div>
          <div className="text-center mt-4">
            <Link to="/login" className="text-purple-600">
              LOGIN INSTEAD
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
