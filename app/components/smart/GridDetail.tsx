import React from "react";
import KPIicon from "../../assets/KPI.png";
import BIicon from "../../assets/BI.png";
import CVicon from "../../assets/CV.png";
interface FileData {
  fileName: string;
  fileType: string;
  createdBy: string;
  sizeMB: number;
  storageUsedMB: number;
  createdAt: string;
  publishedAt: string | null;
  updatedAt: string;
  lastOpenedAt: string;
  fileimage?: string;
}

interface GridDetailProps {
  selectedFile: FileData | null;
  onClose?: () => void;
}

const GridDetail = ({ selectedFile, onClose }: GridDetailProps) => {
  // ฟังก์ชันแปลงวันที่

  const fileTypes = [
    { icon: CVicon, name: "Customize View", type: "customize" },
    { icon: BIicon, name: "BI", type: "bi" },
    { icon: KPIicon, name: "KPI", type: "kpi" },
  ];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ถ้าไม่มีไฟล์ที่เลือก
  if (!selectedFile) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-500">เลือกไฟล์เพื่อดูรายละเอียด</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FC] rounded-lg border border-gray-200 p-6 shadow-sm">
      {/* Header with close button */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-medium text-gray-900">
          {selectedFile.fileName}
        </p>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="bg-white rounded-lg">
        <div className="flex justify-between items-start mb-6 ">
          <h2 className="text-xl font-semibold text-gray-900">
            รายละเอียดไฟล์
          </h2>
        </div>

        {
          selectedFile.fileimage && (
            <div className="flex items-center justify-center mb-6">
              <img
                src={selectedFile.fileimage}
                alt={selectedFile.fileName}
                className="w-[378] h-[250]"
              />
            </div>
          )
        }

        {/* File Info Grid */}
        <div className="">
          
          <div className="space-y-4">
            <div>
              <label className="flex flex-row justify-between text-sm font-medium text-gray-500 mb-1 ">
                <div>
                  ประเภทไฟล์ 
                </div>
                
                <div>
                  {selectedFile.fileType}
                </div>
                
              </label>
            </div>

            <div className="w-auto h-[2px] bg-gray-500"/>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                ขนาดไฟล์ 
                {selectedFile.sizeMB} 
              </label>
            </div>

            <div className="w-auto h-[2px] bg-gray-500"/>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                พื้นที่เก็บข้อมูลที่ใช้ 
                {selectedFile.storageUsedMB} 
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                ผู้สร้าง 
                {selectedFile.createdBy}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                แก้ไขเมื่อ
                {formatDate(selectedFile.updatedAt)}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                เปิดเมื่อ
                {formatDate(selectedFile.lastOpenedAt)}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                เผยแพร่เมื่อ
                {formatDate(selectedFile.publishedAt)}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                สร้างเมื่อ
                {formatDate(selectedFile.createdAt)}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
              คำอธิบาย   
              </label>       

              <textarea name="" id="">
              
              </textarea>
            </div>
            
          </div>

          
        </div>

        
      </div>
    </div>
  );
};

export default GridDetail;
