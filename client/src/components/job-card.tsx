import { useState } from "react";
import { ApplicationForm } from "./application-form";
import { SuccessModal } from "./success-modal";
import { Job } from "@shared/schema";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleFormSubmitSuccess = () => {
    setIsFormVisible(false);
    setIsSuccessModalVisible(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalVisible(false);
  };

  return (
    <>
      <div className="job-card bg-whatsapp-lightBg rounded-lg overflow-hidden shadow-md" data-job-id={job.id}>
        <div className="bg-whatsapp-green text-white p-4">
          <h3 className="text-xl font-bold">{job.title}</h3>
          <div className="flex items-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{job.location}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Mô tả công việc:</h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {job.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Yêu cầu:</h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {job.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Quyền lợi:</h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {job.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <button 
            onClick={toggleForm}
            className="w-full bg-whatsapp-green text-white py-2 rounded-lg hover:bg-whatsapp-light transition"
          >
            {isFormVisible ? "Đóng form" : "Ứng tuyển ngay"}
          </button>
          
          {isFormVisible && (
            <div className="application-form mt-4 p-4 border border-gray-200 rounded-lg form-appear">
              <ApplicationForm 
                jobId={job.id}
                job={job}
                onSubmitSuccess={handleFormSubmitSuccess}
              />
            </div>
          )}
        </div>
      </div>

      {isSuccessModalVisible && (
        <SuccessModal onClose={closeSuccessModal} />
      )}
    </>
  );
}
