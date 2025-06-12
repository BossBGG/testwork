import React, { useState, useRef, useEffect } from "react";
import FolderCard from "./Card/FolderCard";
import FileCard from "./Card/FileCard";
import GridDetail from "./GridDetail";

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

interface GridLayoutProps {
  searchTerm?: string;
  filterType?: string;
  filterUser?: string;
  filterUpdate?: string;
  files?: FileData[];
}

const GridLayout = ({
  searchTerm = "",
  filterType = "",
  filterUser = "",
  filterUpdate = "",
  files: filesList = []
}: GridLayoutProps) => {
  // State Management สำหรับ GridDetail
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // ฟังก์ชันตรวจสอบวันที่ตาม filter
  const isDateInRange = (dateString: string | null, filterUpdate: string) => {
    if (!filterUpdate || !dateString) return true;
    
    const fileDate = new Date(dateString);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // สิ้นสุดวัน
    
    switch (filterUpdate) {
      case 'today':
        const startOfToday = new Date(today);
        startOfToday.setHours(0, 0, 0, 0);
        return fileDate >= startOfToday && fileDate <= today;
        
      case '7days':
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        return fileDate >= sevenDaysAgo && fileDate <= today;
        
      case '30days':
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        return fileDate >= thirtyDaysAgo && fileDate <= today;
        
      case 'thisYear':
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
        return fileDate >= startOfYear && fileDate <= endOfYear;
        
      case 'lastYear':
        const lastYear = today.getFullYear() - 1;
        const startOfLastYear = new Date(lastYear, 0, 1);
        const endOfLastYear = new Date(lastYear, 11, 31, 23, 59, 59, 999);
        return fileDate >= startOfLastYear && fileDate <= endOfLastYear;
        
      default:
        // Handle custom date range (format: "YYYY-MM-DD_YYYY-MM-DD")
        if (filterUpdate.includes('_')) {
          const [startDate, endDate] = filterUpdate.split('_');
          const start = new Date(startDate + 'T00:00:00');
          const end = new Date(endDate + 'T23:59:59');
          return fileDate >= start && fileDate <= end;
        }
        return true;
    }
  };

  const getFilteredFiles = () => {
    let filteredFiles = filesList.filter((file) => {
      // กรองตามชื่อไฟล์ (ค้นหาแบบ case-insensitive)
      const matchesSearch = file.fileName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // กรองตามประเภท
      const matchesType = filterType === "" || file.fileType === filterType;

      // กรองตามผู้สร้าง
      const matchesUser = filterUser === "" || file.createdBy === filterUser;

      // กรองตามวันที่อัปเดต
      const matchesUpdate = isDateInRange(file.updatedAt, filterUpdate);

      return matchesSearch && matchesType && matchesUser && matchesUpdate;
    });

    return filteredFiles;
  };

  // Handler สำหรับเมื่อคลิกที่ FileCard
  const handleFileCardClick = (file: FileData) => {
    setSelectedFile(file);
    setShowDetail(true);
  };

  // Handler สำหรับปิด GridDetail
  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedFile(null);
  };

  const handleMenuAction = (action: string, fileName: string) => {
    console.log(`${action} file: ${fileName}`);
  };

  const handleFolderClick = (folderName: string) => {
    console.log(`Open folder: ${folderName}`);
  };

  const filteredFiles = getFilteredFiles();

  const folders = filteredFiles.filter((file) => file.fileType === "โฟลเดอร์");
  const fileItems = filteredFiles.filter((file) => file.fileType !== "โฟลเดอร์");

  return (
    <div className="flex gap-4">
      {/* Grid Section */}
      <div className={`transition-all duration-300 ${showDetail ? 'w-2/3' : 'w-full'}`}>
        {filteredFiles.length > 0 ? (
          <div className="flex flex-col gap-4 p-4">
            {/* Folders Section */}
            <div className="">
              <div className="text-[14px] text-[#2A529C]">โฟลเดอร์</div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {folders.map((folder: FileData) => (
                  <FolderCard
                    key={folder.fileName}
                    folderName={folder.fileName}
                    updatedAt={formatDate(folder.updatedAt)}
                    onMenuAction={handleMenuAction}
                    onClick={() => handleFolderClick(folder.fileName)}
                  />
                ))}
              </div>
            </div>

            {/* Files Section */}
            <div>
              <div>
                <div className="text-[14px] text-[#2A529C]">ไฟล์</div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {fileItems.map((file: FileData) => (
                  <div
                    key={file.fileName}
                    onClick={() => handleFileCardClick(file)}
                    className="cursor-pointer"
                  >
                    <FileCard
                      fileName={file.fileName}
                      fileType={file.fileType}
                      fileImage={file.fileimage}
                      updatedAt={formatDate(file.updatedAt)}
                      onMenuAction={handleMenuAction}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="text-center text-gray-500">ไม่พบไฟล์</div>
          </div>
        )}
      </div>

      {/* Detail Section */}
      {showDetail && (
        <div className="w-1/3 transition-all duration-300">
          <div className="sticky top-4">
            <GridDetail
              selectedFile={selectedFile}
              onClose={handleCloseDetail}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GridLayout;