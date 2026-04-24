import axios from "axios";
// import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  // const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  axiosSecure.interceptors.response.use(
    function (res) {
      return res;
    },
    async function (error) {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        console.log("Interceptors Detect", error);
        // await logout();
        // navigate("/login");
      }

      return Promise.reject(error);
    },
  );

  return axiosSecure;
};

export default useAxiosSecure;
