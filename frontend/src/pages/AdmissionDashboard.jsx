import { CollectionsBookmark, Description, EditNote } from "@mui/icons-material";
import React from "react";
import { Link } from 'react-router-dom';

const AdmissionDashboardPanel = () => {
    return (

        <div className="max-h-[1200px] overflow-y-scroll">
            <div className="p-2 px-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">


                <div className="relative">
                    <Link to={'/applicant_list'}>
                        <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-8 w-enough">
                            <CollectionsBookmark className="text-maroon-500 text-2xl" />
                        </div>
                        <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 rounded-md h-32 font-medium mr-4 mt-16 ml-8 flex items-end justify-center">ADMISSION PROCESS FOR REGISTRAR</button>
                    </Link>
                </div>

                <div className="relative">
                    <Link to={'/super_admin_dashboard1'}>
                        <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-8 w-enough">
                            <CollectionsBookmark className="text-maroon-500 text-2xl" />
                        </div>
                        <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 rounded-md h-32 font-medium mr-4 mt-16 ml-8 flex items-end justify-center">APPLICANT FORM</button>
                    </Link>
                </div>


                <div className="relative">
                    <Link to={'/readmission'}>
                        <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-8 w-enough">
                            <CollectionsBookmark className="text-maroon-500 text-2xl" />
                        </div>
                        <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 rounded-md h-32 font-medium mr-4 mt-16 ml-8 flex items-end justify-center">READMISSION</button>
                    </Link>
                </div>

                <div className="relative mb-10">
                    <Link to={'/student_requirements'}>
                        <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-8 w-enough">
                            <CollectionsBookmark className="text-maroon-500 text-2xl" />
                        </div>
                        <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 rounded-md h-32 font-medium mr-4 mt-16 ml-8 flex items-end justify-center">DOCUMENTS SUBMITTED</button>
                    </Link>
                </div>

                <div className="relative mb-10">
                    <Link to={'/examination_profile'}>
                        <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-8 w-enough">
                            <CollectionsBookmark className="text-maroon-500 text-2xl" />
                        </div>
                        <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 rounded-md h-32 font-medium mr-4 mt-16 ml-8 flex items-end justify-center">ADMISSION EXAM</button>
                    </Link>
                </div>

                <div className="relative">
                    <Link to={'/class_roster'}>
                        <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-8 w-enough">
                            <CollectionsBookmark className="text-maroon-500 text-2xl" />
                        </div>
                        <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 rounded-md h-32 font-medium mr-4 mt-16 ml-8 flex items-end justify-center">CLASS ROSTER</button>
                    </Link>
                </div>

                <div className="relative">
                    <Link to={'/admin_dashboard1'}>
                        <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-8 w-enough">
                            <CollectionsBookmark className="text-maroon-500 text-2xl" />
                        </div>
                        <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 rounded-md h-32 font-medium mr-4 mt-16 ml-8 flex items-end justify-center">SHIFTING FORM</button>
                    </Link>
                </div>

                <div className="relative">
                    <Link to={'/student_numbering'}>
                        <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-8 w-enough">
                            <CollectionsBookmark className="text-maroon-500 text-2xl" />
                        </div>
                        <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 rounded-md h-32 font-medium mr-4 mt-16 ml-8 flex items-end justify-center">STUDENT NUMBERING PANEL</button>
                    </Link>
                </div>

                <div className="relative">
                    <Link to={'/course_tagging'}>
                        <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-8 w-enough">
                            <CollectionsBookmark className="text-maroon-500 text-2xl" />
                        </div>
                        <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 rounded-md h-32 font-medium mr-4 mt-16 ml-8 flex items-end justify-center">COURSE TAGGING FORM</button>
                    </Link>
                </div>

                <div className="relative">
                    <Link to={'/search_cor'}>
                        <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-8 w-enough">
                            <CollectionsBookmark className="text-maroon-500 text-2xl" />
                        </div>
                        <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 rounded-md h-32 font-medium mr-4 mt-16 ml-8 flex items-end justify-center">SEARCH STUDENT COR</button>
                    </Link>
                </div>

                <div className="relative">
                    <Link to={'/draft_load_form'}>
                        <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-8 w-enough">
                            <CollectionsBookmark className="text-maroon-500 text-2xl" />
                        </div>
                        <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 rounded-md h-32 font-medium mr-4 mt-16 ml-8 flex items-end justify-center">DRAFT LOAD FORM</button>
                    </Link>
                </div>



                <div className="relative mb-10">
                    <Link to={'/official_load_form'}>
                        <div className="bg-white p-4 border-4 rounded-lg border-solid border-maroon-500 absolute left-16 top-8 w-enough">
                            <CollectionsBookmark className="text-maroon-500 text-2xl" />
                        </div>
                        <button className="bg-white text-maroon-500 border-4 rounded-lg border-solid border-maroon-500 p-4 w-80 rounded-md h-32 font-medium mr-4 mt-16 ml-8 flex items-end justify-center">OFFICIAL LOAD FORM</button>
                    </Link>
                </div>


            </div>
        </div>
    )
}

export default AdmissionDashboardPanel