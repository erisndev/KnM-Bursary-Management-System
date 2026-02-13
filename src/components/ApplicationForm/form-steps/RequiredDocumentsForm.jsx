import { X, Upload, FileText, AlertCircle } from "lucide-react";

const FileUploadCard = ({
  title,
  description,
  docType,
  documents,
  handleFileUpload,
  handleFileRemove,
  acceptedFormats,
  error,
  required = false,
}) => {
  const document = documents[docType];

  return (
    <div className="border border-gray-200 dark:border-slate-700 rounded-xl p-5 hover:border-gray-300 dark:hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {title}
            {required && <span className="text-red-500 ml-1">*</span>}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
        </div>
      </div>

      {document?.uploaded ? (
        <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-sm text-emerald-800 dark:text-emerald-300 truncate">
              {document.file.name}
            </span>
          </div>
          <button
            onClick={() => handleFileRemove(docType)}
            className="p-1.5 text-gray-400 dark:text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div>
          <label
            htmlFor={docType}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 dark:border-slate-600 rounded-lg cursor-pointer hover:border-violet-300 dark:hover:border-violet-700 hover:bg-violet-50/30 dark:hover:bg-violet-900/20 transition-all group"
          >
            <Upload className="w-8 h-8 text-gray-300 dark:text-gray-600 dark:text-gray-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 mb-2 transition-colors" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 font-medium">
              Click to upload
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
              {acceptedFormats} (Max: 10MB)
            </span>
          </label>
          <input
            type="file"
            id={docType}
            className="hidden"
            accept={acceptedFormats}
            onChange={(e) => handleFileUpload(docType, e)}
          />
          {error && (
            <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

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
    <div>
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Required Documents
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
          Upload the necessary documents to support your application.
        </p>
      </div>

      <div className="space-y-4">
        <FileUploadCard
          title="Academic Transcript"
          description="Submit your latest academic transcript with all subjects visible."
          docType="transcript"
          documents={documents}
          handleFileUpload={handleFileUpload}
          handleFileRemove={handleFileRemove}
          acceptedFormats=".pdf,.jpg,.jpeg,.png"
          error={touched.transcript && errors.transcript ? errors.transcript : null}
          required={true}
        />

        <FileUploadCard
          title="Proof of Identification"
          description="Submit a government-issued identification document."
          docType="nationalIdCard"
          documents={documents}
          handleFileUpload={handleFileUpload}
          handleFileRemove={handleFileRemove}
          acceptedFormats=".pdf,.jpg,.jpeg,.png"
          error={touched.nationalIdCard && errors.nationalIdCard ? errors.nationalIdCard : null}
          required={true}
        />

        <FileUploadCard
          title="Proof of Residence"
          description="Submit a document proving your current residential address."
          docType="proofOfResidence"
          documents={documents}
          handleFileUpload={handleFileUpload}
          handleFileRemove={handleFileRemove}
          acceptedFormats=".pdf,.jpg,.jpeg,.png"
          error={touched.proofOfResidence && errors.proofOfResidence ? errors.proofOfResidence : null}
          required={true}
        />

        <FileUploadCard
          title="Proof of Bank Account"
          description="Provide a copy of your proof of bank account."
          docType="proofOfBankAccount"
          documents={documents}
          handleFileUpload={handleFileUpload}
          handleFileRemove={handleFileRemove}
          acceptedFormats=".pdf,.jpg,.jpeg,.png"
          error={touched.proofOfBankAccount && errors.proofOfBankAccount ? errors.proofOfBankAccount : null}
          required={true}
        />

        <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Optional Documents
          </p>
          <div className="space-y-4">
            <FileUploadCard
              title="Letter of Recommendation"
              description="Submit a letter of recommendation from a teacher or employer."
              docType="letterOfRecommendation"
              documents={documents}
              handleFileUpload={handleFileUpload}
              handleFileRemove={handleFileRemove}
              acceptedFormats=".pdf,.doc,.docx"
            />

            <FileUploadCard
              title="Cover Letter"
              description="Include an optional cover letter to support your application."
              docType="coverLetter"
              documents={documents}
              handleFileUpload={handleFileUpload}
              handleFileRemove={handleFileRemove}
              acceptedFormats=".pdf,.doc,.docx"
            />

            <FileUploadCard
              title="Proof of Income"
              description="Submit documents to verify income for financial aid consideration."
              docType="payslip"
              documents={documents}
              handleFileUpload={handleFileUpload}
              handleFileRemove={handleFileRemove}
              acceptedFormats=".pdf,.jpg,.jpeg,.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
