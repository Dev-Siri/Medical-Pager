import Cookies from "universal-cookie";

import HospitalIcon from "../assets/hospital.png";
import LogoutIcon from "../assets/logout.png";

export default function Sidebar() {
  function logout() {
    const cookies = new Cookies();

    cookies.remove("token");
    cookies.remove("username");
    cookies.remove("userId");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    location.reload();
  }

  return (
    <aside className="channel-list__sidebar">
      <section className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <img src={HospitalIcon} alt="Hospital" height={30} width={30} />
        </div>
      </section>
      <section className="channel-list__sidebar__icon2">
        <div className="icon1__inner" onClick={logout}>
          <img src={LogoutIcon} alt="Logout" height={30} width={30} />
        </div>
      </section>
    </aside>
  );
}
