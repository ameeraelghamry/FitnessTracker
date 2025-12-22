import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import PageContainer from "../components/common/PageContainer";

const AdminLayout = () => {
  return (
    <PageContainer sidebar={<Sidebar />}>
      <Outlet />
    </PageContainer>
  );
};

export default AdminLayout;

