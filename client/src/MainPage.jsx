import { useState, useEffect } from "react";
import axios from "axios";
import ContactCard from "./components/ContactCard";
import NewContact from "./components/NewContact";
import { CardStackPlusIcon, ZoomInIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";

function MainPage() {
  const loginId = localStorage.getItem("loggedUser");
  const [updatePage, setUpdatePage] = useState(false);
  const [userContacts, setUserContacts] = useState([]);
  const [submitButton, setSubmitButton] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ inputSearch }) => {
    axios
      .get(`http://localhost:3000/api/contact/findContact/${inputSearch}`)

      .then((response) => {
        setUserContacts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.massage);
      });

    console.log(userContacts);
    reset();
    setSubmitButton(true);
  };
  const handelButtonSubmit = () => {
    setUpdatePage(!updatePage);
    setSubmitButton(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/contact/findAllContact/${loginId}`)
      .then((response) => {
        setUserContacts(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [loginId, updatePage]);

  return (
    <>
      <div className="main-container w-screen h-screen flex ">
        <div className="main-card w-[60vw] h-[80vh] m-auto bg-killarney-50 rounded-xl tablet:h-[90vh] tablet:w-[90vw] phone:w-screen phone:h-screen  ">
          <header className="main header flex flex-row h-[10vh] w-[60vw] rounded-tl-xl rounded-tr-xl items-center justify-around bg-Info-500 tablet:w-[90vw] tablet:h-[10vh] phone:w-screen phone:rounded-none phone:h-[8vh] ">
            <h1 className="font-bold text-4xl tablet:w-[25vw] phone:text-2xl ">
              Contacts
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="search-input w-[25vw] h-[5vh] rounded-2xl focus:outline-none tablet:w-[40vw] phone:w-[40vw] phone:h-[4vh] "
                placeholder="  Search"
                type="text"
                {...register("inputSearch", {
                  minLength: 2,
                })}
              />
            </form>
            {submitButton && (
              <button
                className=" shadow-blackA4 p-[3px] hover:bg-mauve3 inline-flex h-[5vh] items-center justify-center rounded-[4px] bg-white   leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none   "
                onClick={handelButtonSubmit}
              >
                Back
              </button>
            )}
            <nav className="nav-bar ml-[2vw] phone:ml-0 ">
              <NewContact onUpdate={() => setUpdatePage(!updatePage)} />
            </nav>
          </header>
          <main className="main-section h-[70vh] grid grid-cols-3 gap-4 bg-Secondary-100 overflow-y-scroll p-[5px] tablet:h-[80vh] phone:grid-cols-1  phone:h-[88vh]">
            {userContacts.length > 0 ? (
              userContacts.map((contact, index) => (
                <ContactCard
                  setUpdatePage={setUpdatePage}
                  updatePage={updatePage}
                  key={index}
                  firstName={contact.firstName}
                  surName={contact.surName}
                  phone={contact.phone}
                  email={contact.email}
                  id={contact._id}
                />
              ))
            ) : (
              <div className="contactsPlaceHolder absolute ml-[25vw] mt-[20vh] tablet:ml-[37vw] tablet:mt-[25vh] phone:ml-[30vw] phone:mt-[25vh] ">
                <CardStackPlusIcon className="w-[150px] h-[150px] " />

                <p>contact</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default MainPage;
