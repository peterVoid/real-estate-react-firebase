import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "./../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredentials.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Sign up was successfully");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTBwYzI5cDl3MnE4MmF2eTAxMTdxc2hqdzludGo2bHg5aWI5djJ1eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rfA99cuGLvYAw/giphy.webp"
            alt=""
            className="w-full h-full rounded-xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.id]: e.target.value })
              }
              placeholder="Full name"
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
            />
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.id]: e.target.value })
              }
              placeholder="Email address"
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
            />
            <div className="relative">
              <input
                type={!showPassword ? "password" : "text"}
                id="password"
                value={password}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.id]: e.target.value })
                }
                placeholder="Password"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-x cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-x cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                have an account?{" "}
                <Link
                  to="/sign-in"
                  className="text-cyan-600 hover:text-cyan-700 transition duration-200 ease-in-out ml-1"
                >
                  Login
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition ease-in-out duration-150 hover:shadow-lg active:bg-blue-800"
            >
              Sign up
            </button>
            <div className="my-4 before:border-t flex before:flex-1 items-center after:border-t after:flex-1">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
