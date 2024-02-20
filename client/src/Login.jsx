import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext, LoginContext } from "./Context";
import { Text } from "@radix-ui/themes";
import { Root } from "@radix-ui/react-dialog";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { userData } = useContext(UserContext);
  const { loginData, setLoginData } = useContext(LoginContext);

  console.log(userData);

  const onSubmit = ({ email, password }) => {
    console.log(userData.find((user) => user.email === email));
    const userExists = userData.find((user) => user.email === email);
    if (!userExists) {
      return alert("Wrong credentials!");
    }
    const passwordMatch = userExists.password === password;
    if (!passwordMatch) {
      return alert("Wrong credentials!");
    }
    if (passwordMatch && userExists) {
      localStorage.setItem("loggedUser", userExists._id);
      setLoginData(userExists);
      console.log(userExists);

      navigate("/mainPage");
      return alert("Logged in!");
    }
  };

  return (
    <div className="login-container w-screen h-screen flex">
      <div className="login-card w-[60vw] h-[80vh] m-auto bg-killarney-50 rounded-xl tablet:w-[90vw] tablet:h-[90vh] phone:w-[100vw] phone:h-[100vh]       ">
        <div className="login-content flex absolute w-[30vw] h-[37vw] ml-[30vw] justify-center tablet:ml-[42vw] tablet:w-[50vw] tablet:h-[90vh] phone:ml-0 phone:h-[100vh] phone:w-[100vw]  ">
          <header className="absolute  mt-[10vh]">
            <h2 className="text-5xl">
              <span className="font-bold text-curious-blue-400">Hello,</span>
              <span className="text-2xl text-curious-blue-300 tablet:text-3xl ">
                friend!
              </span>
            </h2>
          </header>
          <form
            id="login-form"
            className="flex w-[30vw]  absolute  mt-[20vh] flex-col align-center gap-[5vh] flex-warp phone:w-[60vw]  "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="login-register-button  flex gap-[0.7vh] justify-center">
              <button
                type="button"
                className={
                  "text-[1.5rem] font-extrabold text-sky-300   border-b-[2px] tablet:text-[1.3rem]"
                }
              >
                Login
              </button>
              <button
                type="button"
                className={
                  "flex items-end border-spacing-0 opacity-80  border-b tablet:text-[1rem]"
                }
                onClick={() => navigate("/signUp")}
              >
                SignUp
              </button>
            </div>
            <div className="inputs flex mt-[5vh] flex-col gap-[40px]">
              <input
                {...register("email", { required: true, minLength: 2 })}
                className="border-b-[2px] border-blue-300 m-auto  focus:outline-none w-[300px] h-[40px] bg-killarney-50 tablet:w-[28vw] tablet:h-[4vh] phone:w-[50vw]  "
                type="text"
                placeholder="Enter your email"
              />

              {errors.email && (
                <Root role="alert">
                  <Text className="w-[200px] h-[25px] absolute mt-[50px] bg-Slate-300 ml-[4vw] rounded-[10px] bg-opacity-40 flex align-center justify-center tablet:mt-[5vh] tablet:ml-[2vh] phone:w-[50vw] phone:h-[4vh] phone:ml-[2vw]  ">
                    <ExclamationTriangleIcon className="mr-[10px] h-auto" />
                    Email required
                  </Text>
                </Root>
              )}
              <input
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 16,
                })}
                className=" border-b-[2px] border-blue-300 m-auto  focus:outline-none w-[300px] h-[40px] bg-killarney-50 tablet:w-[28vw] tablet:h-[4vh] phone:w-[50vw]  "
                type="password"
                placeholder="Enter password"
              />

              {errors.password && (
                <Root role="alert">
                  <Text className="w-[230px] h-[25px] absolute mt-[130px] bg-Slate-300  ml-[4vw] rounded-[10px]  bg-opacity-40 flex align-center justify-center tablet:mt-[16vh] tablet:ml-[2vh] phone:w-[50vw] phone:h-[4vh] phone:ml-[2vw] ">
                    <ExclamationTriangleIcon className="mr-[10px] h-auto" />
                    Password is required
                  </Text>
                </Root>
              )}
            </div>
            <div>
              <button className="submit-button  bg-curious-blue-400 w-[15vw] h-[35px] font-bold text-curious-blue-50 ">
                Login
              </button>
            </div>
          </form>
        </div>
        <img
          className="h-full w-1/2  rounded-xl  tablet:w-[47%] phone:hidden"
          src="https://st3.depositphotos.com/10647962/18106/v/450/depositphotos_181069020-stock-illustration-hand-holding-a-mobile-phone.jpg"
          alt="Image not found"
        />
      </div>
    </div>
  );
}

export default Login;
