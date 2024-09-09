import { useEffect, useState } from "react";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

const BACKEND = import.meta.env.VITE_BACKEND;

type Profile = {
  first_name: string;
  last_name: string;
  email: string;
  avatarUrl: string;
  password: string;
  id: number;
};

function App() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const token = params.get("accessToken");
  console.log(BACKEND);

  const [userProfile, setUserProfile] = useState<Profile>({} as Profile);

  useEffect(() => {
    if (token) {
      fetch(`${BACKEND}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUserProfile(() => data));
    }
  }, []);

  return (
    <main>
      <div className="bg-gray-600 p-10 drop-shadow-md flex gap-3 items-center justify-around">
        <h1 className=" text-white text-2xl ">Nest JS Social Login</h1>
        <div className="flex gap-2">
          <a
            href={`${BACKEND}/auth/google/login`}
            className="flex items-center gap-2 bg-blue-400 p-2 rounded"
          >
            <FaGoogle />
            <span>Login with Google</span>
          </a>
          <a
            href={`${BACKEND}/auth/github/login`}
            className="flex items-center gap-2 bg-blue-400 p-2 rounded"
          >
            <FaGithub />
            <span>Login with Github</span>
          </a>
          <a
            href={`${BACKEND}/auth/facebook/login`}
            className="flex items-center gap-2 bg-blue-400 p-2 rounded"
          >
            <FaFacebook />
            <span>Login with Facebook</span>
          </a>
        </div>
      </div>
      {Object.keys(userProfile).length > 0 ? (
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4 mx-4">
          <img
            className="w-full h-56 object-cover object-center"
            src={userProfile.avatarUrl}
            alt="avatar"
          />

          <div className="py-4 px-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              {`${userProfile.first_name} ${userProfile.last_name}`}
            </h1>

            <div className="flex items-center mt-4 text-gray-700">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
              </svg>
              <h1 className="px-2 text-sm">{`${userProfile.email}`}</h1>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-xl p-5">Login to view user profile</h1>
        </div>
      )}
    </main>
  );
}

export default App;
