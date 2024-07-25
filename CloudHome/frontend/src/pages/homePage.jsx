
    import { useEffect, useRef, useState } from "react";
    import Navbar from "../components/navbar";
    import useCreateFolder from "../hooks/useCreateFolder";
    import useGetFileFolders from "../hooks/useGetFileFolders";
    import useUploadFile from "../hooks/useUploadFile";
    import { FaFolder, FaFile } from 'react-icons/fa';

    const HomePage = () => {
        const [newFolder, setNewFolder] = useState("");
        const inputRef = useRef(null);
        const [showCreateFolder, setShowCreateFolder] = useState(false);
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [searchQuery, setSearchQuery] = useState("");
        const { createFolder } = useCreateFolder();
        const [folderStructure, setFolderStructure] = useState([{ _id: null, name: "Home" }]);
        const { getFileFolders, fileFolders } = useGetFileFolders();

        const parentFolder = folderStructure[folderStructure.length - 1];

        const handleDoubleClick = (elem) => {
            if (elem.type == "folder") {
                setFolderStructure([...folderStructure, elem]);
            } else {
                window.open(elem.link);
            }
        };

        const handleAllowCreateFolder = () => {
            setShowCreateFolder(true);
        };

        const handleCreateFolder = async () => {
            if (newFolder.length > 0) {
                await createFolder({
                    name: newFolder,
                    parentId: parentFolder._id,
                });
                getFileFolders(parentFolder._id);
                setShowCreateFolder(false);
            }
        };

        useEffect(() => {
            getFileFolders(parentFolder._id);
        }, [folderStructure]);

        const handleBackClick = (clickIdx) => {
            const newFolderStructure = folderStructure.filter((elem, idx) => idx <= clickIdx);
            setFolderStructure(newFolderStructure);
        };

        const { isUploadAllowed, uploadFile } = useUploadFile();
        const handleFileUpload = async (e) => {
            if (isUploadAllowed) {
                const file = e.target.files;
                await uploadFile({
                    file: file[0],
                    parentId: parentFolder._id,
                });
                getFileFolders(parentFolder._id);
            } else {
                alert("Uploading is already in progress. Please wait...");
            }
        };


        const filteredFileFolders = fileFolders.filter((elem) =>
            elem.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className="homepage-container">
            <Navbar />
            <div className="sidebar">
                <button className="new-plus-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>New +</button>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={handleAllowCreateFolder}>Create Folder</button>
                        <label className="dropdown-item file-upload-label" htmlFor="file-upload-input">Upload File</label>
                        <input id="file-upload-input" className="file-upload-input" ref={inputRef} type="file" onChange={handleFileUpload} />
                    </div>
                )}
            </div>
            <div className="homepage-main-container">
                <h1>Welcome to Cloud Home</h1>
                <input type="text" className="search-bar" placeholder="Search files and folders" value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} />  
                <ul>
                    {folderStructure.map((elem, idx) => (
                        <li key={idx} onClick={() => handleBackClick(idx)}>{elem.name}</li>
                    ))}
                </ul>
                {showCreateFolder && (
                    <div className="create-folder-container">
                        <input value={newFolder} onChange={(e) => setNewFolder(e.target.value)} />
                        <button onClick={handleCreateFolder}>Create</button>
                        <button onClick={() => setShowCreateFolder(false)}>Cancel</button>
                    </div>
                )}
                <div className="file-folder-container">
                <h2 className="file-folder-heading">Name</h2>
                    {filteredFileFolders.map((elem) => (
                        <div
                            key={elem._id}
                            data-type={elem.type}
                            onDoubleClick={() => handleDoubleClick(elem)}
                            className="file-folder-item"
                        >
                            {elem.type === "folder" ? <FaFolder /> : <FaFile />}
                            <p>{elem.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        );
    };

    export default HomePage;




