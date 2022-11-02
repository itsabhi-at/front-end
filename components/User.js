import { useRouter } from "next/router";
import { FaUserCircle, faUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { useUser } from "@auth0/nextjs-auth0";

function User() {
  const route = useRouter();
  const { user, error, isLoading } = useUser();
  if (!user) {
    return (
      <Profile
        onClick={() => {
          route.push("/api/auth/login");
        }}
      >
        <FaUserCircle />
        <h3>Profile</h3>
      </Profile>
    );
  }
  return (
    <Profile
      onClick={() => {
        route.push("/profile");
      }}
    >
      <img src={user.picture} alt={user.name} />
      <h3>{user.name}</h3>
    </Profile>
  );
}

export default User;

const Profile = styled.div`
  cursor: pointer;
  img {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
  }
`;
