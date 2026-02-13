import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  Upload,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import baseAPI from "../../../../environment";

export default function SupportingDocuments({
  documents,
  applicationId,
  onUpdate,
  canUpdate = true,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Document type mapping
  const docTypeLabels = {
    transcript: "Academic Transcript",
    nationalIdCard: "National ID Card",
    proofOfResidence: "Proof of Residence",
    letterOfRecommendation: "Letter of Recommendation",
    proofOfBankAccount: "Proof of Bank Account",
    coverLetter: "Cover Letter",
    payslip: "Recent Payslip",
  };

  // Filter only string-based submitted documents
  const submittedDocs = Object.entries(documents).filter(
    ([key, value]) =>
      typeof value === "string" &&
      value.trim() !== "" &&
      key !== "additionalDocs"
  );

  // Handle additional documents separately
  const additionalDocs = documents.additionalDocs || [];

  const handleFileSelect = (docType, file) => {
    if (file && file.size > 10 * 1024 * 1024) {
      setUploadStatus({
        type: "error",
        message: "File size must be less than 10MB",
      });
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (file && !allowedTypes.includes(file.type)) {
      setUploadStatus({
        type: "error",
        message: "Only PDF, JPEG, and PNG files are allowed",
      });
      return;
    }

    setSelectedFiles((prev) => ({
      ...prev,
      [docType]: file,
    }));
    setUploadStatus(null);
  };

  const removeSelectedFile = (docType) => {
    setSelectedFiles((prev) => {
      const updated = { ...prev };
      delete updated[docType];
      return updated;
    });
  };

  const handleUpdate = async () => {
    if (Object.keys(selectedFiles).length === 0) {
      setUploadStatus({
        type: "error",
        message: "Please select at least one file to update",
      });
      return;
    }

    setUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();

      // Add selected files to form data
      Object.entries(selectedFiles).forEach(([docType, file]) => {
        if (file) {
          formData.append(docType, file);
        }
      });

      const response = await fetch(
        `${baseAPI}/applications/${applicationId}/documents`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update documents");
      }

      const result = await response.json();

      setUploadStatus({
        type: "success",
        message: "Documents updated successfully!",
      });
      setSelectedFiles({});
      setIsEditing(false);

      // Call parent update function if provided
      if (onUpdate) {
        onUpdate(result.application);
      }
    } catch (error) {
      console.error("Error updating documents:", error);
      setUploadStatus({
        type: "error",
        message: error.message || "Failed to update documents",
      });
    } finally {
      setUploading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setSelectedFiles({});
    setUploadStatus(null);
  };

  return (
    <Card className="w-full  mx-auto">
      <CardHeader className="bg-gray-50 dark:bg-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="text-lg">Supporting Documents</CardTitle>
          {canUpdate && !isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-cyan-600 border-cyan-600 hover:bg-cyan-50"
            >
              <Upload className="w-4 h-4 mr-1" />
              Update Documents
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Status Messages */}
        {uploadStatus && (
          <div
            className={`p-3 rounded-md flex items-center gap-2 ${
              uploadStatus.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {uploadStatus.type === "success" ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {uploadStatus.message}
          </div>
        )}

        {/* Main Documents */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 dark:text-gray-300">Required Documents</h4>
          {submittedDocs.length === 0 && !isEditing ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No documents uploaded.</p>
          ) : (
            <div className="space-y-2">
              {/* Show existing documents */}
              {submittedDocs.map(([docType, filePath]) => {
                const label =
                  docTypeLabels[docType] ||
                  docType
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase());
                const normalizedPath = filePath.replace(/\\/g, "/");

                return (
                  <div
                    key={docType}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 border-b gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-800">{label}</span>
                      {selectedFiles[docType] && (
                        <span className="text-xs text-cyan-600 bg-cyan-50 px-2 py-1 rounded">
                          New file selected
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {isEditing && (
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            id={`file-${docType}`}
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) =>
                              handleFileSelect(docType, e.target.files[0])
                            }
                            className="hidden"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              document.getElementById(`file-${docType}`).click()
                            }
                            className="text-xs"
                          >
                            Choose New
                          </Button>
                          {selectedFiles[docType] && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSelectedFile(docType)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-sm"
                        asChild
                      >
                        <a
                          href={`${normalizedPath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                );
              })}

              {/* Show additional documents */}
              {additionalDocs.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Documents
                  </h4>
                  {additionalDocs.map((filePath, index) => {
                    const normalizedPath = filePath.replace(/\\/g, "/");

                    return (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 border-b gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm text-gray-800">
                            Additional Document {index + 1}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-sm"
                          asChild
                        >
                          <a
                            href={`${normalizedPath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </a>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* File Selection Area for New Documents */}
        {isEditing && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-medium text-gray-700 dark:text-gray-300">Upload New Documents</h4>

            {/* Show available document types that haven't been selected */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(docTypeLabels).map(([docType, label]) => (
                <div key={docType} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {label}
                    </label>
                    {selectedFiles[docType] && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSelectedFile(docType)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>

                  {selectedFiles[docType] ? (
                    <div className="text-sm text-green-600 bg-green-50 p-2 rounded break-all">
                      ✓ {selectedFiles[docType].name}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        id={`upload-${docType}`}
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileSelect(docType, e.target.files[0])
                        }
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          document.getElementById(`upload-${docType}`).click()
                        }
                        className="w-full text-xs"
                      >
                        <Upload className="w-3 h-3 mr-1" />
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={cancelEdit}
                disabled={uploading}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={uploading || Object.keys(selectedFiles).length === 0}
                className="bg-cyan-600 hover:bg-cyan-700 w-full sm:w-auto"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Update Documents
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
