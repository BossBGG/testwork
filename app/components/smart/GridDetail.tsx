import React, { useState } from "react";
import foldericon from "../../assets/folder.png";
import KPIicon from "../../assets/KPI.png";
import BIicon from "../../assets/BI.png";
import CVicon from "../../assets/CV.png";
import folderfieldicon from "../../assets/folder2.png";

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
  const [description, setDescription] = useState("");
  const maxWords = 250;

  // ฟังก์ชันเลือกไอคอนตามประเภทไฟล์
  const getFileIcon = (type: string) => {
    switch (type) {
      case "โฟลเดอร์":
        return folderfieldicon;
      case "KPI":
        return KPIicon;
      case "BI":
        return BIicon;
      case "Customize View":
        return CVicon;
      default:
        return foldericon;
    }
  };

  // ฟังก์ชันนับคำ
  const countWords = (text: string) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของ textarea
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = e.target.value;
    const wordCount = countWords(text);

    if (wordCount <= maxWords) {
      setDescription(text);
    }
  };

  // ฟังก์ชันแปลงวันที่
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
        <p className="text-lg font-medium text-[#2A529C]">
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

      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            รายละเอียดไฟล์
          </h2>
        </div>

        {/* File Image/Icon */}
        <div className="flex items-center justify-center mb-6">
          {selectedFile.fileimage ? (
            <img
              src={selectedFile.fileimage}
              alt={selectedFile.fileName}
              className="w-[378px] h-[250px] object-contain rounded-md "
            />
          ) : (
            <div className="w-[378px] h-[250px] bg-[#F8F9FC] flex items-center justify-center rounded-md ">
              <img
                src={getFileIcon(selectedFile.fileType)}
                alt={selectedFile.fileType}
                className="w-[69px] h-[55px] object-contain"
              />
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">
              ประเภทไฟล์
            </span>

            <div className="flex items-center gap-2 mr-4">
              <img
                src={getFileIcon(selectedFile.fileType)}
                alt={selectedFile.fileType}
                className="w-6 h-6"
              />
              <span className="text-sm text-gray-900 ">
              {selectedFile.fileType}
            </span>
            </div>
            
          </div>

          <div className="w-full h-[2px] bg-gray-300" />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">ขนาดไฟล์</span>
            <span className="text-sm text-gray-900 mr-4">
              {selectedFile.sizeMB} MB
            </span>
          </div>

          <div className="w-full h-[2px] bg-gray-300" />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">
              พื้นที่เก็บข้อมูลที่ใช้
            </span>
            <span className="text-sm text-gray-900 mr-4">
              {selectedFile.storageUsedMB} MB
            </span>
          </div>

          <div className="w-full h-[2px] bg-gray-300" />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">ผู้สร้าง</span>
            <span className="text-sm text-gray-900 mr-4">
              {selectedFile.createdBy}
            </span>
          </div>

          <div className="w-full h-[2px] bg-gray-300" />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">
              แก้ไขเมื่อ
            </span>
            <span className="text-sm text-gray-900 mr-4">
              {formatDate(selectedFile.updatedAt)}
            </span>
          </div>

          <div className="w-full h-[2px] bg-gray-300" />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">เปิดเมื่อ</span>
            <span className="text-sm text-gray-900 mr-4">
              {formatDate(selectedFile.lastOpenedAt)}
            </span>
          </div>

          <div className="w-full h-[2px] bg-gray-300" />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">
              เผยแพร่เมื่อ
            </span>
            <span className="text-sm text-gray-900 mr-4">
              {formatDate(selectedFile.publishedAt)}
            </span>
          </div>

          <div className="w-full h-[2px] bg-gray-300" />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">
              สร้างเมื่อ
            </span>
            <span className="text-sm text-gray-900 mr-4">
              {formatDate(selectedFile.createdAt)}
            </span>
          </div>

          <div className="w-full h-[2px] bg-gray-300" />

          {/* Description Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-500">
              คำอธิบาย
            </label>
            <div className="relative">
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="เพิ่มคำอธิบายไฟล์..."
                className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {countWords(description)}/{maxWords}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridDetail;
