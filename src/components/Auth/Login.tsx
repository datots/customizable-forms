import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        const user = userCredential.user;
        console.log("Current User:", user);

        // Fetch user document to check the role
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        const userRole = userDoc.data()?.role;

        if (userRole === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      } catch (error) {
        console.log(error);
        alert("Login failed: " + error.message);
      }
    },
  });

  const handleReset = () => {
    navigate("/reset");
  };

  return (
    <form onSubmit={formik.handleSubmit} className="">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <div>
        <button type="submit">Login</button>
        <button
          type="button"
          onClick={() => window.open("/registration", "_blank")}
        >
          Registration
        </button>
        <button onClick={handleReset}>Forgot Password?</button>
      </div>
    </form>
  );
};

export default Login;
