import { useState } from "react";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { FcHome } from "react-icons/fc";

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const [toggleUpdateUsername, setToggleUpdateUsername] = useState(false);
  const handleSignOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
        toast.success("Profile details updated");
      }
    } catch (error) {
      toast.error("could not update the profile details");
    }
  };

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              disabled={!toggleUpdateUsername}
              onChange={onChange}
              className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                toggleUpdateUsername && "bg-red-200 focus:bg-red-200"
              }`}
            />

            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full my-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="flex items-center mb-6">
                do you want to change your name?
                <span
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                  onClick={() => {
                    toggleUpdateUsername && onSubmit();
                    setToggleUpdateUsername((prev) => !prev);
                  }}
                >
                  {toggleUpdateUsername ? "Apply change" : "edit"}
                </span>
              </p>
              <p
                className="text-blue-600 hover:text-blue-700 cursor-pointer transition ease-in-out duration-200"
                onClick={handleSignOut}
              >
                Sign out
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition ease-in-out duration-150 hover:shadow-lg active:bg-blue-800"
          >
            <Link
              to="/create-list"
              className="flex items-center justify-center"
            >
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}

export default Profile;
