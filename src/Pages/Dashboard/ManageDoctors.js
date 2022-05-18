import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading/Loading";
import DeleteDoctor from "./DeleteDoctor";
import DoctorModal from "./DoctorModal";

const ManageDoctors = () => {
  const [deleteModal, setDeleteModal] = useState(null);
  const [doctorInfo, setDoctorInfo] = useState({});
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery("doctors", () =>
    fetch("http://localhost:5000/doctor", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="mt-3 text-2xl">Manage Doctors: {doctors.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>SL.</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <DeleteDoctor
                doctor={doctor}
                key={doctor._id}
                sl={index + 1}
                setDeleteModal={setDeleteModal}
                setDoctorInfo={setDoctorInfo}
              />
            ))}
          </tbody>
        </table>
      </div>

      {deleteModal && <DoctorModal doctorInfo={doctorInfo} refetch={refetch} />}
    </div>
  );
};

export default ManageDoctors;
