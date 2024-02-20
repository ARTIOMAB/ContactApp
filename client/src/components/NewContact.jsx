import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { LoginContext } from "../Context";
import { useContext } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
export default function NewContact({ onUpdate }) {
  const { register, handleSubmit, reset } = useForm();
  const { loginData } = useContext(LoginContext);

  function onSubmit(data) {
    console.log(loginData);

    axios
      .post("http://localhost:3000/api/Contact/create", {
        firstName: data.firstName,
        surName: data.surName,
        phone: data.phone,
        email: data.email,
        createdBy: localStorage.getItem("loggedUser"),
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error");
      });
    reset();
    onUpdate();
  }
  return (
    <>
      <Dialog.Root onOpenChange={handleSubmit(onSubmit)}>
        <Dialog.Trigger asChild>
          <button className="shadow-blackA4 p-[3px] hover:bg-mauve3 inline-flex h-[5vh] items-center justify-center rounded-[4px] bg-white   leading-none shadow-[0_2px_10px]  focus:outline-none phone:h-[4vh] phone:text-[0.8rem]">
            New Contact
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className=" data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className=" bg-Secondary-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px]  p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none tablet:max-w-none tablet:max-h-none tablet:w-[60vh] tablet:h-[80vh] phone:h-[">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium  ">
              New Contact
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal ">
              Create your new contact and add him to your contact list.
            </Dialog.Description>

            <div className="flex justify-center items-center   ">
              <form
                id="new-contact-form"
                className="h-[63vh] w-[30vw] mt-[8vh]  flex flex-col gap-[5vh]  items-center tablet:mt-0"
                onSubmit={handleSubmit(onSubmit)}
              >
                <fieldset className="flex items-center ">
                  <input
                    {...register("firstName", {
                      required: true,
                      minLength: 2,
                    })}
                    className="focus:outline-none border-b w-[28vw] border-Info-500  phone:w-[285px]"
                    placeholder=" First Name"
                    type="text"
                  />
                </fieldset>
                <fieldset className="flex items-center ">
                  <input
                    {...register("surName", {
                      required: true,
                      minLength: 2,
                    })}
                    className="focus:outline-none border-b w-[28vw] border-Info-500  phone:w-[285px]"
                    placeholder=" SurName"
                    type="text"
                  />
                </fieldset>
                <fieldset className=" flex items-center ">
                  <input
                    {...register("phone", {
                      required: true,
                      minLength: 2,
                    })}
                    className="focus:outline-none border-b border-Info-500 w-[28vw]  phone:w-[285px]"
                    placeholder=" Number"
                    type="text"
                  />
                </fieldset>
                <fieldset className=" flex items-center ">
                  <input
                    {...register("email", {
                      required: true,
                      minLength: 2,
                    })}
                    className=" focus:outline-none border-b border-Info-500 w-[28vw] phone:w-[285px] "
                    placeholder=" email"
                    type="text"
                  />
                </fieldset>
                <div className="mt-[7vh] flex justify-end">
                  <Dialog.Close asChild>
                    <button
                      type="submit"
                      className="border-solid border-2  text-Info-500 hover:bg-Info-100 focus:shadow-bg-Info-500 inline-flex h-[7vh] items-center justify-center Slate rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                    >
                      Save changes
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                  <button
                    className="hover:bg-Info-100  absolute top-[10px] right-[10px] inline-flex h-[3vh] w-[3vh] appearance-none items-center justify-center rounded-full  focus:outline-none"
                    aria-label="Close"
                    type="submit"
                  >
                    <Cross2Icon />
                  </button>
                </Dialog.Close>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
