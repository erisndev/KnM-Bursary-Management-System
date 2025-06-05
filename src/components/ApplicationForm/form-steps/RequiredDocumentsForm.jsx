import FileUploadField from "@/components/ui/file-upload-field";
import { X } from "lucide-react";

export default function RequiredDocumentsForm({
  documents,
  handleFileUpload,
  handleFileRemove,
  additionalDocs,
  handleAdditionalDocUpload,
  errors,
  touched,
}) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-2 text-center">
        Required Documents
      </h2>
      <p className="text-gray-500 text-sm mb-12 text-center">
        Please upload the necessary documents to support your application.
        Ensure all files meet the specified format requirements.
      </p>

      <FileUploadField
        title={
          <>
            Academic Transcript
            <span className="text-red-500 ml-1">*</span>
          </>
        }
        description="Submit your latest academic transcript. Ensure all subjects are visible."
        docType="transcript"
        secondaryDocType="degreeCertificate"
        documents={documents}
        handleFileUpload={handleFileUpload}
        handleFileRemove={handleFileRemove}
        acceptedFormats=".pdf,.jpg,.jpeg,.png,.txt"
        error={
          touched.transcript && errors.transcript ? errors.transcript : null
        }
        required={true}
      />

      <FileUploadField
        title={
          <>
            Proof of Identification
            <span className="text-red-500 ml-1">*</span>
          </>
        }
        description="Submit a government-issued identification document."
        docType="nationalIdCard"
        documents={documents}
        handleFileUpload={handleFileUpload}
        handleFileRemove={handleFileRemove}
        acceptedFormats=".pdf,.jpg,.jpeg,.png"
        error={
          touched.nationalIdCard && errors.nationalIdCard
            ? errors.nationalIdCard
            : null
        }
        required={true}
      />

      <FileUploadField
        title={
          <>
            Proof of Residence
            <span className="text-red-500 ml-1">*</span>
          </>
        }
        description="Submit a document proving your current residential address (e.g., utility bill, bank statement)."
        docType="proofOfResidence"
        documents={documents}
        handleFileUpload={handleFileUpload}
        handleFileRemove={handleFileRemove}
        acceptedFormats=".pdf,.jpg,.jpeg,.png"
        error={
          touched.proofOfResidence && errors.proofOfResidence
            ? errors.proofOfResidence
            : null
        }
        required={true}
      />

      <FileUploadField
        title="Letter of Recommendation"
        description="Submit a letter of recommendation from a teacher or employer."
        docType="letterOfRecommendation"
        secondaryDocType="recommendationTranscript"
        documents={documents}
        handleFileUpload={handleFileUpload}
        handleFileRemove={handleFileRemove}
        acceptedFormats=".pdf,.doc,.docx"
        required={false}
        optional={true}
      />

      <FileUploadField
        title="Proof of Bank Account"
        description="Provide a copy of your proof of bank account."
        docType="proofOfBankAccount"
        documents={documents}
        handleFileUpload={handleFileUpload}
        handleFileRemove={handleFileRemove}
        acceptedFormats=".pdf,.doc,.docx"
        required={false}
        optional={true}
      />

      <FileUploadField
        title="Cover Letter"
        description="Include an optional cover letter to support your application."
        docType="coverLetter"
        documents={documents}
        handleFileUpload={handleFileUpload}
        handleFileRemove={handleFileRemove}
        acceptedFormats=".pdf,.doc,.docx"
        required={false}
        optional={true}
      />

      {/* Proof of Income Section */}
      <div className="mb-8 p-6 bg-white rounded-md shadow-sm">
        <h3 className="text-md font-semibold mb-1">
          Proof of Income (Optional)
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Submit documents to verify your income for financial aid
          consideration.
        </p>

        {!documents.payslip.uploaded && (
          <div className="border-2 border-dashed border-gray-200 rounded-md p-6 flex flex-col items-center justify-center mb-4">
            <div className="h-16 w-16 bg-gray-200 rounded-md mb-2"></div>
            <p className="text-sm text-center text-gray-500 mb-2">
              Drag and drop files here, or click to upload
            </p>
            <p className="text-xs text-center text-gray-400">
              Accepted formats: PDF, JPG, PNG (Max: 5MB)
            </p>
            <input
              type="file"
              id="payslip"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload("payslip", e)}
            />
            <label
              htmlFor="payslip"
              className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              Browse files
            </label>
          </div>
        )}

        {documents.payslip.uploaded && (
          <>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
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
                <span className="text-sm">{documents.payslip.file.name}</span>
              </div>
              <button
                onClick={() => handleFileRemove("payslip")}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4">
              <input
                type="file"
                id="additionalPayslip"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  handleAdditionalDocUpload(additionalDocs.length, e);
                }}
              />
              <label
                htmlFor="additionalPayslip"
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                Add another file
              </label>
            </div>
          </>
        )}
      </div>
    </>
  );
}
