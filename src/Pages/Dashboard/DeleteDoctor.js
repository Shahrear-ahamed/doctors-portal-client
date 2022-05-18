import React from "react";

const DeleteDoctor = ({ doctor, sl, setDeleteModal, setDoctorInfo }) => {
  const { specialty, name, image } = doctor;
  const deleteDoctorModal = () => {
    setDoctorInfo(doctor);
    setDeleteModal(true);
  };
  return (
    <>
      <tr>
        <th>{sl}</th>
        <td className="avatar">
          <div className="w-16 rounded">
            <img src={image} alt={name} />
          </div>
        </td>
        <td>{name}</td>
        <td>{specialty}</td>
        <td>
          <label
            onClick={() => deleteDoctorModal()}
            htmlFor="deleteDoctor"
            className="btn btn-xs btn-error text-white"
          >
            Remove
          </label>
        </td>
      </tr>
    </>
  );
};

export default DeleteDoctor;
