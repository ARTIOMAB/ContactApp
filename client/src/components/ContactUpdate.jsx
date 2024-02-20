import React from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Cross2Icon } from "@radix-ui/react-icons";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

function ContactUpdate({ id, setUpdatePage, updatePage }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:3000/api/Contact/updateContactById/${id}`, {
        firstName: data.firstName,
        surName: data.surName,
        phone: data.phone,
        email: data.email,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error");
      });

    reset();
    setUpdatePage(!updatePage);
  };
  const deleteContact = (data) => {
    axios
      .delete(`http://localhost:3000/api/Contact/deleteContactById/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error");
      });
    reset();
    setUpdatePage(!updatePage);
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEditClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className=" rounded-full  h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
          <DotsVerticalIcon className="w-[20px] h-[20px]" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          aria-label="Customize options"
          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        >
          <DropdownMenu.Item
            className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
            onClick={handleEditClick}
          >
            Edit
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-red-600 data-[highlighted]:text-violet1"
            onClick={deleteContact}
            color="red"
          >
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Dialog.Root open={dialogOpen} onClick={handleCloseDialog}>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 " />
        <Dialog.Content className=" z-[1000] bg-killarney-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none  tablet:max-w-none max-h-none tablet:w-[60vh] tablet:h-[80vh]">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium ">
            Update Contact
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal ">
            Update your contact details.
          </Dialog.Description>
          <div className="flex justify-center items-center  W-screen  ">
            <form
              id="update-form"
              className="h-[63vh] w-[30vw] mt-[8vh]  flex flex-col gap-[5vh]  items-center"
            >
              <fieldset className=" flex items-center ">
                <input
                  {...register("firstName", {
                    minLength: 2,
                    required: true,
                  })}
                  className="focus:outline-none border-b w-[28vw] border-Info-500  phone:w-[285px]"
                  placeholder=" First Name"
                  type="text"
                />
              </fieldset>
              <fieldset className=" flex items-center ">
                <input
                  {...register("surName", {
                    minLength: 2,
                    required: true,
                  })}
                  className="focus:outline-none border-b w-[28vw] border-Info-500  phone:w-[285px] "
                  placeholder=" SurName"
                  type="text"
                />
              </fieldset>
              <fieldset className=" flex items-center ">
                <input
                  {...register("phone", {
                    minLength: 2,
                    required: true,
                  })}
                  className="focus:outline-none border-b w-[28vw] border-Info-500  phone:w-[285px] "
                  placeholder=" Number"
                  type="text"
                />
              </fieldset>
              <fieldset className=" flex items-center ">
                <input
                  {...register("email", {
                    minLength: 2,
                    required: true,
                  })}
                  className="focus:outline-none border-b w-[28vw] border-Info-500  phone:w-[285px] "
                  placeholder=" email"
                  type="text"
                />
              </fieldset>
              <div className="mt-[7vh] flex justify-end">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleCloseDialog();
                    handleSubmit(onSubmit)();
                  }}
                  className="border-solid border-2  text-Info-500 hover:bg-Info-100 focus:shadow-bg-Info-500 inline-flex h-[7vh] items-center justify-center Slate rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                >
                  Save changes
                </button>
              </div>

              <button
                onClick={handleCloseDialog}
                className="hover:bg-Info-100  absolute top-[10px] right-[10px] inline-flex h-[3vh] w-[3vh] appearance-none items-center justify-center rounded-full  focus:outline-none"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}

export default ContactUpdate;
