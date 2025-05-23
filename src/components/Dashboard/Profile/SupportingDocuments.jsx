import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

const documentList = [
  { key: "nationalIdCard", label: "Student ID" },
  { key: "transcript", label: "Academic Transcript" },
  { key: "proofOfResidence", label: "Proof of Residence" },
  { key: "resume", label: "Resume" },
];

export default function SupportingDocuments({ documents }) {
  return (
    <Card>
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-lg">Supporting Documents</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {documentList.map((doc) => (
          <div
            key={doc.key}
            className="flex items-center justify-between py-2 border-b"
          >
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-gray-900">{doc.label}</span>
            </div>
            <div>
              {documents[doc.key]?.uploaded ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Download className="h-4 w-4 mr-1" /> Download
                </Button>
              ) : (
                <span className="text-gray-500 text-sm">Not uploaded</span>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
