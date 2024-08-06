import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordFormData from "../features/authentication/UpdatePasswordForm";
function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm/>
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordFormData/>
      </Row>
    </>
  );
}

export default Account;
