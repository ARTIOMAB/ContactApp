import { Card, Flex, Avatar, Box, Text } from "@radix-ui/themes";
import ContactUpdate from "./ContactUpdate";
function ContactCard({
  firstName,
  surName,
  phone,
  email,
  id,
  setUpdatePage,
  updatePage,
}) {
  return (
    <>
      <Card>
        <ContactUpdate
          firstName={firstName}
          surName={surName}
          phone={phone}
          email={email}
          id={id}
          setUpdatePage={setUpdatePage}
          updatePage={updatePage}
        />
        <Flex className="card-structure flex flex-start justify-center rounded-xl h-[55vh] tablet:[30vh] ">
          <div className="contact-card flex flex-col items-center mb-10 w-4/5 h-4/5 p-6  rounded-lg tablet:h-[50vh] tablet:w-[30vw] tablet:p-3 phone:p-0   ">
            <Avatar
              radius="full"
              className="h-[120px] w-[120px] tablet:h-[100px] tablet:w-[100px] "
              src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-3/3/16-256.png"
            />
            <Box className="absolute mt-[25vh]" id="contact-card-form">
              <Text>
                <h3 className="text-xl font-bold mb-2 ">Name: {firstName}</h3>
              </Text>
              <Text>
                <div className="mb-2 ">Last Name: {surName}</div>
              </Text>
              <Text>
                <div className="mb-2 ">Phone: {phone}</div>
              </Text>
              <Text>
                <div className="mb-2 ">Email: {email}</div>
              </Text>
            </Box>
          </div>
        </Flex>
      </Card>
    </>
  );
}

export default ContactCard;
