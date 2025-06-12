import React, { useState, useRef, useEffect }  from "react";
import foldericon from "../../assets/folder.png";
import KPIicon from "../../assets/KPI.png";
import BIicon from "../../assets/BI.png";
import CVicon from "../../assets/CV.png";
import sortIcon from "../../assets/sort.png";
import avatar from "../../assets/Avatar.png";
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
}

interface ImoDesignerDetailProps {
  searchTerm?: string;
  filterType?: string;
  filterUser?: string;
  filterUpdate?: string;
  files?: FileData[];
}

type SortField = 'createdAt' | 'updatedAt' | 'publishedAt';
type SortOrder = 'asc' | 'desc';

const ImoDesignerDetail = ({ 
  searchTerm = "", 
  filterType = "", 
  filterUser = "", 
  filterUpdate = "",
  files = []
}: ImoDesignerDetailProps) => {
  const [sortField, setSortField] = useState<SortField>('updatedAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // ฟังก์ชันแปลงวันที่
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
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

  // ฟังก์ชันเรียงข้อมูล
  const sortFiles = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc'); // เริ่มต้นด้วยใหม่สุด
    }
  };

  // ฟังก์ชันกรองข้อมูล
  const getFilteredAndSortedFiles = () => {
    let filteredFiles = files.filter(file => {
      // กรองตามชื่อไฟล์ (ค้นหาแบบ case-insensitive)
      const matchesSearch = file.fileName.toLowerCase().includes(searchTerm.toLowerCase());
      
      // กรองตามประเภท
      const matchesType = filterType === "" || file.fileType === filterType;
      
      // กรองตามผู้สร้าง
      const matchesUser = filterUser === "" || file.createdBy === filterUser;
      
      // กรองตามวันที่อัปเดต
      const matchesUpdate = isDateInRange(file.updatedAt, filterUpdate);
      
      return matchesSearch && matchesType && matchesUser && matchesUpdate;
    });

    // เรียงข้อมูล
    filteredFiles.sort((a, b) => {
      let aValue: string, bValue: string;
      
      switch (sortField) {
        case 'createdAt':
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        case 'updatedAt':
          aValue = a.updatedAt;
          bValue = b.updatedAt;
          break;
        case 'publishedAt':
          aValue = a.publishedAt || '';
          bValue = b.publishedAt || '';
          break;
        default:
          aValue = a.updatedAt;
          bValue = b.updatedAt;
      }

      const comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filteredFiles;
  };

  // ฟังก์ชันเลือกไอคอนตามประเภทไฟล์
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'โฟลเดอร์':
        return folderfieldicon;
      case 'KPI':
        return KPIicon;
      case 'BI':
        return BIicon;
      case 'Customize View':
        return CVicon;
      default:
        return foldericon;
    }
  };

  // ฟังก์ชันปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedElement = event.target as Element;
      const isInsideDropdown = Object.values(dropdownRefs.current).some(ref => 
        ref && ref.contains(clickedElement)
      );
      
      if (!isInsideDropdown) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownToggle = (fileName: string) => {
    setOpenDropdown(openDropdown === fileName ? null : fileName);
  };

  const handleMenuAction = (action: string, fileName: string) => {
    console.log(`${action} file: ${fileName}`);
    setOpenDropdown(null);
  };

  const menuItems = [
    { icon: "✏️", label: "แก้ไข", action: "edit" },
    { icon: "🔗", label: "แชร์", action: "share" },
    { icon: "📝", label: "เปลี่ยนชื่อ", action: "rename" },
    { icon: "📄", label: "ทำสำเนา", action: "copy" },
    { icon: "🗑️", label: "ลบ", action: "delete" }
  ];

  const filteredFiles = getFilteredAndSortedFiles();

  return (
    <div className="bg-[#EFF2F9]">
      <div className="overflow-x-auto rounded-lg border border-[#DFDFE0]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                ชื่อ
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                ผู้สร้าง
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => sortFiles('createdAt')}
              >
                <div className="flex items-center gap-2">
                  วันที่สร้าง
                  <img src={sortIcon} alt="sort" className="w-2 h-3" />
                  {sortField === 'createdAt' && (
                    <span className="text-blue-600">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => sortFiles('updatedAt')}
              >
                <div className="flex items-center gap-2">
                  วันที่อัปเดต
                  <img src={sortIcon} alt="sort" className="w-2 h-3" />
                  {sortField === 'updatedAt' && (
                    <span className="text-blue-600">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => sortFiles('publishedAt')}
              >
                <div className="flex items-center gap-2">
                  วันที่เผยแพร่
                  <img src={sortIcon} alt="sort" className="w-2 h-3" />
                  {sortField === 'publishedAt' && (
                    <span className="text-blue-600">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file, index) => (
                <tr key={`${file.fileName}-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img 
                        src={getFileIcon(file.fileType)} 
                        alt={file.fileType} 
                        className="w-6 h-6" 
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {file.fileName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-visible bg-gray-200 flex items-center justify-center relative group cursor-pointer">
                        <img 
                          src={avatar} 
                          alt="profile" 
                          className="w-8 h-8 object-cover rounded-full" 
                        />
                        <div className="absolute -left-2 top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg animate-wave">
                          👋
                        </div>
                      </div>
                      <span className="text-sm text-gray-900">
                        {file.createdBy}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(file.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(file.updatedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(file.publishedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                    <div
                      ref={el => dropdownRefs.current[file.fileName] = el}
                      className="relative"
                    >
                      <button
                        onClick={() => handleDropdownToggle(file.fileName)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                        </svg>
                      </button>

                      {openDropdown === file.fileName && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                          {menuItems.map((item) => (
                            <button
                              key={item.action}
                              onClick={() => handleMenuAction(item.action, file.fileName)}
                              className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 transition-colors `}
                            >
                              <span className="text-base">{item.icon}</span>
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <p>ไม่พบไฟล์ที่ตรงกับเงื่อนไขการค้นหา</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImoDesignerDetail;