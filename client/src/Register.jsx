import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "./Context";
import { useNavigate } from "react-router-dom";
import { Text } from "@radix-ui/themes";
import { Root } from "@radix-ui/react-dialog";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [updatePage, setUpdatePage] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  function onSubmit(data) {
    const userExists = userData.find((user) => user.fullName === data.fullName);
    if (userExists) {
      return alert("Username already taken. Please try again");
    }
    const emailExists = userData.find((user) => user.email === data.email);
    if (emailExists) {
      return alert("Email has already been used. Please try again");
    }
    const passwordExists = userData.find(
      (user) => user.password === data.password
    );
    if (passwordExists) {
      return alert("Password has already been used. Please try again");
    }
    if (!emailExists && !userExists) {
    }
    axios
      .post("https://contactapp-hjak.onrender.com/api/contact/createUser", {
        fullName: data.fullName,
        date: data.date,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        setUserData((prev) => [...prev, res.data]);

        console.log(userData);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
    // setUpdatePage(true);
  }

  return (
    <>
      <div className="signUp-container w-screen h-screen flex tablet:w-screen tablet:h-screen    ">
        <div className="signUp-card  w-[60vw] h-[80vh] m-auto bg-killarney-50  rounded-xl  screen:w-5/6 tablet:w-5/6 phone:w-screen phone:h-screen   ">
          <div className="signUp-form w-[60vw] h-[80vh] absolute w-[30vw] h-[37vw] ml-[15vw] flex justify-center tablet:ml-[39vw] tablet:w-[45vw] tablet:h-[90vh] phone:ml-0 phone:w-screen phone:h-screen">
            <header className="  absolute  mt-[10vh] phone:mt-[15vh]  ">
              <h2 className=" text-5xl ">
                <span className="font-bold text-curious-blue-400 ">Nice</span>
                <span className="text-2xl text-curious-blue-300  ">
                  to meet!!
                </span>
              </h2>
            </header>
            <form
              id="register-form"
              className="flex w-[30vw]  absolute  mt-[20vh] flex-col align-center gap-[4vh] flex-warp phone:w-[85vw] phone:gap-[6vh] phone:mt-[26vh]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="login-signUp-button flex gap-[0.7vh] justify-center">
                <button
                  className="flex items-end border-spacing-0 opacity-80  border-b tablet:text-[1rem]"
                  type="submit"
                  // onClick={() => navigate("/")}
                >
                  Login
                </button>
                <button
                  className="text-[1.5rem] font-extrabold text-sky-300   border-b-[2px] tablet:text-[1.3rem]"
                  type="submit"
                >
                  SignUp
                </button>
              </div>
              <div className="inputs flex  flex-col gap-[5vh]">
                <input
                  {...register("fullName", { required: true, minLength: 2 })}
                  className="border-b-[2px] border-blue-300 m-auto  focus:outline-none w-[300px] h-[5vh] bg-killarney-50 tablet:w-[28vw] tablet:h-[4vh] phone:w-[85vw]"
                  type="text"
                  placeholder=" Enter your full name"
                />
                {errors.fullName && (
                  <Root role="alert">
                    <Text className=" fullName-massage absolute z-auto w-[20vw] h-[3vh] mt-[6vh] w-[20vw] text-[0.8rem]  bg-Slate-300 ml-[5vw] rounded-[10px] bg-opacity-40 flex align-center justify-center  tablet:ml-0 tablet:mt-[5vh]   tablet:w-[30vw] phone:w-[50vw] phone:h-[3vh] phone:ml-[2vw]  ">
                      <ExclamationTriangleIcon className="mr-[10px] h-auto" />
                      Full name is required
                    </Text>
                  </Root>
                )}
                <input
                  {...register("date", {
                    required: true,
                    validate: (value) => {
                      const currentDate = new Date();
                      const inputDate = new Date(value);
                      const eightYearsAgo = new Date();
                      eightYearsAgo.setFullYear(currentDate.getFullYear() - 8);
                      return inputDate <= eightYearsAgo;
                    },
                    max: new Date().toLocaleDateString(),
                  })}
                  className="border-b-[2px] border-blue-300 m-auto  focus:outline-none w-[300px] h-[5vh] bg-killarney-50 tablet:w-[28vw] tablet:h-[4vh] phone:w-[85vw]"
                  type="date"
                  placeholder="Enter your date of birth"
                />
                {errors.date && (
                  <Root role="alert">
                    <Text className="date-massage absolute  z-auto w-[20vw] text-[0.8rem] mt-[16vh] h-[3vh]   bg-Slate-300 ml-[5vw] rounded-[10px] bg-opacity-40 flex align-center justify-center tablet:w-[30vw] tablet:mt-[14vh] tablet:m-0 phone:w-[50vw] phone:h-[3vh] phone:ml-[2vw]  ">
                      <ExclamationTriangleIcon className="mr-[10px] h-auto" />
                      Must to by 8 year ago from today
                    </Text>
                  </Root>
                )}

                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  className="border-b-[2px] border-blue-300 m-auto  focus:outline-none w-[300px] h-[5vh] bg-killarney-50 tablet:w-[28vw] tablet:h-[4vh] phone:w-[85vw]"
                  type="text"
                  placeholder="Enter your email"
                />

                {errors.email && (
                  <Root role="alert">
                    <Text className="email-massage absolute  z-auto w-[20vw] h-[3vh] mt-[26vh] w-[20vw] text-[0.8rem] bg-Slate-300 ml-[5vw] rounded-[10px] bg-opacity-40 flex align-center justify-center tablet:w-[30vw] tablet:mt-[23vh] tablet:ml-0 phone:w-[60vw] phone:h-[3vh] phone:ml-[2vw]  ">
                      <ExclamationTriangleIcon className="ml-[1vw] h-auto  w-[25px]" />
                      Enter Valid email address
                    </Text>
                  </Root>
                )}

                <input
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 16,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/,
                  })}
                  className="border-b-[2px] border-blue-300 m-auto focus:outline-none w-[300px] h-[5vh] bg-killarney-50 tablet:w-[28vw] tablet:h-[4vh] phone:w-[85vw]"
                  type="password"
                  placeholder="Enter password"
                />
                {errors.password && (
                  <Root role="alert">
                    <Text className="password-massage absolute z-auto text-[0.8rem]  w-[29vw] ml-[0.5vw] mt-[35vh] h-[6.5vh]  bg-Slate-300  rounded-[10px] bg-opacity-90 flex align-center justify-center tablet:w-[35vw] tablet:mt-[31vh] tablet:ml-[-2vw] phone:w-[75vw] phone:h-[6vh] phone:ml-[2vw]  ">
                      <ExclamationTriangleIcon className="ml-[1vw] h-auto  w-[25px]" />
                      Must be 8-16 characters, one uppercase letter, lowercase
                      letter, and one digit.
                    </Text>
                  </Root>
                )}
              </div>
              <div>
                <button
                  className="submit-button mt-[0.5rem] bg-curious-blue-400 w-[15vw] h-[35px] font-bold text-curious-blue-50 "
                  type="submit"
                >
                  SignUp
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
    </>
  );
}
