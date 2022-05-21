import React from "react";
import { toast } from "react-toastify";

const DoctorModal = ({ doctorInfo, refetch }) => {
  // delete doctor by email
  const { email, name } = doctorInfo;
  const deleteDoctor = (email) => {
    fetch(`https://doctors-portal-shahrear.herokuapp.com/doctor/${email}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledgement) {
          toast.success(`Doctor ${name} is deleted`);
          refetch();
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="deleteDoctor" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Do you want to remove doctor :- {name}
          </h3>
          <p>In future you can not recover </p>
          <div className="modal-action">
            <label htmlFor="deleteDoctor" className="btn">
              No
            </label>
            <label
              htmlFor="deleteDoctor"
              onClick={() => deleteDoctor(email)}
              className="btn bg-red-500 text-white border-0"
            >
              Yes
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorModal;
