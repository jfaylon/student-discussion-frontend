import { UserProvider } from "@/context/UserContext";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <UserProvider>{children}</UserProvider>;
};

export default DashboardLayout;
