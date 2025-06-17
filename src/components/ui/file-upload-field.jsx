import { X } from "lucide-react";

export default function FileUploadField({
  title,
  description,
  docType,
  documents,
  handleFileUpload,
  handleFileRemove,
  acceptedFormats,
  error,
}) {
  const document = documents[docType];

  return (
    <div className="mb-8 p-6 bg-white rounded-md shadow-sm">
      <h3 className="text-md font-semibold mb-1">{title}</h3>
      <p className="text-xs text-gray-500 mb-4">{description}</p>

      {document?.uploaded ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-cyan-100 rounded-md flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-cyan-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm">{document.file.name}</span>
            </div>
            <button
              onClick={() => handleFileRemove(docType)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-200 rounded-md p-6 flex flex-col items-center justify-center">
          <div className="h-16 w-16 bg-gray-200 rounded-md mb-2"></div>
          <p className="text-sm text-center text-gray-500 mb-2">
            Drag and drop files here, or click to upload
          </p>
          <p className="text-xs text-center text-gray-400">
            Accepted formats: {acceptedFormats} (Max: 5MB)
          </p>
          <input
            type="file"
            id={docType}
            className="hidden"
            accept={acceptedFormats}
            onChange={(e) => handleFileUpload(docType, e)}
          />
          <label
            htmlFor={docType}
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            Browse files
          </label>
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
}
