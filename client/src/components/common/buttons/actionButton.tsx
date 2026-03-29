import React from "react";
import { CiEdit } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";


interface IProps {
    onDelete: () => void
    onEdit: () => void
}
const ActionButtons: React.FC<IProps> = ({ onDelete, onEdit }) => {
    return (
        <div className="flex w-full h-full justify-center gap-3">
            <CiEdit size={29} className='text-blue-500 cursor-pointer' onClick={onEdit} />
            <HiOutlineTrash size={24} className='text-red-500 cursor-pointer' onClick={onDelete} />
        </div>
    )
}

export default React.memo(ActionButtons)