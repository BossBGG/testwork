import React, { useState, useRef, useEffect } from "react";
import mockFiles from "../../mockData/mockFiles.json";
import FolderCard from "./Card/FolderCard";
import FileCard from "./Card/FileCard";
import GridDetail from "./gridDetail";


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
}

const GridLayout = ({
  searchTerm = "",
  filterType = "",
  filterUser = "",
  filterUpdate = "",
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

  const getFilteredFiles = () => {
    let filteredFiles = mockFiles.filter((file) => {
      const matchesSearch = file.fileName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesType = filterType === "" || file.fileType === filterType;

      const matchesUser = filterUser === "" || file.createdBy === filterUser;

      const matchesUpdate = true;

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
  const files = filteredFiles.filter((file) => file.fileType !== "โฟลเดอร์");

  return (
    <div className="flex gap-4">
      {/* Grid Section */}
      <div className={`transition-all duration-300 ${showDetail ? 'w-2/3' : 'w-full'}`}>
        {filteredFiles.length > 0 ? (
          <div className="flex flex-col gap-4 p-4">
            {/* Folders Section */}
            <div className="">
              <div className="text-[14px] text-[#2A529C]">โฟลเดอร์</div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
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
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                {files.map((file: FileData) => (
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